// TarihTespit — gerçek kaynak entegrasyonu (Aşama 1)
// Veri kaynağı: Turkronicles public repository, pairs_synonyms_new.txt
// Not: Bu dosya sözcük eşleştirmeleri içerir; dönemsel n-gram sıklığı içermez.
const DATA_URL = 'https://raw.githubusercontent.com/togayyazar/Turkronicles/master/pairs_synonyms_new.txt';
const FALLBACK_URL = 'data/pairs_sample.json';
let pairs = [];
let sourceMode = 'loading';

const $ = id => document.getElementById(id);
const input = $('wordInput');
const suggestions = $('suggestions');
const dropdown = $('suggestionDropdown');
const pairResults = $('pairResults');
const dataStatus = $('dataStatus');
const resultTitle = $('resultTitle');
const resultCount = $('resultCount');
const wordCountLabel = $('wordCountLabel');
const sourceTitle = $('sourceTitle');
const sourceText = $('sourceText');

function trNorm(value) {
  return String(value || '').trim().toLocaleLowerCase('tr-TR').replace(/[’‘]/g, "'");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function parseTextPairs(text) {
  const result = [];
  const seen = new Set();
  for (const line of text.split(/\r?\n/)) {
    const parts = line.trim().split(/\s+/);
    // Source-file format: first word, paired word, two numeric metadata fields, POS, code.
    if (parts.length < 6 || !/^\d+$/.test(parts[2]) || !/^\d+$/.test(parts[3])) continue;
    const oldWord = parts[0];
    const modernWord = parts[1];
    if (!oldWord || !modernWord) continue;
    const key = trNorm(oldWord) + '|' + trNorm(modernWord);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({oldWord, modernWord, pos: parts[4]});
  }
  return result;
}
function parseFallback(rows) {
  return rows.map(row => ({oldWord: row[0], modernWord: row[1], pos: ''}));
}
function setStatus(kind, text) {
  if (!dataStatus) return;
  dataStatus.className = 'data-status ' + kind;
  dataStatus.innerHTML = '<span class="status-dot"></span><span>' + escapeHtml(text) + '</span>';
}
function renderPairRow(pair, query) {
  const pos = pair.pos ? `<span class="pair-pos">${escapeHtml(pair.pos)}</span>` : '';
  const oldHl = trNorm(pair.oldWord) === trNorm(query) ? ' match-word' : '';
  const modernHl = trNorm(pair.modernWord) === trNorm(query) ? ' match-word' : '';
  return `<article class="pair-row"><div class="pair-word${oldHl}"><small>Kaynak sözcük</small><strong>${escapeHtml(pair.oldWord)}</strong></div><div class="pair-arrow" aria-hidden="true">→</div><div class="pair-word${modernHl}"><small>Eşleştirilen sözcük</small><strong>${escapeHtml(pair.modernWord)}</strong></div>${pos}</article>`;
}
function findMatches(query) {
  const q = trNorm(query);
  if (!q) return pairs.slice(0, 20);
  const exact = pairs.filter(p => trNorm(p.oldWord) === q || trNorm(p.modernWord) === q);
  if (exact.length) return exact.slice(0, 20);
  return pairs.filter(p => trNorm(p.oldWord).includes(q) || trNorm(p.modernWord).includes(q)).slice(0, 20);
}
function analyze(query) {
  const q = String(query || '').trim();
  const matches = findMatches(q);
  resultTitle.textContent = q ? `“${q}” için kaynak eşleştirmeleri` : 'Kaynak dosyasından sözcük eşleştirmeleri';
  resultCount.textContent = `${matches.length} eşleşme`;
  if (!matches.length) {
    pairResults.innerHTML = `<div class="empty-state"><strong>Bu kaynak dosyasında eşleşme bulunamadı.</strong><p>Bu, sözcüğün tarih boyunca kullanılmadığı anlamına gelmez. Yalnızca bağlı eşleştirme dosyasında bu sorguya uyan satır bulunamadı.</p><p>Dönemsel kullanım ve birlikte geçen sözcükleri incelemek için Turkronicles n-gram verileri ayrıca işlenmelidir.</p></div>`;
    sourceTitle.textContent = sourceMode === 'remote' ? 'Kaynak yüklendi; bu sözcük için eşleşme yok.' : 'Örnek kaynak dilimi kullanılıyor.';
    sourceText.textContent = 'Bu arama sonucu bir anlam değişim skoru değildir. Gerçek dönemsel bağlam iddiası, n-gram verisi işlenmeden yapılmayacaktır.';
    return;
  }
  pairResults.innerHTML = `<div class="pair-results-head"><span>${sourceMode === 'remote' ? 'Turkronicles dosyasından bulunan eşleşmeler' : 'Kaynak dosyasından doğrulanmış örnek eşleşmeler'}</span><small>${matches.length > 1 ? 'İlk ' + matches.length + ' sonuç' : 'Kaynak satırı'}</small></div>` + matches.map(p => renderPairRow(p, q)).join('');
  sourceTitle.textContent = sourceMode === 'remote' ? 'Turkronicles eşleştirme dosyasından alındı.' : 'Kaynak erişimi olmadığında örnek kayıt kullanılıyor.';
  sourceText.textContent = 'Kaynak: togayyazar/Turkronicles — pairs_synonyms_new.txt. Bu eşleştirme dosyası tek başına dönemsel kullanım sıklığını veya sözcüklerin aynı cümlede birlikte geçmesini kanıtlamaz.';
}
function allTerms() {
  return [...new Set(pairs.flatMap(p => [p.oldWord, p.modernWord]))].sort((a,b)=>a.localeCompare(b,'tr'));
}
function buildSuggestions(filter = '') {
  if (!suggestions) return;
  suggestions.innerHTML = '';
  const f = trNorm(filter);
  allTerms().filter(w => !f || trNorm(w).includes(f)).slice(0, 14).forEach(word => {
    const btn = document.createElement('button');
    btn.type = 'button'; btn.textContent = word;
    btn.addEventListener('click', () => { input.value = word; dropdown.hidden = true; analyze(word); });
    suggestions.appendChild(btn);
  });
}
function updateDropdown() {
  const value = input.value.trim();
  dropdown.innerHTML = '';
  if (!value) { dropdown.hidden = true; return; }
  const matches = allTerms().filter(w => trNorm(w).includes(trNorm(value))).slice(0, 8);
  matches.forEach(word => {
    const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = word;
    btn.addEventListener('click', () => { input.value = word; dropdown.hidden = true; analyze(word); });
    dropdown.appendChild(btn);
  });
  dropdown.hidden = matches.length === 0;
}

// Mini test uses only the loaded source pairs; it does not represent a population study.
let quizBank = [], qIndex = 0, score = 0, answered = false;
const quizOptions = $('quizOptions'), quizTitle = $('quizQuestionTitle'), quizStep = $('quizStep');
const quizFeedback = $('quizFeedback'), quizNext = $('quizNext'), quizReset = $('quizReset');
const quizScore = $('quizScore'), quizScoreBar = $('quizScoreBar');
function makeQuizBank() {
  const usable = pairs.filter(p => trNorm(p.oldWord) !== trNorm(p.modernWord));
  const selected = [];
  const seen = new Set();
  for (const p of usable) {
    const key = trNorm(p.oldWord);
    if (!seen.has(key)) { selected.push(p); seen.add(key); }
    if (selected.length >= 6) break;
  }
  quizBank = selected.map((p, i) => {
    const other = usable.filter(o => trNorm(o.modernWord) !== trNorm(p.modernWord));
    // Deterministic but varied distractors; all are terms from the same published source file.
    const options = [p.modernWord];
    for (let j=0; j<other.length && options.length<4; j++) {
      const candidate = other[(i*13+j*7) % other.length].modernWord;
      if (!options.some(o => trNorm(o) === trNorm(candidate))) options.push(candidate);
    }
    return {oldWord:p.oldWord, answer:p.modernWord, options:options.sort((a,b)=>((trNorm(a).charCodeAt(0)*7+i)%11)-((trNorm(b).charCodeAt(0)*7+i)%11))};
  });
}
function renderQuiz() {
  if (!quizBank.length) {
    quizTitle.textContent = 'Kaynak yüklendikten sonra sözcük eşleştirme testi açılacak.';
    quizOptions.innerHTML = ''; quizStep.textContent = '—'; quizNext.disabled = true; return;
  }
  answered=false; quizNext.disabled=true; quizFeedback.hidden=true;
  const q=quizBank[qIndex]; quizStep.textContent=`${qIndex+1} / ${quizBank.length}`;
  quizTitle.textContent=`Kaynak dosyasında “${q.oldWord}” hangi sözcükle eşleştirilmiş?`;
  quizOptions.innerHTML='';
  q.options.forEach(opt=>{
    const b=document.createElement('button'); b.type='button'; b.className='quiz-option'; b.textContent=opt;
    b.addEventListener('click',()=>answerQuiz(opt,b)); quizOptions.appendChild(b);
  });
}
function answerQuiz(choice, button) {
  if(answered) return; answered=true;
  const q=quizBank[qIndex]; [...quizOptions.children].forEach(b=>b.disabled=true);
  [...quizOptions.children].forEach(b=>{if(trNorm(b.textContent)===trNorm(q.answer))b.classList.add('correct');});
  const correct=trNorm(choice)===trNorm(q.answer); if(correct)score++; else button.classList.add('wrong');
  quizFeedback.innerHTML=correct ? `<strong>Doğru.</strong> Kaynak dosyasında “${escapeHtml(q.oldWord)} → ${escapeHtml(q.answer)}” eşleştirmesi yer alıyor.` : `<strong>Doğru eşleştirme:</strong> ${escapeHtml(q.oldWord)} → ${escapeHtml(q.answer)}. Bu mini test yalnızca kaynak dosyasındaki sözlük eşleşmelerini ölçer; dönemsel bağlam bilgisi veya toplum geneli sonucunu ölçmez.`;
  quizFeedback.hidden=false; quizNext.disabled=false;
  const pct=Math.round(score/quizBank.length*100); quizScore.textContent=`${pct}%`; quizScoreBar.style.width=`${pct}%`;
}
function resetQuiz() { qIndex=0; score=0; quizScore.textContent='0%'; quizScoreBar.style.width='0%'; renderQuiz(); }
if (quizNext) quizNext.addEventListener('click',()=>{qIndex=(qIndex+1)%quizBank.length;if(qIndex===0){score=0;quizScore.textContent='0%';quizScoreBar.style.width='0%';}renderQuiz();});
if (quizReset) quizReset.addEventListener('click',resetQuiz);

async function loadData() {
  setStatus('loading','Turkronicles gerçek kaynak dosyası yükleniyor…');
  try {
    const response = await fetch(DATA_URL, {cache:'no-store'});
    if (!response.ok) throw new Error(`Kaynak HTTP ${response.status}`);
    const text = await response.text();
    const parsed = parseTextPairs(text);
    if (parsed.length < 20) throw new Error('Kaynak dosyasından yeterli eşleşme okunamadı.');
    pairs = parsed; sourceMode='remote';
    setStatus('success',`Gerçek kaynak bağlandı • ${pairs.length.toLocaleString('tr-TR')} sözcük eşleştirmesi yüklendi`);
  } catch (err) {
    try {
      const resp = await fetch(FALLBACK_URL);
      if (!resp.ok) throw new Error('Yedek örnek dosyası okunamadı.');
      pairs = parseFallback(await resp.json()); sourceMode='fallback';
      setStatus('warning',`Canlı kaynak erişilemedi • doğrulanmış ${pairs.length} satırlık örnek kullanılıyor`);
    } catch (fallbackErr) {
      setStatus('error','Kaynak dosyası yüklenemedi. İnternet bağlantısını kontrol et veya veri deposundaki dosya yolunu doğrula.');
      pairResults.innerHTML='<div class="empty-state"><strong>Veri yüklenemedi.</strong><p>Bu sürüm canlı veri dosyasını GitHub üzerinden almaya çalıştı ama erişim kurulamadı.</p></div>';
      wordCountLabel.textContent='Kaynak yüklenemedi'; renderQuiz(); return;
    }
  }
  wordCountLabel.textContent=`${pairs.length.toLocaleString('tr-TR')} kaynak eşleştirmesi`;
  buildSuggestions(); makeQuizBank(); renderQuiz(); analyze(input.value || 'vatan');
}

$('analyzeBtn').addEventListener('click',()=>{dropdown.hidden=true;analyze(input.value);});
input.addEventListener('keydown',e=>{if(e.key==='Enter'){dropdown.hidden=true;analyze(input.value);}});
input.addEventListener('input',updateDropdown);
document.addEventListener('click',e=>{if(!e.target.closest('.input-wrap'))dropdown.hidden=true;});
window.addEventListener('resize',()=>{ /* intentionally no chart canvas: fixed-size bug removed */ });
loadData();
