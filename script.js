/* =============================================================
   PORTFOLIO — script.js
   Tab navigation + skill bar animation trigger
   No libraries required — plain JS only
   ============================================================= */

(function () {
  'use strict';

  // ── Tab Navigation ────────────────────────────────────────
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('.tab-section');

  function activateTab(targetId) {
    // hide all sections
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    // remove active from all nav links
    navLinks.forEach(link => link.classList.remove('active'));

    // show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      // animate skill bars when skills tab becomes active
      if (targetId === 'skills') animateSkillBars();
    }

    // activate corresponding nav link
    const activeLink = document.querySelector(`.nav-link[data-tab="${targetId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // scroll to top of content smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Nav link click handler
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.getAttribute('data-tab');
      if (tab) activateTab(tab);
    });
  });

  // Hero "View Projects" ghost button
  const ghostBtn = document.querySelector('.btn-ghost[data-scroll-tab]');
  if (ghostBtn) {
    ghostBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = ghostBtn.getAttribute('data-scroll-tab');
      if (tab) activateTab(tab);
    });
  }

  // ── Skill Bar Animation ───────────────────────────────────
  // Skill bars animate from scaleX(0) → scaleX(1) on tab reveal.
  // CSS handles the transition; JS just ensures the class is set
  // so the transition fires after the section becomes visible.
  function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    fills.forEach(fill => {
      // force reflow so transition plays each time
      fill.style.transform = 'scaleX(0)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.transform = '';
        });
      });
    });
  }

  // ── Handle initial hash ────────────────────────────────────
  // Allows direct linking: portfolio.html#projects
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['summary', 'skills', 'projects', 'experience'];
  if (hash && validTabs.includes(hash)) {
    activateTab(hash);
  } else {
    activateTab('summary');
  }

  // ── Subtle navbar shadow on scroll ───────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.07)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });

})();
