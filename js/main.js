/* =============================================
   EXPONENTIAL GROWTH SOLUTIONS LTD
   Main JavaScript
   ============================================= */

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  /* ---- Mobile hamburger ---- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Fade-up on scroll ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---- Contact form ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Basic HTML5 validation check
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      const wrap = contactForm.closest('.contact-form-wrap');
      contactForm.style.display = 'none';
      const successEl = wrap.querySelector('.form-success');
      if (successEl) successEl.style.display = 'block';
    });
  }

  /* ---- Newsletter form ---- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!newsletterForm.checkValidity()) {
        newsletterForm.reportValidity();
        return;
      }
      const successMsg = document.getElementById('newsletterSuccess');
      newsletterForm.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    });
  }

  /* ---- View All / View Less services toggle ---- */
  const viewAllBtn = document.getElementById('viewAllServicesBtn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      const extraCards = document.querySelectorAll('.service-card--extra');
      const isExpanded = viewAllBtn.getAttribute('aria-expanded') === 'true';
      extraCards.forEach(card => {
        card.style.display = isExpanded ? 'none' : '';
      });
      viewAllBtn.textContent = isExpanded ? 'View All Solutions' : 'View Less';
      viewAllBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    });
    viewAllBtn.setAttribute('aria-expanded', 'false');
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
