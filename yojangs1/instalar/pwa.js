// ==========================================================================
// AgroGuía - Controlador PWA e Instalación en Pantalla
// ==========================================================================

// Variable para almacenar el evento de instalación
let deferredPrompt = null;

// Crear el botón flotante de instalación estilizado con el diseño de AgroGuía
const installButton = document.createElement('button');
installButton.id = 'pwa-install-button';
installButton.innerHTML = '📲 <span>Instalar AgroGuía</span>';
Object.assign(installButton.style, {
  position: 'fixed',
  bottom: '75px',
  right: '20px',
  padding: '12px 22px',
  background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
  color: '#ffffff',
  border: '2px solid #52b788',
  borderRadius: '50px',
  fontSize: '15px',
  fontWeight: '700',
  fontFamily: "'Outfit', sans-serif",
  cursor: 'pointer',
  display: 'none',
  zIndex: '9999',
  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.45)',
  transition: 'all 0.3s ease',
  alignItems: 'center',
  gap: '8px'
});

installButton.onmouseover = () => {
  installButton.style.transform = 'translateY(-3px) scale(1.04)';
  installButton.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.6)';
};
installButton.onmouseout = () => {
  installButton.style.transform = 'none';
  installButton.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.45)';
};

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(installButton);
});

// Captura del evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[AgroGuía PWA] Evento de instalación recibido');
  e.preventDefault();
  deferredPrompt = e;

  // Mostrar el botón de instalación
  installButton.style.display = 'inline-flex';

  // Si existe un botón de instalación en el header, activarlo
  const headerInstallBtn = document.getElementById('headerInstallBtn');
  if (headerInstallBtn) {
    headerInstallBtn.style.display = 'inline-flex';
  }
});

// Función para disparar la instalación
async function triggerPwaInstall() {
  if (!deferredPrompt) {
    alert('Para instalar la aplicación:\n\n• En Chrome/Edge: Haz clic en el icono de instalación ⊕ en la barra de direcciones.\n• En móvil: Toca en el menú (⋮) y selecciona "Instalar aplicación" o "Agregar a pantalla principal".');
    return;
  }

  installButton.disabled = true;
  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;
  console.log(`[AgroGuía PWA] Respuesta del usuario: ${outcome}`);

  if (outcome === 'accepted') {
    installButton.innerHTML = '✅ <span>¡Instalando AgroGuía!</span>';
    setTimeout(() => {
      installButton.style.display = 'none';
    }, 2500);
  }

  deferredPrompt = null;
  installButton.disabled = false;
}

installButton.addEventListener('click', triggerPwaInstall);

// Conectar con cualquier botón que tenga la clase .trigger-pwa-install
document.addEventListener('click', (e) => {
  if (e.target.closest('.trigger-pwa-install') || e.target.id === 'headerInstallBtn') {
    triggerPwaInstall();
  }
});

// Escuchar cuando la app ya fue instalada
window.addEventListener('appinstalled', () => {
  console.log('[AgroGuía PWA] Aplicación instalada con éxito');
  installButton.style.display = 'none';
  const headerInstallBtn = document.getElementById('headerInstallBtn');
  if (headerInstallBtn) {
    headerInstallBtn.style.display = 'none';
  }
});

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Determinar la ruta relativa correcta al service worker
    const swPath = window.location.pathname.includes('/instalar/') 
      ? 'sw.js' 
      : 'instalar/sw.js';

    navigator.serviceWorker.register(swPath)
      .then(reg => {
        console.log('[AgroGuía PWA] Service Worker registrado con éxito. Alcance:', reg.scope);
      })
      .catch(err => {
        console.warn('[AgroGuía PWA] Service Worker no se pudo registrar en modo archivo local (requiere HTTP/HTTPS en producción):', err);
      });
  });
}

// Detección de iOS (Safari en iPhone/iPad)
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && !navigator.standalone) {
  const iosBanner = document.createElement('div');
  iosBanner.id = 'pwa-ios-banner';
  iosBanner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 70px;
      left: 12px;
      right: 12px;
      padding: 12px 16px;
      background: #1b4332;
      color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 9998;
      border: 1px solid #52b788;
    ">
      <span>📲 <strong>Instalar AgroGuía:</strong> Toca <span style="font-size: 16px;">⎋ Compartir</span> y luego <strong>"Añadir a pantalla de inicio"</strong>.</span>
      <button onclick="document.getElementById('pwa-ios-banner').remove()" style="background:none; border:none; color:#fff; font-size:16px; margin-left:8px; cursor:pointer;">✕</button>
    </div>
  `;
  window.addEventListener('load', () => {
    document.body.appendChild(iosBanner);
  });
}