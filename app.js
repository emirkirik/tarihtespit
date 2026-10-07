const years = [1900, 1930, 1960, 2000, 2020];

const WORDS = [
  'millet','vatan','hürriyet','devlet','medeniyet','maarif','mektep','adalet','cumhuriyet','meclis',
  'kanun','halk','yurt','inkılap','muallim','talebe','şehir','memleket','kültür','eğitim','terakki',
  'cemiyet','tebaa','kavim','milletdaş','vatandaş','özgürlük','hak','hukuk','meşrutiyet','saltanat',
  'idare','hükümet','mebus','vekil','maarif','öğretim','okul','öğrenci','öğretmen','toplum',
  'medenî','bilim','ilim','sanayi','memur','milletvekili','demokrasi','yönetim','şehirleşme','ülke','toprak'
];

const base = {
  millet: [0.18,0.27,0.51,0.72,0.78], vatan:[0.17,0.34,0.61,0.59,0.64], hürriyet:[0.72,0.41,0.63,0.81,0.86],
  devlet:[0.24,0.31,0.49,0.55,0.58], medeniyet:[0.62,0.35,0.51,0.67,0.73], maarif:[0.74,0.46,0.65,0.76,0.81],
  mektep:[0.69,0.55,0.71,0.76,0.79], adalet:[0.32,0.38,0.44,0.49,0.52], cumhuriyet:[0.12,0.36,0.47,0.56,0.61],
  meclis:[0.22,0.48,0.55,0.62,0.67], kanun:[0.28,0.37,0.43,0.46,0.49], halk:[0.25,0.34,0.47,0.53,0.56],
  yurt:[0.18,0.31,0.39,0.42,0.43], inkılap:[0.11,0.36,0.57,0.64,0.69], muallim:[0.70,0.52,0.65,0.72,0.76],
  talebe:[0.66,0.54,0.62,0.68,0.71], şehir:[0.22,0.31,0.39,0.45,0.48], memleket:[0.37,0.43,0.51,0.53,0.55],
  kültür:[0.18,0.27,0.46,0.58,0.63], eğitim:[0.16,0.39,0.49,0.54,0.59], terakki:[0.77,0.51,0.69,0.79,0.83]
};

const contexts = {
  millet:['devlet','halk','toplum','vatandaş','ulus'], vatan:['memleket','millet','devlet','yurt','toprak'], hürriyet:['hak','özgürlük','kanun','millet','adalet'],
  devlet:['millet','hükümet','kanun','ülke','cumhuriyet'], medeniyet:['terakki','maarif','batı','kültür','bilim'], maarif:['mektep','muallim','talebe','eğitim','öğretim'],
  mektep:['talebe','muallim','maarif','okul','öğrenci'], adalet:['hak','mahkeme','kanun','eşitlik','hukuk'], cumhuriyet:['millet','meclis','halk','devlet','demokrasi'],
  meclis:['millet','vekiller','kanun','hükümet','demokrasi'], kanun:['hukuk','mahkeme','devlet','hak','meclis'], halk:['millet','köylü','toplum','vatandaş','emekçi'],
  yurt:['ülke','vatan','öğrenci','toplum','memleket'], inkılap:['cumhuriyet','devrim','millet','kanun','yenilik'], muallim:['mektep','talebe','maarif','muallim','öğretmen'],
  talebe:['mektep','muallim','maarif','öğrenci','eğitim'], şehir:['kent','sokak','nüfus','belediye','memleket'], memleket:['vatan','ülke','şehir','millet','köy'],
  kültür:['medeniyet','sanat','dil','toplum','eğitim'], eğitim:['öğretim','okul','öğrenci','maarif','kültür'], terakki:['medeniyet','maarif','ilim','sanayi','yenilik']
};

const DEMO = {};
WORDS.forEach((word, idx) => {
  const key = word.toLocaleLowerCase('tr-TR');
  let values = base[key];
  if (!values) {
    const seed = (idx * 0.037) % 0.16;
    values = [0.14 + seed,0.24 + ((idx*0.031)%0.20),0.34 + ((idx*0.047)%0.22),0.46 + ((idx*0.041)%0.24),0.52 + ((idx*0.029)%0.28)].map(v => Math.min(v,0.92));
  }
  const ctxs = contexts[key] || [WORDS[(idx+3)%WORDS.length], WORDS[(idx+7)%WORDS.length], WORDS[(idx+11)%WORDS.length], WORDS[(idx+15)%WORDS.length], WORDS[(idx+19)%WORDS.length]];
  const score = values[values.length - 1];
  let maxDelta = -1, maxPeriod = '1900 → 1930';
  values.slice(1).forEach((v,i)=>{ const d = Math.abs(v-values[i]); if(d>maxDelta){maxDelta=d; maxPeriod = `${years[i]} → ${years[i+1]}`;} });
  DEMO[key] = {title:`“${word}” için dönemsel anlam ve bağlam değişimi`,score,fastPeriod:maxPeriod,topContext:ctxs[0],years,values,contexts:ctxs.map((x,i)=>[x,70-i*7]),source:'Demo verisidir. Gerçek araştırma sürümünde sonuçlar gerçek tarihî metinler ve bibliyografik kaynak kayıtlarıyla eşleştirilecektir.'};
});

const quizBank = [
  {word:'millet', period:'1900–1930', options:['devlet','trafik','sürgün','spor'], correct:0, explanation:'Demo referansında “devlet” seçeneği güçlü yakın bağlam olarak tanımlanmıştır.'},
  {word:'maarif', period:'1900–1930', options:['mektep','teknoloji','futbol','liman'], correct:0, explanation:'Demo referansında “mektep” eğitim bağlamı içinde öne çıkarılmıştır.'},
  {word:'hürriyet', period:'1900–1930', options:['hak','belediye','fabrika','ulaşım'], correct:0, explanation:'Demo referansında “hak” ve “özgürlük” güçlü yakın bağlam örnekleridir.'},
  {word:'meclis', period:'1930–1960', options:['millet','spor','gıda','ulaşım'], correct:0, explanation:'Demo referansında “millet” güçlü yakın bağlam örneğidir.'},
  {word:'medeniyet', period:'1900–1930', options:['terakki','sokak','hastane','oyun'], correct:0, explanation:'Demo referansında “terakki” yakın bağlam örneği olarak kullanılmıştır.'},
  {word:'mektep', period:'1900–1930', options:['talebe','internet','metro','enerji'], correct:0, explanation:'Demo referansında “talebe” güçlü yakın bağlam örneğidir.'}
];

const input=document.getElementById('wordInput'), analyzeBtn=document.getElementById('analyzeBtn'), canvas=document.getElementById('changeChart');
const ctx=canvas.getContext('2d'), network=document.getElementById('contextNetwork');
const resultTitle=document.getElementById('resultTitle'), changeBadge=document.getElementById('changeBadge'), fastPeriod=document.getElementById('fastPeriod'), topContext=document.getElementById('topContext');
const sourceTitle=document.getElementById('sourceTitle'), sourceText=document.getElementById('sourceText');
const suggestions=document.getElementById('suggestions'), dropdown=document.getElementById('suggestionDropdown');

function resizeCanvas(){
  const cssWidth=Math.max(300,Math.floor(canvas.parentElement.clientWidth-24)), cssHeight=240, ratio=window.devicePixelRatio||1;
  canvas.style.width=`${cssWidth}px`; canvas.style.height=`${cssHeight}px`; canvas.width=Math.floor(cssWidth*ratio); canvas.height=Math.floor(cssHeight*ratio); ctx.setTransform(ratio,0,0,ratio,0,0);
}
function drawChart(data){
  resizeCanvas(); const w=parseFloat(canvas.style.width),h=parseFloat(canvas.style.height); ctx.clearRect(0,0,w,h); const pad={left:38,right:18,top:16,bottom:33},plotW=w-pad.left-pad.right,plotH=h-pad.top-pad.bottom;
  ctx.font='10px Inter, sans-serif'; ctx.fillStyle='#8f8578'; ctx.textAlign='right';
  [0,.25,.5,.75,1].forEach(v=>{const y=pad.top+(1-v)*plotH;ctx.strokeStyle='#e8ddd0';ctx.lineWidth=1;ctx.setLineDash([4,5]);ctx.beginPath();ctx.moveTo(pad.left,y);ctx.lineTo(w-pad.right,y);ctx.stroke();ctx.setLineDash([]);ctx.fillText(v.toFixed(2),pad.left-8,y+3);});
  const points=data.values.map((v,i)=>({x:pad.left+(i/(data.values.length-1))*plotW,y:pad.top+(1-v)*plotH}));
  ctx.strokeStyle='#b04b33';ctx.lineWidth=4;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();
  points.forEach((p,i)=>{ctx.fillStyle='#fffdf8';ctx.strokeStyle='#b04b33';ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#7d7367';ctx.textAlign=i===0?'left':(i===points.length-1?'right':'center');ctx.fillText(String(data.years[i]),p.x,h-10);});
}
function drawNetwork(data,word){
  network.innerHTML='';const w=network.clientWidth,h=network.clientHeight,center={x:w/2,y:h/2}; const hub=document.createElement('div');hub.className='node central';hub.textContent=word;hub.style.left=`${center.x}px`;hub.style.top=`${center.y}px`;network.appendChild(hub);
  const positions=[[.18,.24],[.50,.11],[.82,.24],[.88,.55],[.71,.82],[.30,.84],[.12,.57]];
  data.contexts.forEach(([word,weight],i)=>{const p=positions[i%positions.length],node=document.createElement('div');node.className='node';node.textContent=`${word} · ${weight}`;node.style.left=`${w*p[0]}px`;node.style.top=`${h*p[1]}px`;network.appendChild(node);const ex=w*p[0]-center.x,ey=h*p[1]-center.y,len=Math.hypot(ex,ey),ang=Math.atan2(ey,ex)*180/Math.PI,edge=document.createElement('div');edge.className='edge';edge.style.left=`${center.x}px`;edge.style.top=`${center.y}px`;edge.style.width=`${len}px`;edge.style.transform=`rotate(${ang}deg)`;edge.style.opacity=String(Math.max(.24,weight/100));network.insertBefore(edge,hub);});
}
function analyze(word){const raw=word.trim();const key=raw.toLocaleLowerCase('tr-TR');const data=DEMO[key]||DEMO.millet;const exists=!!DEMO[key];resultTitle.textContent=data.title;changeBadge.textContent=data.score.toFixed(2);fastPeriod.textContent=data.fastPeriod;topContext.textContent=data.topContext;sourceTitle.textContent=exists?'Demo sonuç — gerçek kaynak eşlemesi bekleniyor.':`“${raw||'kelime'}” demo corpus'ta bulunamadı.`;sourceText.textContent=exists?data.source:'Demo sözlüğümüzde 50+ kelime bulunuyor. Gerçek araştırma sürümünde yeni kelimeler corpus üzerinden üretilecek.';drawChart(data);drawNetwork(data,key);}

function buildSuggestions(filter=''){
  suggestions.innerHTML=''; const f=filter.toLocaleLowerCase('tr-TR'); WORDS.filter(w=>!f||w.includes(f)).slice(0,16).forEach(word=>{const b=document.createElement('button');b.dataset.word=word;b.textContent=word;b.addEventListener('click',()=>{input.value=word;dropdown.hidden=true;analyze(word);});suggestions.appendChild(b);});
}
function updateDropdown(){const value=input.value.trim(); if(!value){dropdown.hidden=true;return;} const matches=WORDS.filter(w=>w.includes(value.toLocaleLowerCase('tr-TR'))).slice(0,8);dropdown.innerHTML='';matches.forEach(word=>{const b=document.createElement('button');b.textContent=word;b.addEventListener('click',()=>{input.value=word;dropdown.hidden=true;analyze(word);});dropdown.appendChild(b);});dropdown.hidden=matches.length===0;}
analyzeBtn.addEventListener('click',()=>analyze(input.value)); input.addEventListener('keydown',e=>{if(e.key==='Enter'){dropdown.hidden=true;analyze(input.value);}}); input.addEventListener('input',updateDropdown); document.addEventListener('click',e=>{if(!e.target.closest('.input-wrap'))dropdown.hidden=true;}); window.addEventListener('resize',()=>analyze(input.value));
buildSuggestions(); analyze('millet'); document.getElementById('wordCountLabel').textContent=`${WORDS.length}+ demo kelime`;

// Farkındalık testi
const quizOptions=document.getElementById('quizOptions'),quizTitle=document.getElementById('quizQuestionTitle'),quizStep=document.getElementById('quizStep'),quizFeedback=document.getElementById('quizFeedback'),quizNext=document.getElementById('quizNext'),quizReset=document.getElementById('quizReset'),quizScore=document.getElementById('quizScore'),quizScoreBar=document.getElementById('quizScoreBar');
let qIndex=0,score=0,answered=false;
function renderQuiz(){const q=quizBank[qIndex];answered=false;quizNext.disabled=true;quizFeedback.hidden=true;quizStep.textContent=`${qIndex+1} / ${quizBank.length}`;quizTitle.textContent=`“${q.word}” kelimesinin ${q.period} dönemindeki yakın bağlamını seç.`;quizOptions.innerHTML='';q.options.forEach((opt,i)=>{const b=document.createElement('button');b.className='quiz-option';b.textContent=opt;b.addEventListener('click',()=>answerQuiz(i,b));quizOptions.appendChild(b);});}
function answerQuiz(choice,button){if(answered)return;answered=true;const q=quizBank[qIndex],buttons=[...quizOptions.children];buttons.forEach(b=>b.disabled=true);buttons[q.correct].classList.add('correct'); if(choice===q.correct){score++;button.classList.add('correct');quizFeedback.innerHTML='<strong>Doğru.</strong> '+q.explanation;}else{button.classList.add('wrong');quizFeedback.innerHTML='<strong>Bu demoda doğru seçenek farklı.</strong> '+q.explanation;}quizFeedback.hidden=false;quizNext.disabled=false;const pct=Math.round(score/quizBank.length*100);quizScore.textContent=`${pct}%`;quizScoreBar.style.width=`${pct}%`;}
quizNext.addEventListener('click',()=>{qIndex=(qIndex+1)%quizBank.length;if(qIndex===0){score=0;quizScore.textContent='0%';quizScoreBar.style.width='0%';}renderQuiz();});quizReset.addEventListener('click',()=>{qIndex=0;score=0;quizScore.textContent='0%';quizScoreBar.style.width='0%';renderQuiz();});renderQuiz();
