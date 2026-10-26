/* ============================================================
   js/pwa.js — Kutumhome Society
   3D Celestial Holographic Shiva Loader & Direct PWA App Engine
   ============================================================ */

// 1. Capture install prompt immediately at top level
window.__deferredPrompt = window.__deferredPrompt || null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.__deferredPrompt = e;
  console.log('[PWA] beforeinstallprompt captured!');
  const bar = document.getElementById('pwa-install-bar');
  if (bar && !window.navigator.standalone && !sessionStorage.getItem('pwa_dismissed')) {
    bar.classList.add('show');
  }
});

(function () {
  'use strict';

  // 2. Lord Shiva Trishul & Damru SVG Generator
  function getShivaTrishulSVG(size = 80) {
    return `
      <svg class="shiva-trishul-svg" viewBox="0 0 100 110" width="${size}" height="${size * 1.1}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="45%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
          <radialGradient id="trinetraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fef08a" />
            <stop offset="60%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#7f1d1d" />
          </radialGradient>
        </defs>

        <!-- Crescent Moon (Ardha Chandra) -->
        <path class="shiva-crescent-moon" d="M 58 14 A 12 12 0 0 1 68 28 A 12 12 0 0 0 60 16 Z" fill="#e0e7ff" />

        <!-- Trishul Center Spear -->
        <path d="M 50 10 L 46 25 L 48.5 25 L 48.5 78 L 51.5 78 L 51.5 25 L 54 25 Z" fill="url(#goldGrad)" />
        <polygon points="50,6 45,20 55,20" fill="#fef08a" />

        <!-- Left Curved Prong -->
        <path d="M 48.5 42 C 34 42 26 36 26 24 C 26 21 27 18 29 18 C 30 18 31 22 34 26 C 38 31 43 35 48.5 36 Z" fill="url(#goldGrad)" />
        <polygon points="27,15 24,22 30,22" fill="#fef08a" />

        <!-- Right Curved Prong -->
        <path d="M 51.5 42 C 66 42 74 36 74 24 C 74 21 73 18 71 18 C 70 18 69 22 66 26 C 62 31 57 35 51.5 36 Z" fill="url(#goldGrad)" />
        <polygon points="73,15 70,22 76,22" fill="#fef08a" />

        <!-- Tripundra (3 Holy Ash Lines) -->
        <line x1="43" y1="28" x2="57" y2="28" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9" />
        <line x1="44" y1="31" x2="56" y2="31" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9" />
        <line x1="45" y1="34" x2="55" y2="34" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9" />

        <!-- Third Eye / Trinetra -->
        <circle class="shiva-third-eye" cx="50" cy="31" r="2.2" fill="url(#trinetraGlow)" />

        <!-- Damru (Sacred Cosmic Drum) -->
        <g class="shiva-damru-node">
          <polygon points="38,46 62,46 50,54" fill="#ef4444" stroke="#991b1b" stroke-width="0.8" />
          <polygon points="38,62 62,62 50,54" fill="#ef4444" stroke="#991b1b" stroke-width="0.8" />
          <ellipse cx="50" cy="46" rx="12" ry="2" fill="#f59e0b" />
          <ellipse cx="50" cy="62" rx="12" ry="2" fill="#f59e0b" />
          <line x1="47" y1="54" x2="53" y2="54" stroke="#fde047" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="34" cy="53" r="2" fill="#fbbf24" />
          <line x1="50" y1="54" x2="35" y2="53" stroke="#fef08a" stroke-width="1" />
          <circle cx="66" cy="55" r="2" fill="#fbbf24" />
          <line x1="50" y1="54" x2="65" y2="55" stroke="#fef08a" stroke-width="1" />
        </g>
      </svg>
    `;
  }

  // 3. Cheerful rotating Gujarati captions for loader
  const captions = [
    '✨ શિવમ સોસાયટી પોર્ટલ લોડ થઈ રહ્યું છે...',
    '🔱 હર હર મહાદેવ · તમારો દિવસ શુભ રહે!',
    '🏡 સ્માર્ટ & સુરક્ષિત સોસાયટી મેનેજમેન્ટ'
  ];
  let captionIdx = 0;

  // 4. Inject 3D Holographic Shiva Loader
  function inject3DShivaLoader() {
    if (document.getElementById('shiva-page-loader')) return;

    const loader = document.createElement('div');
    loader.id = 'shiva-page-loader';
    loader.className = 'shiva-page-loader';
    loader.innerHTML = `
      <div class="shiva-cosmic-bg"></div>

      <!-- 3D Gyroscope Chamber -->
      <div class="shiva-hologram-chamber">
        <div class="shiva-gyro-ring shiva-gyro-1"></div>
        <div class="shiva-gyro-ring shiva-gyro-2"></div>
        <div class="shiva-gyro-ring shiva-gyro-3"></div>
        <div class="shiva-energy-core"></div>
        ${getShivaTrishulSVG(92)}
      </div>

      <!-- Mantra Badge & Progress -->
      <div class="shiva-caption-wrap">
        <div class="shiva-mantra-pill">
          <span style="font-size:18px;">🔱</span>
          <span class="shiva-mantra-pill-text">॥ ॐ नमः शिवाय ॥</span>
          <span style="font-size:18px;">🔱</span>
        </div>

        <div class="shiva-prog-track">
          <div class="shiva-prog-bar"></div>
        </div>

        <div class="shiva-loading-label" id="shiva-loading-caption">
          ${captions[0]}
        </div>
      </div>
    `;

    document.body.appendChild(loader);

    // Rotate captions
    const captionTimer = setInterval(() => {
      captionIdx = (captionIdx + 1) % captions.length;
      const el = document.getElementById('shiva-loading-caption');
      if (el) el.textContent = captions[captionIdx];
    }, 900);

    // Smooth dismissal when page ready
    const dismiss = () => {
      clearInterval(captionTimer);
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 550);
      }, 500);
    };

    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss);
      setTimeout(dismiss, 2800); // Fail-safe timeout
    }
  }

  // 5. In-App Browser Detector (WhatsApp / Instagram fix)
  function checkInAppBrowser() {
    const isWhatsApp = /WhatsApp|FBAN|FBAV|Instagram|Line|Twitter|MicroMessenger/i.test(navigator.userAgent);
    if (!isWhatsApp) return;

    if (document.getElementById('whatsapp-open-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'whatsapp-open-banner';
    banner.className = 'whatsapp-open-banner show';
    banner.innerHTML = `
      <div>⚠️ <strong>એપ ડાઉનલોડ કરવા માટે:</strong> Chrome અથવા Safari માં ખોલો.</div>
      <button type="button" class="whatsapp-open-btn" id="btn-open-chrome">🌐 Chrome માં ખોલો</button>
    `;

    document.body.insertBefore(banner, document.body.firstChild);

    document.getElementById('btn-open-chrome')?.addEventListener('click', () => {
      const currentUrl = window.location.href;
      // Android Chrome intent
      if (/Android/i.test(navigator.userAgent)) {
        window.location.href = `intent://${location.host}${location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
      } else {
        navigator.clipboard?.writeText(currentUrl);
        alert('લિંક કોપી થઈ ગઈ છે! કૃપા કરીને Safari બ્રાઉઝર ખોલીને પેસ્ટ કરો.');
      }
    });
  }

  // 6. Platform Detection (Accurate & Zero False Standalone)
  function checkStandalone() {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    );
  }
  const isStandalone = checkStandalone();

  const isIOS =
    (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;

  const isAndroid = /Android/i.test(navigator.userAgent);

  // 7. Inject Shiva PWA Install Modal
  function injectInstallModal() {
    if (document.getElementById('shiva-install-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'shiva-install-modal';
    modal.className = 'shiva-install-modal-overlay hidden';
    modal.innerHTML = `
      <div class="shiva-install-card">
        <div class="shiva-card-top-glow"></div>
        <div class="shiva-card-body">
          <div class="shiva-app-badge">
            <img src="icons/icon-192.png" alt="Kutumhome App Icon" onerror="this.src='icons/icon-96.png'"/>
            <div class="shiva-app-badge-title">
              <h4>Kutumhome App</h4>
              <p>⭐⭐⭐⭐⭐ Resident & Society Portal</p>
            </div>
          </div>

          <h3 class="shiva-install-title">📲 એપ ડાઉનલોડ & ઇન્સ્ટોલ</h3>
          <p class="shiva-install-desc" id="shiva-install-desc-text">
            તમારા ફોન પર Kutumhome ઇન્સ્ટોલ કરવા માટે નીચે આપેલા સ્ટેપ્સ અનુસરો.
          </p>

          <div id="shiva-modal-action-box" style="margin-bottom:16px;">
            <!-- Injected dynamically -->
          </div>

          <button type="button" class="btn btn-ghost btn-sm" id="shiva-modal-close-btn" style="color:rgba(255,255,255,0.6);margin-top:6px;">
            બંધ કરો (Close)
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
    document.getElementById('shiva-modal-close-btn')?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // 8. Trigger Install — Direct & Guaranteed (Never Blocks Re-install)
  function triggerInstall() {
    // A. Native Android / Chrome prompt ready? Trigger immediately!
    if (window.__deferredPrompt) {
      window.__deferredPrompt.prompt();
      window.__deferredPrompt.userChoice.then((res) => {
        if (res.outcome === 'accepted') {
          console.log('[PWA] User accepted installation!');
          hideInstallBanner();
          if (typeof showToast === 'function') {
            showToast('✅ એપ ઇન્સ્ટોલ થઈ ગઈ છે!', 'success');
          }
        }
        window.__deferredPrompt = null;
      });
      return;
    }

    // B. iPhone / iPad: Show floating arrow pointing down to Safari share button
    if (isIOS) {
      showIOSFloatingPointer();
      return;
    }

    // C. Android / Desktop without prompt yet (or after uninstall cooldown): Show 1-Click Guided Sheet
    const modal = document.getElementById('shiva-install-modal');
    const actionBox = document.getElementById('shiva-modal-action-box');
    if (modal && actionBox) {
      actionBox.innerHTML = `
        <div style="background:rgba(255,255,255,0.06);border-radius:14px;padding:16px;text-align:left;border:1px solid rgba(255,255,255,0.12);">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:14px;color:#fde047;font-weight:800;">
            <span style="font-size:20px;">📲</span>
            <span>Android પર ફરીથી ઇન્સ્ટોલ કરવા:</span>
          </div>
          <div style="font-size:13px;line-height:1.75;color:#e2e8f0;">
            1. Chrome બ્રાઉઝરમાં ઉપર જમણી બાજુ <strong>3 ટપકાં (⋮)</strong> દબાવો.<br/>
            2. <strong>"Install app"</strong> અથવા <strong>"Add to Home screen"</strong> પસંદ કરો.<br/>
            3. <strong>"Install"</strong> પર ક્લિક કરો — એપ તમારા હોમ સ્ક્રીન પર આવી જશે!
          </div>
        </div>
        <button type="button" class="btn btn-primary" id="btn-retry-pwa" style="width:100%;margin-top:14px;padding:12px;font-size:14.5px;justify-content:center;font-weight:800;">
          ⚡ ફરીથી પ્રયાસ કરો (Try Again)
        </button>
      `;

      document.getElementById('btn-retry-pwa')?.addEventListener('click', () => {
        sessionStorage.removeItem('pwa_dismissed');
        if (window.__deferredPrompt) {
          modal.classList.add('hidden');
          window.__deferredPrompt.prompt();
        } else {
          window.location.reload();
        }
      });

      modal.classList.remove('hidden');
    }
  }

  // 9. Floating iOS Pointer for Safari
  function showIOSFloatingPointer() {
    let pointer = document.getElementById('ios-floating-pointer');
    if (!pointer) {
      pointer = document.createElement('div');
      pointer.id = 'ios-floating-pointer';
      pointer.className = 'ios-floating-pointer';
      pointer.innerHTML = `
        <div style="font-size:13.5px;font-weight:700;margin-bottom:4px;">📲 iPhone પર Install કરો</div>
        <div style="font-size:12px;opacity:0.85;">નીચે <strong>Share (⎋)</strong> દબાવીને <strong>'Add to Home Screen'</strong> પસંદ કરો.</div>
        <span class="pointer-arrow">⬇️</span>
        <button type="button" style="background:none;border:none;color:#fde047;font-size:11px;cursor:pointer;margin-top:4px;" id="close-ios-pointer">સમજાઈ ગયું (Close)</button>
      `;
      document.body.appendChild(pointer);
      document.getElementById('close-ios-pointer')?.addEventListener('click', () => {
        pointer.classList.add('hidden');
      });
    }
    pointer.classList.remove('hidden');
  }

  // 10. Top Floating Install Bar
  function injectInstallBanner() {
    if (document.getElementById('pwa-install-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'pwa-install-bar';
    bar.className = 'pwa-install-bar';
    bar.innerHTML = `
      <div class="pwa-install-bar-text">
        <span style="font-size:20px;filter:drop-shadow(0 0 6px #fbbf24);">🔱</span>
        <span><strong>Kutumhome App</strong> મોબાઇલ પર Install કરો (Install on your device)</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button type="button" id="pwa-bar-install-btn" class="pwa-install-btn">
          ⬇️ Install App
        </button>
        <button type="button" id="pwa-bar-dismiss-btn" class="pwa-install-dismiss" title="Close">✕</button>
      </div>
    `;

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.insertBefore(bar, mainContent.firstChild);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    document.getElementById('pwa-bar-install-btn')?.addEventListener('click', triggerInstall);
    document.getElementById('pwa-bar-dismiss-btn')?.addEventListener('click', () => {
      bar.classList.remove('show');
      sessionStorage.setItem('pwa_dismissed', '1');
    });

    if (!isStandalone && !sessionStorage.getItem('pwa_dismissed')) {
      bar.classList.add('show');
    }
  }

  function hideInstallBanner() {
    const bar = document.getElementById('pwa-install-bar');
    if (bar) bar.classList.remove('show');
  }

  // 11. Mobile Bottom Navigation
  function injectBottomNav() {
    if (document.querySelector('.mobile-bottom-nav')) return;

    const seg = window.location.pathname.replace(/\/+$/, '').split('/').pop() || 'index';
    const currentPath = seg.replace(/\.html$/i, '').toLowerCase() || 'index';

    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.innerHTML = `
      <div class="mbn-items">
        <a href="index.html" class="mbn-item ${currentPath === 'index' ? 'active' : ''}">
          <span class="mbn-icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="members.html" class="mbn-item ${currentPath === 'members' ? 'active' : ''}">
          <span class="mbn-icon">👥</span>
          <span>Members</span>
        </a>
        <a href="maintenance.html" class="mbn-item ${currentPath === 'maintenance' ? 'active' : ''}">
          <span class="mbn-icon">🧾</span>
          <span>Bills</span>
        </a>
        <a href="payments.html" class="mbn-item ${currentPath === 'payments' ? 'active' : ''}">
          <span class="mbn-icon">💳</span>
          <span>Pay</span>
        </a>
        <a href="resident.html" class="mbn-item ${currentPath === 'resident' ? 'active' : ''}">
          <span class="mbn-icon">🏠</span>
          <span>Resident</span>
        </a>
      </div>
    `;

    document.body.appendChild(nav);
  }

  // 12. Upgrade inline Spinners
  function upgradeInlineSpinners() {
    document.querySelectorAll('.spinner-wrap').forEach((wrap) => {
      if (wrap.dataset.shivaUpgraded) return;
      wrap.dataset.shivaUpgraded = '1';
      wrap.innerHTML = `
        <div class="shiva-inline-loader">
          ${getShivaTrishulSVG(52)}
          <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;color:#fde047;">॥ ॐ नमः शिवाय ॥</div>
          <div style="font-size:11px;color:rgba(165,180,252,0.85);">માહિતી લોડ થઈ રહી છે...</div>
        </div>
      `;
    });
  }

  // 13. Upgrade Brand Icon
  function upgradeBrandIcon() {
    document.querySelectorAll('.sidebar-brand .brand-icon').forEach((icon) => {
      if (icon.dataset.shivaBrand) return;
      icon.dataset.shivaBrand = '1';
      icon.innerHTML = getShivaTrishulSVG(36);
    });
  }

  // 14. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .then((reg) => {
          console.log('[PWA] SW registered v8:', reg.scope);
          try { reg.update(); } catch(e) {}
        })
        .catch((err) => console.warn('[PWA] SW reg:', err));
    });
  }


  // 16. User-selectable UI appearance (independent style + light/dark mode)
  function initUiPreferences() {
    const styleOptions = [
      { id: 'material', label: 'Material', note: 'Clean surfaces, clear hierarchy' },
      { id: 'glass', label: 'Glassmorphism', note: 'Translucent layered surfaces' },
      { id: 'neumorphism', label: 'Neumorphism', note: 'Soft raised and inset surfaces' },
      { id: 'brutalism', label: 'Brutalism', note: 'Raw, editorial, high contrast' },
      { id: 'neo-brutalism', label: 'Neo-Brutalism', note: 'Bold borders and playful blocks' },
      { id: 'typography', label: 'Typography-centric', note: 'Type-led, spacious and minimal' }
    ];
    const storage = {
      style: 'kutumhome-ui-style',
      mode: 'kutumhome-color-mode'
    };
    const allowed = styleOptions.map((item) => item.id);
    const safeGet = (key, fallback) => {
      try { const value = localStorage.getItem(key); return value || fallback; }
      catch (error) { return fallback; }
    };
    const safeSet = (key, value) => {
      try { localStorage.setItem(key, value); } catch (error) {}
    };
    const apply = (style, mode) => {
      const nextStyle = allowed.includes(style) ? style : 'material';
      const nextMode = mode === 'dark' ? 'dark' : 'light';
      document.documentElement.dataset.uiStyle = nextStyle;
      document.documentElement.dataset.colorMode = nextMode;
      document.documentElement.style.colorScheme = nextMode;
      safeSet(storage.style, nextStyle);
      safeSet(storage.mode, nextMode);
      document.querySelectorAll('[data-ui-style-choice]').forEach((button) => {
        const selected = button.dataset.uiStyleChoice === nextStyle;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('is-selected', selected);
      });
      document.querySelectorAll('[data-ui-mode-choice]').forEach((button) => {
        const selected = button.dataset.uiModeChoice === nextMode;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('is-selected', selected);
      });
    };
    // Apply saved preferences before the panel is opened.
    const initialStyle = safeGet(storage.style, 'material');
    const initialMode = safeGet(storage.mode, 'light');
    document.documentElement.dataset.uiStyle = allowed.includes(initialStyle) ? initialStyle : 'material';
    document.documentElement.dataset.colorMode = initialMode === 'dark' ? 'dark' : 'light';
    document.documentElement.style.colorScheme = initialMode === 'dark' ? 'dark' : 'light';

    if (document.getElementById('kutumhome-appearance')) return;
    const root = document.createElement('div');
    root.id = 'kutumhome-appearance';
    root.innerHTML = `
      <button type="button" class="kh-appearance-trigger" aria-expanded="false" aria-controls="kh-appearance-panel" aria-label="Appearance settings" title="Customize appearance">
        <span aria-hidden="true">◐</span><span class="kh-appearance-trigger-label">Appearance</span>
      </button>
      <section id="kh-appearance-panel" class="kh-appearance-panel" aria-label="Appearance settings" hidden>
        <div class="kh-appearance-heading">
          <div><strong>Make it yours</strong><p>Choose a look for Kutumhome</p></div>
          <button type="button" class="kh-appearance-close" aria-label="Close appearance settings">×</button>
        </div>
        <div class="kh-appearance-mode-label">Colour mode</div>
        <div class="kh-appearance-mode-row" role="group" aria-label="Colour mode">
          <button type="button" data-ui-mode-choice="light">☀ Light</button>
          <button type="button" data-ui-mode-choice="dark">☾ Dark</button>
        </div>
        <div class="kh-appearance-mode-label kh-style-label">Interface style</div>
        <div class="kh-appearance-style-list" role="group" aria-label="Interface style">
          ${styleOptions.map((item) => `<button type="button" class="kh-style-choice" data-ui-style-choice="${item.id}">
            <span class="kh-style-swatch kh-swatch-${item.id}" aria-hidden="true"></span>
            <span class="kh-style-copy"><strong>${item.label}</strong><small>${item.note}</small></span>
            <span class="kh-style-check" aria-hidden="true">✓</span>
          </button>`).join('')}
        </div>
        <p class="kh-appearance-footnote">Saved on this device. This changes the visual theme, not your account or permissions.</p>
      </section>`;
    document.body.appendChild(root);
    const trigger = root.querySelector('.kh-appearance-trigger');
    const panel = root.querySelector('.kh-appearance-panel');
    const close = () => { panel.hidden = true; trigger.setAttribute('aria-expanded', 'false'); };
    trigger.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
      trigger.setAttribute('aria-expanded', String(!panel.hidden));
    });
    root.querySelector('.kh-appearance-close').addEventListener('click', close);
    root.querySelectorAll('[data-ui-style-choice]').forEach((button) => {
      button.addEventListener('click', () => apply(button.dataset.uiStyleChoice, document.documentElement.dataset.colorMode));
    });
    root.querySelectorAll('[data-ui-mode-choice]').forEach((button) => {
      button.addEventListener('click', () => apply(document.documentElement.dataset.uiStyle, button.dataset.uiModeChoice));
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
    apply(document.documentElement.dataset.uiStyle, document.documentElement.dataset.colorMode);
  }

  // 15. DOM Ready Bootstrap
  document.addEventListener('DOMContentLoaded', () => {
    // Failsafe: Guarantee all modals without explicit .show class start strictly hidden
    document.querySelectorAll('.map-modal-overlay:not(.show), .admin-modal-overlay:not(.show)').forEach((m) => {
      m.classList.add('hidden');
      m.style.setProperty('display', 'none', 'important');
    });

    initUiPreferences();
    inject3DShivaLoader();
    checkInAppBrowser();
    upgradeBrandIcon();
    upgradeInlineSpinners();

    if (!isStandalone) {
      injectInstallBanner();
      injectInstallModal();
    } else {
      document.body.classList.add('is-pwa-standalone');
    }

    injectBottomNav();

    // Bind all install buttons across the page
    document.querySelectorAll('.btn-install-app').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerInstall();
      });
    });
  });

  // Watch for dynamic DOM insertions
  const observer = new MutationObserver(() => upgradeInlineSpinners());
  observer.observe(document.body, { childList: true, subtree: true });

  window.triggerAppInstall = triggerInstall;
  window.getShivaTrishulSVG = getShivaTrishulSVG;
})();
