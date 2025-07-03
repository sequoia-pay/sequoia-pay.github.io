// Add smooth scroll behavior for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for any anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll animations for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for animation
  document.querySelectorAll('.benefit-card, .audience-card, .trc20-feature, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Add parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-section');
    if (parallax) {
      const speed = scrolled * 0.2;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });

  // Add typing effect to code snippets
  const codeElements = document.querySelectorAll('.code-line');
  codeElements.forEach((element, index) => {
    const text = element.textContent;
    element.textContent = '';
    
    setTimeout(() => {
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      typeWriter();
    }, index * 1000);
  });

  // Add hover effects for buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add gradient animation to hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    setInterval(() => {
      const gradientText = heroTitle.querySelector('.gradient-text');
      if (gradientText) {
        gradientText.style.backgroundImage = `linear-gradient(${Math.random() * 360}deg, #3b82f6, #8b5cf6)`;
      }
    }, 3000);
  }

  // Add loading animation
  const loadingAnimation = () => {
    const cards = document.querySelectorAll('.benefit-card, .audience-card, .trc20-feature, .testimonial-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  };

  // Initialize loading animation
  setTimeout(loadingAnimation, 500);

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    z-index: 9999;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    progressBar.style.width = scrollPercent * 100 + '%';
  });

  // Add easter egg - konami code
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      const confetti = () => {
        for (let i = 0; i < 50; i++) {
          const confettiPiece = document.createElement('div');
          confettiPiece.innerHTML = ['🎉', '🚀', '💰', '⚡'][Math.floor(Math.random() * 4)];
          confettiPiece.style.cssText = `
            position: fixed;
            font-size: 20px;
            pointer-events: none;
            z-index: 10000;
            left: ${Math.random() * 100}vw;
            top: -50px;
            animation: fall ${Math.random() * 3 + 2}s linear forwards;
          `;
          document.body.appendChild(confettiPiece);
          
          setTimeout(() => confettiPiece.remove(), 5000);
        }
      };
      
      // Add CSS animation for confetti
      if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      confetti();
      alert('🎉 Konami Code activated! Welcome to the crypto revolution!');
    }
  });
}); 