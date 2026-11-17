/* เมนูบนมือถือ: ย่อเหลือ ชื่อเว็บ + หน้าปัจจุบัน + ปุ่ม ☰ (กดแล้วกางทุกหน้า) */
(function(){
  var css='.pz-burger{display:none}'+
    '@media (max-width:760px){'+
      '.sitenav{align-items:center}'+
      '.sitenav .pz-burger{display:inline-flex;align-items:center;justify-content:center;margin-left:auto;width:40px;height:36px;padding:0;border:0;border-radius:10px;background:transparent;cursor:pointer;color:inherit}'+
      '.sitenav .pz-burger:hover{background:rgba(127,127,127,.18)}'+
      '.sitenav .pz-burger svg{display:block}'+
      '.sitenav:not(.pz-open) a:not(.brand):not([aria-current]){display:none!important}'+
      '.sitenav.pz-open a:not(.brand){flex:1 1 40%;text-align:center}'+
      '.sitenav a.brand{order:-3}.sitenav a[aria-current]{order:-2;flex:0 1 auto}.sitenav .pz-burger{order:-1}'+
      '.sitenav.pz-open a:not(.brand):not([aria-current]){order:0}'+
    '}';
  var st=document.createElement('style'); st.textContent=css; (document.head||document.documentElement).appendChild(st);
  var OPEN='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
      SHUT='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  function init(){
    var navs=document.querySelectorAll('.sitenav');
    [].forEach.call(navs,function(nav){
      if(nav.querySelector('.pz-burger')) return;
      var b=document.createElement('button'); b.type='button'; b.className='pz-burger'; b.setAttribute('aria-label','เปิดเมนู'); b.setAttribute('aria-expanded','false'); b.innerHTML=OPEN;
      var ref=nav.querySelector('a:not(.brand):not([aria-current])')||nav.querySelector('a'); if(ref) b.style.color=getComputedStyle(ref).color;
      var brand=nav.querySelector('.brand'); if(brand&&brand.nextSibling) nav.insertBefore(b,brand.nextSibling); else nav.appendChild(b);
      function set(o){ nav.classList.toggle('pz-open',o); b.setAttribute('aria-expanded',o?'true':'false'); b.setAttribute('aria-label',o?'ปิดเมนู':'เปิดเมนู'); b.innerHTML=o?SHUT:OPEN; }
      b.onclick=function(e){ e.stopPropagation(); set(!nav.classList.contains('pz-open')); };
      document.addEventListener('click',function(e){ if(nav.classList.contains('pz-open')&&!nav.contains(e.target)) set(false); });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&nav.classList.contains('pz-open')){ set(false); b.focus(); } });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
