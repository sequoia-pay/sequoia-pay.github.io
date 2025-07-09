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

  // ================================================
  // CONSENT BANNER FUNCTIONALITY
  // ================================================
  
  /**
   * Cookie Consent Banner Configuration
   * Customize these settings as needed
   */
  const ConsentConfig = {
    // Storage key for consent preferences
    storageKey: 'sequoia_consent_preferences',
    
    // Default consent state
    defaultConsent: {
      necessary: true,    // Always true, cannot be disabled
      analytics: false,
      advertising: false,
      functional: false
    },
    
    // GTM consent mode mapping
    gtmConsentMap: {
      analytics: ['analytics_storage'],
      advertising: ['ad_storage', 'ad_user_data', 'ad_personalization'],
      functional: ['functionality_storage', 'personalization_storage']
    },
    
    // Banner display delay (in milliseconds)
    showDelay: 1000,
    
    // Banner auto-hide after consent (in milliseconds)
    hideDelay: 500
  };

  /**
   * Cookie Consent Manager Class
   * Handles all consent banner functionality
   */
  class ConsentManager {
    constructor() {
      this.banner = document.getElementById('consent-banner');
      this.preferences = this.loadPreferences();
      this.isInitialized = false;
      
      this.init();
    }

    /**
     * Initialize the consent manager
     */
    init() {
      if (this.isInitialized) return;
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Initialize GTM consent mode with default values
      this.initializeGTMConsent();
      
      // Show banner if no preferences are saved
      if (!this.hasStoredPreferences()) {
        this.showBanner();
      } else {
        // Apply stored preferences to GTM
        this.applyConsentToGTM(this.preferences);
      }
      
      this.isInitialized = true;
    }

    /**
     * Set up all event listeners for the banner
     */
    setupEventListeners() {
      // Accept all button
      document.getElementById('consent-accept-all').addEventListener('click', () => {
        this.acceptAll();
      });

      // Reject all button
      document.getElementById('consent-reject-all').addEventListener('click', () => {
        this.rejectAll();
      });

      // Save selection button
      document.getElementById('consent-save-selection').addEventListener('click', () => {
        this.saveSelection();
      });

      // Settings button (show banner again)
      document.getElementById('consent-settings').addEventListener('click', (e) => {
        e.preventDefault();
        this.showBanner();
      });

      // Checkbox change handlers
      Object.keys(ConsentConfig.defaultConsent).forEach(category => {
        if (category === 'necessary') return; // Skip necessary as it's always enabled
        
        const checkbox = document.getElementById(`consent-${category}`);
        if (checkbox) {
          checkbox.addEventListener('change', (e) => {
            this.updateCheckboxState(category, e.target.checked);
          });
        }
      });
    }

    /**
     * Initialize GTM consent mode with default denied state
     */
    initializeGTMConsent() {
      if (typeof gtag === 'function') {
        // Set default consent to denied for all categories
        gtag('consent', 'default', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'functionality_storage': 'denied',
          'personalization_storage': 'denied'
        });
        
        console.log('🔒 GTM Consent Mode initialized with default denied state');
      }
    }

    /**
     * Load consent preferences from localStorage
     */
    loadPreferences() {
      try {
        const stored = localStorage.getItem(ConsentConfig.storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...ConsentConfig.defaultConsent, ...parsed };
        }
      } catch (error) {
        console.error('Error loading consent preferences:', error);
      }
      
      return { ...ConsentConfig.defaultConsent };
    }

    /**
     * Save consent preferences to localStorage
     */
    savePreferences(preferences) {
      try {
        localStorage.setItem(ConsentConfig.storageKey, JSON.stringify(preferences));
        console.log('💾 Consent preferences saved:', preferences);
      } catch (error) {
        console.error('Error saving consent preferences:', error);
      }
    }

    /**
     * Check if user has stored preferences
     */
    hasStoredPreferences() {
      return localStorage.getItem(ConsentConfig.storageKey) !== null;
    }

    /**
     * Show the consent banner with animation
     */
    showBanner() {
      // Update checkboxes to reflect current preferences
      this.updateBannerState();
      
      // Show banner
      this.banner.style.display = 'block';
      
      // Add animation class after small delay
      setTimeout(() => {
        this.banner.classList.add('show', 'animate-in');
      }, 50);
      
      console.log('👀 Consent banner shown');
    }

    /**
     * Hide the consent banner with animation
     */
    hideBanner() {
      this.banner.classList.remove('show');
      
      setTimeout(() => {
        this.banner.style.display = 'none';
        this.banner.classList.remove('animate-in');
      }, ConsentConfig.hideDelay);
      
      console.log('👋 Consent banner hidden');
    }

    /**
     * Update banner checkboxes to reflect current preferences
     */
    updateBannerState() {
      Object.keys(this.preferences).forEach(category => {
        const checkbox = document.getElementById(`consent-${category}`);
        if (checkbox) {
          checkbox.checked = this.preferences[category];
        }
      });
    }

    /**
     * Update checkbox state and preferences
     */
    updateCheckboxState(category, checked) {
      this.preferences[category] = checked;
    }

    /**
     * Accept all consent categories
     */
    acceptAll() {
      // Set all categories to true
      Object.keys(ConsentConfig.defaultConsent).forEach(category => {
        this.preferences[category] = true;
      });
      
      this.finalizeConsent('✅ All cookies accepted');
    }

    /**
     * Reject all optional consent categories
     */
    rejectAll() {
      // Set all optional categories to false, keep necessary as true
      Object.keys(ConsentConfig.defaultConsent).forEach(category => {
        this.preferences[category] = category === 'necessary';
      });
      
      this.finalizeConsent('❌ Optional cookies rejected');
    }

    /**
     * Save current selection
     */
    saveSelection() {
      // Get current checkbox states
      Object.keys(ConsentConfig.defaultConsent).forEach(category => {
        const checkbox = document.getElementById(`consent-${category}`);
        if (checkbox && category !== 'necessary') {
          this.preferences[category] = checkbox.checked;
        }
      });
      
      this.finalizeConsent('💾 Cookie preferences saved');
    }

    /**
     * Finalize consent process (save, apply to GTM, hide banner)
     */
    finalizeConsent(message) {
      // Save preferences
      this.savePreferences(this.preferences);
      
      // Apply to GTM
      this.applyConsentToGTM(this.preferences);
      
      // Hide banner
      this.hideBanner();
      
      // Log message
      console.log(message, this.preferences);
      
      // Optional: Show a brief confirmation
      this.showConfirmation(message);
    }

    /**
     * Apply consent preferences to Google Tag Manager
     */
    applyConsentToGTM(preferences) {
      if (typeof gtag !== 'function') {
        console.warn('⚠️ gtag function not available, consent mode not applied');
        return;
      }

      const consentUpdate = {};
      
      // Map preferences to GTM consent parameters
      Object.keys(ConsentConfig.gtmConsentMap).forEach(category => {
        const isGranted = preferences[category] === true;
        const consentValue = isGranted ? 'granted' : 'denied';
        
        ConsentConfig.gtmConsentMap[category].forEach(gtmParam => {
          consentUpdate[gtmParam] = consentValue;
        });
      });

      // Apply consent update to GTM
      gtag('consent', 'update', consentUpdate);
      
      console.log('🎯 GTM Consent updated:', consentUpdate);
    }

    /**
     * Show a brief confirmation message
     */
    showConfirmation(message) {
      // Create temporary notification
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
      `;
      
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after delay
      setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }

    /**
     * Get current consent preferences
     */
    getPreferences() {
      return { ...this.preferences };
    }

    /**
     * Update specific consent category
     */
    updateConsent(category, granted) {
      if (category === 'necessary') {
        console.warn('⚠️ Cannot modify necessary cookies consent');
        return;
      }
      
      this.preferences[category] = granted;
      this.savePreferences(this.preferences);
      this.applyConsentToGTM(this.preferences);
      
      console.log(`🔄 Consent updated for ${category}:`, granted);
    }

    /**
     * Reset all consent preferences
     */
    resetConsent() {
      localStorage.removeItem(ConsentConfig.storageKey);
      this.preferences = { ...ConsentConfig.defaultConsent };
      this.showBanner();
      
      console.log('🔄 Consent preferences reset');
    }
  }

  // Initialize consent manager
  const consentManager = new ConsentManager();
  
  // Make consent manager globally available for debugging/integration
  window.ConsentManager = consentManager;
  
  // Add keyboard shortcut for developers (Ctrl+Shift+C to show consent banner)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      consentManager.showBanner();
      console.log('🔧 Developer: Consent banner shown via keyboard shortcut');
    }
  });
  
  console.log('🍪 Consent Banner initialized successfully');
}); 