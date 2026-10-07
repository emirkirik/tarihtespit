const DEMO = {
  millet: {
    title: '“millet” için dönemsel anlam ve bağlam değişimi',
    score: 0.78,
    fastPeriod: '1960 → 2000',
    topContext: 'vatandaş',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.18, 0.27, 0.51, 0.72, 0.78],
    contexts: [['devlet', 54], ['halk', 46], ['toplum', 39], ['vatandaş', 67], ['ulus', 42]],
    source: 'Demo veridir. Gerçek araştırma sürümünde sonuçlar tarihî metin, yayın, tarih ve mümkün olduğunda sayfa/belge bilgisiyle eşleştirilecektir.'
  },
  vatan: {
    title: '“vatan” için dönemsel anlam ve bağlam değişimi',
    score: 0.64,
    fastPeriod: '1930 → 1960',
    topContext: 'memleket',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.17, 0.34, 0.61, 0.59, 0.64],
    contexts: [['memleket', 61], ['millet', 49], ['devlet', 45], ['yurt', 57], ['toprak', 38]],
    source: 'Demo veridir. Gerçek araştırma sürümünde sonuçlar tarihî metin, yayın, tarih ve mümkün olduğunda sayfa/belge bilgisiyle eşleştirilecektir.'
  },
  'hürriyet': {
    title: '“hürriyet” için dönemsel anlam ve bağlam değişimi',
    score: 0.86,
    fastPeriod: '1900 → 1930',
    topContext: 'hak',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.72, 0.41, 0.63, 0.81, 0.86],
    contexts: [['hak', 71], ['özgürlük', 66], ['kanun', 44], ['millet', 48], ['adalet', 51]],
    source: 'Demo veridir. Gerçek araştırma sürümünde sonuçlar tarihî metin, yayın, tarih ve mümkün olduğunda sayfa/belge bilgisiyle eşleştirilecektir.'
  },
  devlet: {
    title: '“devlet” için dönemsel anlam ve bağlam değişimi',
    score: 0.58,
    fastPeriod: '1930 → 1960',
    topContext: 'millet',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.24, 0.31, 0.49, 0.55, 0.58],
    contexts: [['millet', 63], ['hükümet', 59], ['kanun', 52], ['ülke', 47], ['cumhuriyet', 44]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  medeniyet: {
    title: '“medeniyet” için dönemsel anlam ve bağlam değişimi',
    score: 0.73,
    fastPeriod: '1900 → 1930',
    topContext: 'terakki',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.62, 0.35, 0.51, 0.67, 0.73],
    contexts: [['terakki', 68], ['maarif', 52], ['batı', 46], ['kültür', 60], ['bilim', 42]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  maarif: {
    title: '“maarif” için dönemsel anlam ve bağlam değişimi',
    score: 0.81,
    fastPeriod: '1900 → 1930',
    topContext: 'mektep',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.74, 0.46, 0.65, 0.76, 0.81],
    contexts: [['mektep', 73], ['muallim', 65], ['talebe', 58], ['eğitim', 54], ['öğretim', 47]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  mektep: {
    title: '“mektep” için dönemsel anlam ve bağlam değişimi',
    score: 0.79,
    fastPeriod: '1930 → 1960',
    topContext: 'talebe',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.69, 0.55, 0.71, 0.76, 0.79],
    contexts: [['talebe', 70], ['muallim', 62], ['maarif', 56], ['okul', 53], ['öğrenci', 46]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  adalet: {
    title: '“adalet” için dönemsel anlam ve bağlam değişimi',
    score: 0.52,
    fastPeriod: '1960 → 2000',
    topContext: 'hak',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.32, 0.38, 0.44, 0.49, 0.52],
    contexts: [['hak', 72], ['mahkeme', 58], ['kanun', 56], ['eşitlik', 45], ['hukuk', 64]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  'cumhuriyet': {
    title: '“cumhuriyet” için dönemsel anlam ve bağlam değişimi',
    score: 0.61,
    fastPeriod: '1930 → 1960',
    topContext: 'millet',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.12, 0.36, 0.47, 0.56, 0.61],
    contexts: [['millet', 70], ['meclis', 57], ['halk', 51], ['devlet', 48], ['demokrasi', 42]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  meclis: {
    title: '“meclis” için dönemsel anlam ve bağlam değişimi',
    score: 0.67,
    fastPeriod: '1920 → 1960',
    topContext: 'millet',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.22, 0.48, 0.55, 0.62, 0.67],
    contexts: [['millet', 78], ['vekiller', 66], ['kanun', 59], ['hükümet', 48], ['meclis', 31]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  kanun: {
    title: '“kanun” için dönemsel anlam ve bağlam değişimi',
    score: 0.49,
    fastPeriod: '1930 → 1960',
    topContext: 'hukuk',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.28, 0.37, 0.43, 0.46, 0.49],
    contexts: [['hukuk', 74], ['mahkeme', 55], ['devlet', 50], ['hak', 47], ['meclis', 43]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  halk: {
    title: '“halk” için dönemsel anlam ve bağlam değişimi',
    score: 0.56,
    fastPeriod: '1930 → 1960',
    topContext: 'millet',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.25, 0.34, 0.47, 0.53, 0.56],
    contexts: [['millet', 68], ['köylü', 60], ['toplum', 52], ['vatandaş', 45], ['emekçi', 41]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  yurt: {
    title: '“yurt” için dönemsel anlam ve bağlam değişimi',
    score: 0.43,
    fastPeriod: '1930 → 2000',
    topContext: 'ülke',
    years: [1900, 1930, 1960, 2000, 2020],
    values: [0.18, 0.31, 0.39, 0.42, 0.43],
    contexts: [['ülke', 64], ['vatan', 59], ['öğrenci', 40], ['toplum', 37], ['memleket', 51]],
    source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.'
  },
  inkılap: { title: '“inkılap” için dönemsel anlam ve bağlam değişimi', score: 0.69, fastPeriod: '1930 → 1960', topContext: 'cumhuriyet', years: [1900,1930,1960,2000,2020], values: [0.11,0.36,0.57,0.64,0.69], contexts: [['cumhuriyet',72],['devrim',61],['millet',55],['kanun',48],['yenilik',43]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  muallim: { title: '“muallim” için dönemsel anlam ve bağlam değişimi', score: 0.76, fastPeriod: '1930 → 1960', topContext: 'mektep', years: [1900,1930,1960,2000,2020], values: [0.70,0.52,0.65,0.72,0.76], contexts: [['mektep',73],['talebe',64],['maarif',58],['muallim',31],['öğretmen',55]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  talebe: { title: '“talebe” için dönemsel anlam ve bağlam değişimi', score: 0.71, fastPeriod: '1930 → 1960', topContext: 'mektep', years: [1900,1930,1960,2000,2020], values: [0.66,0.54,0.62,0.68,0.71], contexts: [['mektep',76],['muallim',65],['maarif',51],['öğrenci',58],['eğitim',44]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  şehir: { title: '“şehir” için dönemsel anlam ve bağlam değişimi', score: 0.48, fastPeriod: '1960 → 2000', topContext: 'kent', years: [1900,1930,1960,2000,2020], values: [0.22,0.31,0.39,0.45,0.48], contexts: [['kent',66],['sokak',53],['nüfus',48],['belediye',44],['memleket',39]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  memleket: { title: '“memleket” için dönemsel anlam ve bağlam değişimi', score: 0.55, fastPeriod: '1930 → 1960', topContext: 'vatan', years: [1900,1930,1960,2000,2020], values: [0.37,0.43,0.51,0.53,0.55], contexts: [['vatan',62],['ülke',51],['şehir',43],['millet',46],['köy',39]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  kültür: { title: '“kültür” için dönemsel anlam ve bağlam değişimi', score: 0.63, fastPeriod: '1960 → 2000', topContext: 'medeniyet', years: [1900,1930,1960,2000,2020], values: [0.18,0.27,0.46,0.58,0.63], contexts: [['medeniyet',61],['sanat',54],['dil',49],['toplum',57],['eğitim',45]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  eğitim: { title: '“eğitim” için dönemsel anlam ve bağlam değişimi', score: 0.59, fastPeriod: '1930 → 1960', topContext: 'öğretim', years: [1900,1930,1960,2000,2020], values: [0.16,0.39,0.49,0.54,0.59], contexts: [['öğretim',68],['okul',61],['öğrenci',59],['maarif',44],['kültür',41]], source: 'Demo veridir; gerçek corpus bağlantısı henüz yapılmadı.' },
  terakki: { title: '“terakki” için dönemsel anlam ve bağlam değişimi', score: 0.83, fastPeriod: '1900 → 1930', topContext: 'medeniyet', years: [1900,1930,1960,2000,2020], values: [0.77,0.51,0.69,0.79,0.83], contexts: [['medeniyet',70],['maarif',59],['ilim',53],['sanayi',48],['yenilik',42]] }
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
  // Sabit bir CSS yüksekliği kullanıyoruz; böylece canvas'ın intrinsic boyutu
  // her analizde tekrar büyüyerek sayfanın sonsuza doğru uzamasına yol açmıyor.
  const cssWidth = Math.max(300, Math.floor(canvas.parentElement.clientWidth - 24));
  const cssHeight = 240;
  const ratio = window.devicePixelRatio || 1;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  canvas.width = Math.floor(cssWidth * ratio);
  canvas.height = Math.floor(cssHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawChart(data) {
  resizeCanvas();
  const w = parseFloat(canvas.style.width);
  const h = parseFloat(canvas.style.height);
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
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
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
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
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
  hub.textContent = input.value.trim().toLocaleLowerCase('tr-TR') || 'kelime';
  hub.style.left = `${center.x}px`;
  hub.style.top = `${center.y}px`;
  network.appendChild(hub);

  const positions = [[0.18,0.24],[0.50,0.11],[0.82,0.24],[0.88,0.55],[0.71,0.82],[0.30,0.84],[0.12,0.57]];
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
  sourceText.textContent = exists ? data.source : 'Demo sözlüğümüzde 12 örnek kelime bulunuyor. Araştırma sürümünde yeni kelimeler gerçek corpus üzerinden üretilecek.';
  drawChart(data);
  drawNetwork(data);
}

analyzeBtn.addEventListener('click', () => analyze(input.value));
input.addEventListener('keydown', e => { if (e.key === 'Enter') analyze(input.value); });
document.querySelectorAll('#suggestions button').forEach(btn => {
  btn.addEventListener('click', () => {
    input.value = btn.dataset.word;
    analyze(btn.dataset.word);
  });
});
window.addEventListener('resize', () => drawChart(DEMO[input.value.trim().toLocaleLowerCase('tr-TR')] || DEMO.millet));
analyze('millet');
