
  // ---------- Mobile sidebar menu ----------
  const menuBtn = document.getElementById('menuBtn');
  const navLogo = document.getElementById("navLogo");
  const sidebarLogo = document.getElementById("sidebarLogo");
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu(){
    mobileOverlay.classList.remove('hidden');
    mobileMenu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu(){
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
    setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
  }
  menuBtn.addEventListener('click', openMobileMenu);
  menuCloseBtn.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileMenu.querySelectorAll('a, button.flex-1').forEach(el => {
    el.addEventListener('click', closeMobileMenu);
  });

  // ---------- Navbar dropdowns ----------
  function setupDropdown(btnId, panelId, chevronId){
    const btn = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    const chevron = document.getElementById(chevronId);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !panel.classList.contains('hidden');
      document.querySelectorAll('.dropdown-panel-open').forEach(p => p.classList.add('hidden'));
      if(isOpen){
        panel.classList.add('hidden');
        chevron.style.transform = 'rotate(0deg)';
      } else {
        panel.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
      }
    });
    panel.classList.add('dropdown-panel-open');
  }
  setupDropdown('learnBtn', 'learnPanel', 'learnChevron');
  setupDropdown('resBtn', 'resPanel', 'resChevron');
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-panel-open').forEach(p => p.classList.add('hidden'));
    const lc = document.getElementById('learnChevron');
    const rc = document.getElementById('resChevron');
    if(lc) lc.style.transform = 'rotate(0deg)';
    if(rc) rc.style.transform = 'rotate(0deg)';
  });

  // ---------- Theme toggle (light/dark) ----------
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const root = document.documentElement;

  function applyTheme(isDark) {
    root.classList.toggle("dark", isDark);

    // Change Logo
    if (navLogo) {
        navLogo.src = isDark
            ? "assets/images/light-logo.png"   // Dark Theme
            : "assets/images/dark-logo.png";   // Light Theme
    }
     if (sidebarLogo) {
        sidebarLogo.src = isDark
            ? "assets/images/light-logo.png"   // Dark Theme
            : "assets/images/dark-logo.png";   // Light Theme
     }

    if (themeToggle) {
        themeToggle.innerHTML = isDark
            ? '<i data-lucide="sun" class="w-5 h-5"></i>'
            : '<i data-lucide="moon" class="w-5 h-5"></i>';
    }

    if (themeToggleMobile) {
        themeToggleMobile.innerHTML = isDark
            ? '<i data-lucide="sun" class="w-5 h-5"></i> Light Mode'
            : '<i data-lucide="moon" class="w-5 h-5"></i> Dark Mode';
    }

    lucide.createIcons();

    localStorage.setItem("matshub-theme", isDark ? "dark" : "light");
}

  function initTheme(){
    let saved = null;
    try { saved = window.localStorage.getItem('matshub-theme'); } catch(e){}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved ? saved === 'dark' : prefersDark);
  }
  initTheme();

  function toggleTheme(){
    applyTheme(!root.classList.contains('dark'));
  }
  if(themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if(themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // ---------- Features data ----------
    const features = [
    {
        icon: '<i class="fa-solid fa-cart-shopping text-3xl text-emerald-500"></i>',
        title: 'E-commerce',
        desc: 'Setup and manage your online store'
    },
    {
        icon: '<i class="fa-brands fa-facebook text-3xl text-blue-600"></i>',
        title: 'Facebook Page Creation',
        desc: 'Design and optimize your business page'
    },
    {
        icon: '<i class="fa-solid fa-bullhorn text-3xl text-orange-500"></i>',
        title: 'Facebook Ads & Marketing',
        desc: 'Run targeted ad campaigns effectively'
    },
    {
        icon: '<i class="fa-solid fa-globe text-3xl text-cyan-500"></i>',
        title: 'Digital Marketing',
        desc: 'Grow your brand with online strategies'
    },
    {
        icon: '<i class="fa-solid fa-palette text-3xl text-pink-500"></i>',
        title: 'Posters & Logo Design',
        desc: 'Create impactful graphics & branding'
    },
    {
        icon: '<i class="fa-brands fa-google text-3xl text-red-500"></i>',
        title: 'Google Ads',
        desc: 'Reach more customers with Google campaigns'
    }
    ];
  const featureGrid = document.getElementById('featureGrid');
  features.forEach(f => {
    featureGrid.insertAdjacentHTML('beforeend', `
      <div class="card-hover bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 text-left">
        <div class="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 flex items-center justify-center text-xl">${f.icon}</div>
        <p class="font-semibold mt-4 text-slate-800 dark:text-slate-100 text-sm">${f.title}</p>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">${f.desc}</p>
      </div>
    `);
  });

  // ---------- FAQ data & accordion ----------
  const faqs = [
    {q:'What is MATsHub?', a:'MATsHub is a technology and growth partner helping businesses with web development, digital marketing, branding, and online education.'},
    {q:'What services does MATsHub provide?', a:'We provide web development, e-commerce setup, digital marketing, social media ads, graphic design, and branding services.'},
    {q:'Does MATsHub offer online courses?', a:'Yes, we offer advanced-level courses in frontend and full stack web development taught by industry experts.'},
    {q:'Are MATsHub\'s courses suitable for beginners?', a:'Absolutely — our courses start from the basics and progress to advanced topics, suitable for all skill levels.'},
    {q:'How can I get started with MATsHub?', a:'Simply click "Get Started" at the top of the page and our team will reach out to discuss your project.'},
    {q:'Do you offer ongoing support after project delivery?', a:'Yes, we provide 24/7 dedicated support to all our clients after project completion.'},
  ];
  const faqList = document.getElementById('faqList');
  let faqVisible = 4;

  function renderFaqs(){
    faqList.innerHTML = '';
    faqs.slice(0, faqVisible).forEach((item, i) => {
      faqList.insertAdjacentHTML('beforeend', `
        <div class="faq-item border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
          <button class="faq-toggle w-full flex items-center justify-between text-left px-5 py-4 font-medium text-sm text-slate-800 dark:text-slate-100">
            <span>${item.q}</span>
            <span class="faq-chevron text-brand-500">▾</span>
          </button>
          <div class="faq-panel px-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <p class="pb-4">${item.a}</p>
          </div>
        </div>
      `);
    });
    document.querySelectorAll('.faq-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const panel = item.querySelector('.faq-panel');
        const isOpen = item.classList.contains('faq-open');
        document.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('faq-open');
          el.querySelector('.faq-panel').style.maxHeight = null;
        });
        if(!isOpen){
          item.classList.add('faq-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }
  renderFaqs();
  document.getElementById('faqMore').addEventListener('click', (e) => {
    faqVisible = faqVisible >= faqs.length ? 4 : faqs.length;
    e.target.textContent = faqVisible >= faqs.length ? 'Show Less' : 'Show More';
    renderFaqs();
  });

  // ---------- Counters ----------
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          current += step;
          if(current >= target){ current = target; clearInterval(timer); }
          el.textContent = current;
        }, 20);
        counterObserver.unobserve(el);
      }
    });
  }, {threshold:0.4});
  counters.forEach(c => counterObserver.observe(c));

  // ---------- Fade up on scroll ----------
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  fadeEls.forEach(el => fadeObserver.observe(el));

  // ---------- Scroll to top button ----------
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 500){
      scrollBtn.classList.remove('hidden');
      scrollBtn.classList.add('flex');
    } else {
      scrollBtn.classList.add('hidden');
      scrollBtn.classList.remove('flex');
    }
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
