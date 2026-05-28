document.addEventListener('DOMContentLoaded', function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');

  function setTheme(theme){
    root.setAttribute('data-theme', theme);
    if(themeToggle){
      // update accessible attributes; visuals are handled in CSS
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    try{ localStorage.setItem('theme', theme); }catch(e){}
  }

  const stored = localStorage.getItem('theme');
  if(stored){
    setTheme(stored);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }

  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // Smooth scroll with header offset for nav links
  document.querySelectorAll('.site-nav a[href^="#"]').forEach(link=>{
    link.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if(!target){ return; }
      e.preventDefault();
      const header = document.querySelector('.site-header');
      const headerH = header ? header.offsetHeight : 0;
      const top = window.pageYOffset + target.getBoundingClientRect().top - headerH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
      // focus target for accessibility after scroll
      setTimeout(()=>{ target.setAttribute('tabindex','-1'); target.focus(); }, 600);
    });
  });

  if(yearEl) yearEl.textContent = new Date().getFullYear();
});
