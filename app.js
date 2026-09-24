const DEMO = {
  millet: {
    title: '“millet” için anlamsal değişim',
    score: 0.78,
    fastPeriod: '1960 → 2000',
    topContext: 'vatandaş',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.18, 0.27, 0.51, 0.72, 0.78],
    contexts: [['devlet', 54], ['halk', 46], ['toplum', 39], ['vatandaş', 67], ['ulus', 42]],
    source: 'Demo sonuçları gerçek arşiv kayıtlarıyla henüz eşleştirilmemiştir. Nihai sürümde bu alan yayın, tarih ve mümkün olduğunda sayfa/belge bilgisiyle doldurulacaktır.'
  },
  vatan: {
    title: '“vatan” için anlamsal değişim',
    score: 0.64,
    fastPeriod: '1930 → 1960',
    topContext: 'memleket',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.17, 0.34, 0.61, 0.59, 0.64],
    contexts: [['memleket', 61], ['millet', 49], ['devlet', 45], ['yurt', 57], ['toprak', 38]],
    source: 'Demo sonuçları gerçek arşiv kayıtlarıyla henüz eşleştirilmemiştir. Nihai sürümde bu alan yayın, tarih ve mümkün olduğunda sayfa/belge bilgisiyle doldurulacaktır.'
  },
  'hürriyet': {
    title: '“hürriyet” için anlamsal değişim',
    score: 0.86,
    fastPeriod: '1900 → 1930',
    topContext: 'hak',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.72, 0.41, 0.63, 0.81, 0.86],
    contexts: [['hak', 71], ['özgürlük', 66], ['kanun', 44], ['millet', 48], ['adalet', 51]],
    source: 'Demo sonuçları gerçek arşiv kayıtlarıyla henüz eşleştirilmemiştir. Nihai sürümde bu alan yayın, tarih ve mümkün olduğunda sayfa/belge bilgisiyle doldurulacaktır.'
  }
};

const input = document.getElementById('wordInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultTitle = document.getElementById('resultTitle');
const changeBadge = document.getElementById('changeBadge');
const fastPeriod = document.getElementById('fastPeriod');
const topContext = document.getElementById('topContext');
const sourceText = document.getElementById('sourceText');
const sourceTitle = document.getElementById('sourceTitle');
const canvas = document.getElementById('changeChart');
const ctx = canvas.getContext('2d');
const network = document.getElementById('contextNetwork');

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(300, rect.width * ratio);
  canvas.height = Math.max(180, rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawChart(data) {
  resizeCanvas();
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  const pad = { left: 38, right: 18, top: 16, bottom: 33 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  ctx.font = '10px Inter, sans-serif';
  ctx.fillStyle = '#8f8578';
  ctx.textAlign = 'right';
  [0, 0.25, 0.5, 0.75, 1].forEach(v => {
    const y = pad.top + (1 - v) * plotH;
    ctx.strokeStyle = '#e8ddd0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText(v.toFixed(2), pad.left - 8, y + 3);
  });

  const points = data.values.map((v, i) => ({
    x: pad.left + (i / (data.values.length - 1)) * plotW,
    y: pad.top + (1 - v) * plotH
  }));

  ctx.strokeStyle = '#b04b33';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
  ctx.stroke();

  points.forEach((p, i) => {
    ctx.fillStyle = '#fffdf8';
    ctx.strokeStyle = '#b04b33';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#7d7367';
    ctx.textAlign = i === 0 ? 'left' : (i === points.length - 1 ? 'right' : 'center');
    ctx.fillText(String(data.years[i]), p.x, h - 10);
  });
}

function drawNetwork(data) {
  network.innerHTML = '';
  const w = network.clientWidth;
  const h = network.clientHeight;
  const center = { x: w / 2, y: h / 2 };
  const hub = document.createElement('div');
  hub.className = 'node central';
  hub.textContent = input.value.trim().toLowerCase() || 'kelime';
  hub.style.left = `${center.x}px`;
  hub.style.top = `${center.y}px`;
  network.appendChild(hub);

  const positions = [[0.22,0.27],[0.78,0.24],[0.79,0.77],[0.20,0.77],[0.50,0.12]];
  data.contexts.forEach(([word, weight], i) => {
    const p = positions[i % positions.length];
    const node = document.createElement('div');
    node.className = 'node';
    node.textContent = `${word} · ${weight}`;
    node.style.left = `${w * p[0]}px`;
    node.style.top = `${h * p[1]}px`;
    network.appendChild(node);

    const ex = w * p[0] - center.x;
    const ey = h * p[1] - center.y;
    const length = Math.sqrt(ex * ex + ey * ey);
    const angle = Math.atan2(ey, ex) * 180 / Math.PI;
    const edge = document.createElement('div');
    edge.className = 'edge';
    edge.style.left = `${center.x}px`;
    edge.style.top = `${center.y}px`;
    edge.style.width = `${length}px`;
    edge.style.transform = `rotate(${angle}deg)`;
    edge.style.opacity = String(Math.max(0.24, weight / 100));
    network.insertBefore(edge, hub);
  });
}

function analyze(word) {
  const raw = word.trim();
  const key = raw.toLocaleLowerCase('tr-TR');
  const data = DEMO[key] || DEMO.millet;
  const exists = Object.prototype.hasOwnProperty.call(DEMO, key);
  resultTitle.textContent = data.title;
  changeBadge.textContent = data.score.toFixed(2);
  fastPeriod.textContent = data.fastPeriod;
  topContext.textContent = data.topContext;
  sourceTitle.textContent = exists ? 'Demo sonuç — gerçek kaynak eşlemesi bekleniyor.' : `“${raw || 'kelime'}” demo corpus'ta bulunamadı.`;
  sourceText.textContent = exists ? data.source : 'Demo sözlüğümüzde millet, vatan ve hürriyet bulunuyor. Araştırma sürümünde yeni kelimeler gerçek corpus üzerinden üretilecek.';
  drawChart(data);
  drawNetwork(data);
}

analyzeBtn.addEventListener('click', () => analyze(input.value));
input.addEventListener('keydown', e => { if (e.key === 'Enter') analyze(input.value); });
document.querySelectorAll('#suggestions button').forEach(btn => {
  btn.addEventListener('click', () => { input.value = btn.dataset.word; analyze(btn.dataset.word); });
});
window.addEventListener('resize', () => analyze(input.value));
analyze('millet');
