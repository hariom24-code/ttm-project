// app.js — Enhanced GSAP animations, smooth scroll, counters and interactions
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('[data-scroll]');
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const counters = document.querySelectorAll('[data-counter]');

  // mobile menu toggle
  if (mobileToggle) mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    if (!mobileMenu) return;
    // animate with GSAP when available
    if (window.gsap) {
      if (expanded) { // closing
        gsap.to(mobileMenu, { height: 0, duration: 0.35, ease: 'power2.in', onComplete() { mobileMenu.classList.add('hidden'); } });
      } else { // opening
        mobileMenu.classList.remove('hidden');
        const fullH = mobileMenu.scrollHeight;
        gsap.fromTo(mobileMenu, { height: 0 }, { height: fullH, duration: 0.35, ease: 'power2.out', clearProps: 'height' });
      }
    } else {
      mobileMenu.classList.toggle('hidden');
    }
  });

  // header style on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // GSAP timeline for hero entrance
  if (window.gsap) {
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    // subtle header entrance animation
    gsap.from('#site-header', { y: -36, opacity: 0, duration: 0.7, ease: 'power2.out' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('#brand-icon', { y: -10, opacity: 0, duration: 0.6 })
      .from('#brand', { y: -6, opacity: 0, duration: 0.6 }, '<')
      .from('#hero-title', { y: 30, opacity: 0, duration: 0.9 }, '>-0.1')
      .from('#hero-sub', { y: 15, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('#cta-demo', { scale: 0.96, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('#cta-learn', { scale: 0.96, opacity: 0, duration: 0.6 }, '-=0.5');

    // feature cards stagger
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' },
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.12
      });
    });

    // counters using GSAP
    counters.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target')) || 0;
      gsap.fromTo({ val: 0 }, { val: target, duration: 2.2, ease: 'power1.out', onUpdate() {
        const v = this.targets()[0].val;
        if (target % 1 !== 0) el.textContent = v.toFixed(1);
        else el.textContent = Math.round(v);
      }});
    });

  } else {
    // fallback counters if GSAP missing
    counters.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target')) || 0;
      let start = 0;
      const dur = 2000; const steps = 60; let step = 0;
      const timer = setInterval(() => { step++; start += target / steps; el.textContent = (target%1!==0)?start.toFixed(1):Math.round(start); if (step>=steps) clearInterval(timer); }, dur/steps);
    });
  }

  // Smooth scroll helper
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.gsap && window.gsap.to && window.ScrollToPlugin) {
      try { gsap.to(window, { duration: 1, scrollTo: { y: el, offsetY: 80 }, ease: 'power2.out' }); return; } catch(e){}
    }
    el.scrollIntoView({ behavior: 'smooth' });
  }

  // nav link handlers
  document.querySelectorAll('[data-scroll]').forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.getAttribute('data-scroll');
    // close mobile menu and update aria
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      if (window.gsap) gsap.to(mobileMenu, { height: 0, duration: 0.28, ease: 'power2.in', onComplete() { mobileMenu.classList.add('hidden'); } });
      else mobileMenu.classList.add('hidden');
    }
    scrollToSection(id);
  }));

  // feature card hover micro-interactions
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { scale: 1.02, boxShadow: '0 20px 40px rgba(2,6,23,0.08)', duration: 0.3 }));
    card.addEventListener('mouseleave', () => gsap.to(card, { scale: 1, boxShadow: '0 6px 18px rgba(2,6,23,0.04)', duration: 0.35 }));
  });

  // Contact form submission (simulated)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.classList.remove('hidden');
      formStatus.className = 'mb-6 p-4 rounded-lg bg-blue-100 text-blue-800';
      formStatus.textContent = 'Submitting...';
      setTimeout(() => { formStatus.className = 'mb-6 p-4 rounded-lg bg-green-100 text-green-800'; formStatus.textContent = "Thank you! We'll be in touch within 24 hours."; form.reset(); }, 900);
    });
  }

});
