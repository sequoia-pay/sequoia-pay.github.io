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
   * Advanced Consent Mode V2 Configuration
   * Fully compliant with Google Tag Platform requirements
   */
  const ConsentConfig = {
    // Storage key for consent preferences (versioned for V2)
    storageKey: 'sequoia_consent_preferences_v2',
    
    // Consent Mode V2 specification
    version: 2,
    
    // Default consent state - all optional categories denied by default
    defaultConsent: {
      necessary: true,    // Required for site operation, always granted
      analytics: false,   // Google Analytics tracking
      advertising: false, // Advertising cookies and remarketing
      functional: false   // Enhanced functionality (non-essential)
    },
    
    // Complete GTM Consent Mode V2 mapping
    gtmConsentMap: {
      necessary: ['security_storage'], // Essential cookies always granted
      analytics: ['analytics_storage'], // GA4, measurement, reporting
      advertising: ['ad_storage', 'ad_user_data', 'ad_personalization'], // All advertising features
      functional: ['functionality_storage', 'personalization_storage'] // Enhanced UX features
    },
    
    // Banner timing configuration
    showDelay: 1000,      // Delay before showing banner (allows page to load)
    hideDelay: 400,       // Animation duration for hiding
    updateTimeout: 500,   // Max wait time for consent updates
    
    // Advanced Consent Mode features
    enableAdvancedMode: true,     // Use Advanced vs Basic Consent Mode
    enableDataRedaction: true,    // Enhanced privacy for advertising
    enableUrlPassthrough: false,  // Don't pass click IDs in denied state
    enableModelingData: true,     // Allow conversion modeling
    
    // Regional compliance
    requireConsentForEEA: true,   // Required for EEA traffic
    defaultRegion: 'EEA',         // Assume EEA requirements by default
    
    // Debug and development
    debugMode: false,             // Enable detailed console logging
    enableTestMode: false         // For testing environments
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
     * Initialize GTM Advanced Consent Mode V2 with proper timing
     */
    initializeGTMConsent() {
      if (typeof gtag !== 'function') {
        console.warn('⚠️ gtag function not available during initialization');
        return;
      }

      // Advanced Consent Mode V2 already initialized in HTML head
      // This is a verification step to ensure proper initialization
      
      if (ConsentConfig.debugMode) {
        console.log('🔒 Advanced Consent Mode V2 verification:', {
          timestamp: Date.now() - (window._consentModeInitTime || 0),
          enableAdvancedMode: ConsentConfig.enableAdvancedMode,
          version: ConsentConfig.version
        });
      }
      
      // Send initialization event to dataLayer for GTM triggers
      window.dataLayer.push({
        event: 'consent_mode_initialized',
        consent_mode_version: ConsentConfig.version,
        advanced_mode: ConsentConfig.enableAdvancedMode
      });
    }

    /**
     * Load consent preferences from localStorage with V2 migration
     */
    loadPreferences() {
      try {
        // Try to load V2 preferences first
        let stored = localStorage.getItem(ConsentConfig.storageKey);
        let preferences = null;
        
        if (stored) {
          const parsedData = JSON.parse(stored);
          
          // Check if it's V2 format with metadata
          if (parsedData.preferences && parsedData.metadata) {
            preferences = parsedData.preferences;
            
            if (ConsentConfig.debugMode) {
              console.log('📖 Loaded V2 consent preferences:', {
                preferences: parsedData.preferences,
                metadata: parsedData.metadata
              });
            }
          } else {
            // Legacy V2 format without metadata
            preferences = parsedData;
          }
        } else {
          // Check for V1 preferences and migrate
          const oldKey = 'sequoia_consent_preferences';
          const oldStored = localStorage.getItem(oldKey);
          
          if (oldStored) {
            const oldPreferences = JSON.parse(oldStored);
            console.log('🔄 Migrating consent preferences from V1 to V2');
            
            // Migrate and save in new format
            preferences = { ...ConsentConfig.defaultConsent, ...oldPreferences };
            this.savePreferences(preferences);
            
            // Remove old preferences
            localStorage.removeItem(oldKey);
          }
        }
        
        if (preferences) {
          // Ensure all required categories are present
          return { ...ConsentConfig.defaultConsent, ...preferences };
        }
      } catch (error) {
        console.error('Error loading consent preferences:', error);
      }
      
      return { ...ConsentConfig.defaultConsent };
    }

    /**
     * Save consent preferences to localStorage with V2 metadata
     */
    savePreferences(preferences) {
      try {
        const saveData = {
          preferences: preferences,
          metadata: {
            version: ConsentConfig.version,
            timestamp: Date.now(),
            userAgent: navigator.userAgent.substring(0, 100), // Truncated for privacy
            url: window.location.hostname
          }
        };
        
        localStorage.setItem(ConsentConfig.storageKey, JSON.stringify(saveData));
        
        if (ConsentConfig.debugMode) {
          console.log('💾 Consent preferences V2 saved:', saveData);
        } else {
          console.log('💾 Consent preferences saved successfully');
        }
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
     * Apply consent preferences to Google Tag Manager V2
     */
    applyConsentToGTM(preferences) {
      if (typeof gtag !== 'function') {
        console.warn('⚠️ gtag function not available, consent mode not applied');
        return;
      }

      const consentUpdate = {};
      const timestamp = Date.now();
      
      // Map preferences to GTM consent parameters
      Object.keys(ConsentConfig.gtmConsentMap).forEach(category => {
        const isGranted = preferences[category] === true;
        const consentValue = isGranted ? 'granted' : 'denied';
        
        ConsentConfig.gtmConsentMap[category].forEach(gtmParam => {
          consentUpdate[gtmParam] = consentValue;
        });
      });

      // Apply consent update to GTM with enhanced parameters
      gtag('consent', 'update', {
        ...consentUpdate,
        // Add compliance timestamp for audit purposes
        'update_timestamp': timestamp
      });
      
      // Send detailed consent state to dataLayer for GTM triggers
      window.dataLayer.push({
        event: 'consent_update',
        consent_timestamp: timestamp,
        consent_version: ConsentConfig.version,
        consent_preferences: { ...preferences },
        gtm_consent_state: { ...consentUpdate }
      });
      
      if (ConsentConfig.debugMode) {
        console.log('🎯 GTM Consent V2 updated:', {
          preferences,
          gtmUpdate: consentUpdate,
          timestamp
        });
      } else {
        console.log('🎯 GTM Consent updated successfully');
      }
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
  
  // Make consent manager and utilities globally available
  window.ConsentManager = consentManager;
  window.ConsentConfig = ConsentConfig;
  
  // Advanced debugging and testing utilities
  window.ConsentDebug = {
    // Show current consent state
    getState: () => consentManager.getPreferences(),
    
    // Test consent banner
    showBanner: () => consentManager.showBanner(),
    
    // Reset all consent data
    reset: () => consentManager.resetConsent(),
    
    // Simulate different consent scenarios
    testScenarios: {
      acceptAll: () => consentManager.acceptAll(),
      rejectAll: () => consentManager.rejectAll(),
      analyticsOnly: () => {
        consentManager.updateConsent('analytics', true);
        consentManager.updateConsent('advertising', false);
        consentManager.updateConsent('functional', false);
      }
    },
    
    // Check GTM consent mode status
    checkGTMStatus: () => {
      if (typeof gtag === 'function') {
        console.log('✅ gtag function available');
        console.log('🕒 Consent initialized at:', new Date(window._consentModeInitTime || 0).toISOString());
        return true;
      } else {
        console.warn('❌ gtag function not available');
        return false;
      }
    },
    
    // Validate consent mode implementation
    validateImplementation: () => {
      const issues = [];
      
      if (!window._consentModeInitTime) {
        issues.push('❌ Consent mode initialization timestamp missing');
      }
      
      if (typeof gtag !== 'function') {
        issues.push('❌ gtag function not available');
      }
      
      if (!window.dataLayer) {
        issues.push('❌ dataLayer not initialized');
      }
      
      const banner = document.getElementById('consent-banner');
      if (!banner) {
        issues.push('❌ Consent banner element not found');
      }
      
      if (issues.length === 0) {
        console.log('✅ All consent mode implementation checks passed');
        return true;
      } else {
        console.warn('⚠️ Consent mode implementation issues:', issues);
        return false;
      }
    }
  };
  
  // Developer keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+C to show consent banner
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      consentManager.showBanner();
      console.log('🔧 Developer: Consent banner shown via keyboard shortcut');
    }
    
    // Ctrl+Shift+D to toggle debug mode
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      ConsentConfig.debugMode = !ConsentConfig.debugMode;
      console.log(`🔧 Debug mode ${ConsentConfig.debugMode ? 'enabled' : 'disabled'}`);
    }
    
    // Ctrl+Shift+V to validate implementation
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
      e.preventDefault();
      window.ConsentDebug.validateImplementation();
    }
  });
  
  // Auto-validation in development
  if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
    setTimeout(() => {
      console.log('🔍 Running auto-validation for development environment...');
      window.ConsentDebug.validateImplementation();
    }, 2000);
  }
  
  console.log('🍪 Advanced Consent Mode V2 initialized successfully');
  console.log('🔧 Developer tools available via window.ConsentDebug');
}); 