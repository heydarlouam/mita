// ==== منوی موبایل (با دسترسی) ====
(function(){
  var ham = document.getElementById('hamburger');
  var menu = document.getElementById('mobileMenu');
  if(!ham || !menu) return;

  function lockScroll(lock){
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  }
  function openMenu(){ menu.hidden = false; ham.setAttribute('aria-expanded','true'); lockScroll(true); }
  function closeMenu(){ menu.hidden = true; ham.setAttribute('aria-expanded','false'); lockScroll(false); }

  ham.addEventListener('click', function(){ menu.hidden ? openMenu() : closeMenu(); });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && !menu.hidden) closeMenu(); });
  document.addEventListener('click', function(e){ if(menu.hidden) return; var within = menu.contains(e.target) || ham.contains(e.target); if(!within) closeMenu(); });
})();

// پالت‌های گرادیان برای لوگو + تایپلاین
const PALETTES = [
  ["#ff4d4d","#ffb84d","#4dd2ff","#b84dff"],
  ["#71dd8a","#3aaed8","#2b6cb0","#845ef7"],
  ["#ff8a00","#e52e71","#7f00ff","#00dbde"],
  ["#ff416c","#ff4b2b","#ffd166","#06d6a0"],
  ["#00c6ff","#0072ff","#7f00ff","#e100ff"]
];
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function paintGrad(gradEl, colors){
  const stops = gradEl.querySelectorAll('stop');
  const c = colors.length >= 3 ? colors : [colors[0], colors[0], colors[0]];
  const mid = c[Math.floor(c.length/2)];
  const end = c[c.length-1];
  stops[0].setAttribute('stop-color', c[0]);
  stops[1].setAttribute('stop-color', mid);
  stops[2].setAttribute('stop-color', end);
  const root = document.documentElement.style; root.setProperty('--g1', c[0]); root.setProperty('--g2', mid); root.setProperty('--g3', end);
}
function recolor(){ paintGrad(document.getElementById('logoGrad'), pick(PALETTES)); }
document.addEventListener('DOMContentLoaded', ()=>{ recolor(); setInterval(recolor, 6000); document.getElementById('y').textContent = new Date().getFullYear(); });

// افکت تایپ دو زبانه با رعایت دسترسی
const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
async function typeText(el,text,speed){ el.textContent=""; for(let i=1;i<=text.length;i++){ el.textContent=text.slice(0,i); await sleep(speed);} }
async function deleteText(el,speed){ for(let i=el.textContent.length;i>=0;i--){ el.textContent=el.textContent.slice(0,i); await sleep(speed);} }
async function startTypeLoop(){
  const el=document.getElementById("typeBox");
  const items=[ {text:"منومیتا", dir:"ltr"}, {text:"menumita", dir:"ltr"} ];
  while(true){ for(const it of items){ el.style.direction = it.dir; el.style.textAlign = "center"; await typeText(el,it.text,120); await sleep(800); await deleteText(el,90); await sleep(400);} }
}
document.addEventListener("DOMContentLoaded",startTypeLoop);

// بارگذاری تدریجی تصاویر (افزودن کلاس loaded هنگام ورود به ویوپورت)
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { if (entry.isIntersecting) { const img = entry.target; img.classList.add('loaded'); observer.unobserve(img); } });
  }, { rootMargin: '150px 0px' });
  lazyImages.forEach(img => imageObserver.observe(img));
});