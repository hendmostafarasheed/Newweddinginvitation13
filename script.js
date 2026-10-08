const cover = document.getElementById('cover');
const details = document.getElementById('details');
const transitionCurtain = document.getElementById('transitionCurtain');
const openInvitation = document.getElementById('openInvitation');
const music = document.getElementById('bgMusic');
const clickSound = document.getElementById('clickSound');
const musicToggle = document.getElementById('musicToggle');
const modal = document.getElementById('rsvpModal');
const toast = document.getElementById('toast');

function playClick(){ try { clickSound.currentTime=0; clickSound.play().catch(()=>{}); } catch(e){} }
function showToast(message){ toast.textContent=message; toast.classList.add('show'); clearTimeout(showToast.t); showToast.t=setTimeout(()=>toast.classList.remove('show'),2600); }

openInvitation.addEventListener('click', async ()=>{
  playClick();
  try { await music.play(); musicToggle.textContent='♫'; } catch(e){}
  transitionCurtain.classList.add('go');
  setTimeout(()=>{ cover.classList.remove('active'); cover.setAttribute('aria-hidden','true'); details.classList.add('active'); details.setAttribute('aria-hidden','false'); window.scrollTo({top:0,behavior:'instant'}); },850);
  setTimeout(()=>transitionCurtain.classList.remove('go'),1450);
});

musicToggle.addEventListener('click',()=>{
  playClick();
  if(music.paused){ music.play().then(()=>musicToggle.textContent='♫').catch(()=>{}); }
  else { music.pause(); musicToggle.textContent='🔇'; }
});

document.querySelectorAll('.hotspot').forEach(btn=>btn.addEventListener('click',()=>{
  playClick();
  const action=btn.dataset.action;
  if(action==='location') window.open('https://www.google.com/maps/search/?api=1&query=Al+Zahra+Sports+Club+Cairo+Egypt','_blank','noopener');
  if(action==='rsvp'){ modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); }
  if(action==='share'){
    const data={title:'محمد خليفة & سارة عيد — حفلة خطوبة',text:'حفلة خطوبة محمد خليفة وسارة عيد ✨',url:location.href};
    if(navigator.share) navigator.share(data).catch(()=>{});
    else if(navigator.clipboard) navigator.clipboard.writeText(location.href).then(()=>showToast('تم نسخ رابط الدعوة ✨')).catch(()=>showToast('انسخي رابط الدعوة لمشاركته ✨'));
    else showToast('انسخي رابط الدعوة لمشاركته ✨');
  }
  if(action==='photos') showToast('صور الحفلة — قريبًا ✨');
}));

document.querySelector('.modal-close').addEventListener('click',()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true');playClick()});
modal.addEventListener('click',e=>{if(e.target===modal){modal.classList.remove('show');modal.setAttribute('aria-hidden','true')}});

document.getElementById('rsvpForm').addEventListener('submit',e=>{
  e.preventDefault(); playClick(); document.getElementById('rsvpForm').hidden=true; document.getElementById('rsvpThanks').hidden=false;
});

const glitter=document.getElementById('glitter');
for(let i=0;i<105;i++){
  const el=document.createElement('i');
  if(i%13===0) el.className='gem large'; else if(i%6===0) el.className='gem'; else el.className=i%11===0?'spark big':'spark';
  el.style.left=(Math.random()*100)+'%'; el.style.top=(Math.random()*100)+'%';
  el.style.setProperty('--dur',(2.2+Math.random()*4.8)+'s'); el.style.setProperty('--delay',(-Math.random()*6)+'s');
  glitter.appendChild(el);
}
