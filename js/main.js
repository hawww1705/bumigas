/* ==========================================================================
   BUMIGAS - Main Javascript Controller (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initStatsCounters();
  initAccordions();
  initModals();
  initBackToTop();
  initForms();
  initProjectFilters();
});

/* 1. STICKY HEADER & SCROLL TRANSFORMATIONS */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Initial check in case of page refresh
  checkScroll();
  window.addEventListener('scroll', checkScroll);
}

/* 2. MOBILE MENU DRAWER TOGGLE */
function initMobileMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!burgerMenu || !navMenu) return;

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    navMenu.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('open');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* 3. SCROLL REVEAL ANIMATIONS */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, no need to watch again
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(element => {
    revealObserver.observe(element);
  });
}

/* 4. STATISTICAL NUMBER COUNTER ANIMATION */
function initStatsCounters() {
  const counters = document.querySelectorAll('.counter-value');
  if (counters.length === 0) return;

  const countUp = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const speed = parseInt(counter.getAttribute('data-speed')) || 2000; // milliseconds
    const stepTime = 30; // ms between updates
    
    let current = 0;
    const increment = target / (speed / stepTime);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Formatting
      if (Number.isInteger(target)) {
        counter.textContent = Math.floor(current) + suffix;
      } else {
        counter.textContent = current.toFixed(1) + suffix;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    statsObserver.observe(counter);
  });
}

/* 5. FAQ ACCORDION LOGIC */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      const isActive = item.classList.contains('active');
      
      // Close other accordions in the same list
      const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('active');
          const siblingContent = sibling.querySelector('.accordion-content');
          if (siblingContent) siblingContent.style.maxHeight = null;
        }
      });
      
      // Toggle current accordion
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        content.style.maxHeight = null;
      }
    });
  });
}

/* 6. MODALS FOR DETAIL PAGES */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-open]');
  const modalCloses = document.querySelectorAll('[data-modal-close], .modal-overlay');
  
  // Open modal
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // If there's custom template data to populate, do it here
        const title = trigger.getAttribute('data-modal-title');
        const desc = trigger.getAttribute('data-modal-desc');
        const image = trigger.getAttribute('data-modal-img');
        
        if (title && modal.querySelector('.modal-title')) {
          modal.querySelector('.modal-title').textContent = title;
        }
        if (desc && modal.querySelector('.modal-description')) {
          modal.querySelector('.modal-description').innerHTML = desc;
        }
        if (image && modal.querySelector('.modal-img')) {
          modal.querySelector('.modal-img').src = image;
        }
      }
    });
  });
  
  // Close modals
  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const activeModals = document.querySelectorAll('.modal.active');
      activeModals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    });
  });
  
  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal.active');
      activeModals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });
}

/* 7. BACK TO TOP BUTTON */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* 8. FORMS VALIDATION & WHATSAPP DIRECT SUBMISSION */
function initForms() {
  const forms = document.querySelectorAll('.interactive-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation check
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
          
          // Remove invalid class on input
          input.addEventListener('input', function removeInvalid() {
            input.classList.remove('is-invalid');
            input.removeEventListener('input', removeInvalid);
          });
        }
      });
      
      if (!isValid) return;

      // Extract form field values dynamically
      const nameInput = form.querySelector('#name, #c_name, #ct_name');
      const companyInput = form.querySelector('#company, #c_company, #ct_company');
      const emailInput = form.querySelector('#email, #c_email, #ct_email');
      const phoneInput = form.querySelector('#phone, #c_phone, #ct_phone');
      const subjectInput = form.querySelector('#subject, #c_subject, #ct_subject');
      const messageInput = form.querySelector('#message, #c_message, #ct_message');

      const name = nameInput ? nameInput.value.trim() : '-';
      const company = companyInput ? companyInput.value.trim() : '-';
      const email = emailInput ? emailInput.value.trim() : '-';
      const phone = phoneInput ? phoneInput.value.trim() : '-';
      const subject = subjectInput && subjectInput.options[subjectInput.selectedIndex] ? subjectInput.options[subjectInput.selectedIndex].text : '';
      const message = messageInput ? messageInput.value.trim() : '-';
      
      // Change submit button to loading state
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Mengarahkan ke WhatsApp...';
      
      // Build WhatsApp message text
      let waText = `Halo Bumigas,%0A%0ASaya ingin mengajukan konsultasi / penawaran gas CNG:%0A%0A👤 *Nama:* ${encodeURIComponent(name)}%0A🏢 *Perusahaan/Pabrik:* ${encodeURIComponent(company)}%0A📧 *Email:* ${encodeURIComponent(email)}`;
      if (phone && phone !== '-') waText += `%0A📱 *No. HP/WA:* ${encodeURIComponent(phone)}`;
      if (subject) waText += `%0A📌 *Topik:* ${encodeURIComponent(subject)}`;
      waText += `%0A💬 *Detail Kebutuhan:*%0A${encodeURIComponent(message)}`;
      const waUrl = `https://wa.me/628563571913?text=${waText}`;

      setTimeout(() => {
        // Direct to WhatsApp
        window.open(waUrl, '_blank');

        // Show success layout on screen
        const successDiv = document.createElement('div');
        successDiv.className = 'glass-card reveal reveal-scale active';
        successDiv.style.padding = '2rem';
        successDiv.style.textAlign = 'center';
        successDiv.style.marginTop = '1rem';
        successDiv.style.borderColor = 'var(--color-success)';
        
        successDiv.innerHTML = `
          <div style="font-size: 3rem; color: var(--color-success); margin-bottom: 1rem;">✓</div>
          <h3 style="color: var(--color-secondary); margin-bottom: 0.5rem;">Formulir Siap Terkirim!</h3>
          <p style="margin-bottom: 0;">Data Anda telah terformat dan diarahkan langsung ke WhatsApp konsultan energi Bumigas (<strong>+62 856 3571913</strong>).</p>
        `;
        
        form.innerHTML = '';
        form.appendChild(successDiv);
      }, 800);
    });
  });
}

/* 9. PORTFOLIO / PROJECT FILTERING */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  
  if (filterTabs.length === 0 || projectCards.length === 0) return;
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Set active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filter = tab.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          // Retrigger entrance anim
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}
