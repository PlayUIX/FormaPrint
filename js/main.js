/* ============================================================
   FormaPrint BR — main.js
   Landing page: navbar scroll, menu mobile, animações de entrada
   ============================================================ */

//  NAVBAR SCROLL 
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

//  MENU MOBILE 
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Alterna ícone hamburger → X
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Fechar menu ao clicar em link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // Fechar ao pressionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
    }
  });
}

//  ANIMAÇÃO DE ENTRADA AO SCROLLAR 
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado para elementos em grid
      const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar animação de entrada a cards e seções
document.querySelectorAll(
  '.beneficio-card, .step-card, .modelo-card, .preco-card, .extra-card, .vaga-item'
).forEach(el => {
  el.setAttribute('data-animate', '');
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

//  SMOOTH SCROLL PARA LINKS ÂNCORA 
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

//  FAQ ACCORDION 
function toggleFaq(btn) {
  const item    = btn.closest('.faq-item');
  const aberto  = item.classList.contains('aberto');

  // Fechar todos
  document.querySelectorAll('.faq-item.aberto').forEach(el => el.classList.remove('aberto'));

  // Abrir o clicado (se estava fechado)
  if (!aberto) item.classList.add('aberto');
}

//  PARALLAX LEVE NO HERO CARD 
const cvCard = document.getElementById('cvCard');
if (cvCard) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    cvCard.style.transform = `translateY(0) rotate(${-1 + x * 0.1}deg) perspective(800px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    cvCard.style.transform = '';
  });
}
