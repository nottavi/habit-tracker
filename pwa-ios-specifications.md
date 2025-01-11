# Spécifications Techniques PWA & iOS

## 1. Configuration du Manifest PWA

### Manifest de Base (manifest.webmanifest)
```json
{
  "name": "Habit Tracker",
  "short_name": "Habits",
  "description": "Suivi quotidien des habitudes",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Configuration iOS Spécifique (index.html)
```html
<head>
  <!-- Configuration iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Habits">
  
  <!-- Icons iOS -->
  <link rel="apple-touch-icon" href="apple-icon-180.png">
  
  <!-- Splashscreens -->
  <link rel="apple-touch-startup-image" 
        href="splash_640x1136.png" 
        media="(device-width: 320px) and (device-height: 568px)">
  <link rel="apple-touch-startup-image" 
        href="splash_750x1334.png" 
        media="(device-width: 375px) and (device-height: 667px)">
  <link rel="apple-touch-startup-image" 
        href="splash_1284x2778.png" 
        media="(device-width: 428px) and (device-height: 926px)">
  <!-- Autres tailles pour iPad -->
</head>
```

## 2. Stratégies de Cache

### Configuration Workbox (vite.config.ts)
```typescript
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    SvelteKitPWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        runtimeCaching: [
          {
            // Cache des données Supabase
            urlPattern: ({ url }) => url.href.includes('supabase'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24, // 24 heures
              },
              cacheableResponse: {
                statuses: [0, 200],
              }
            }
          },
          {
            // Cache des assets statiques
            urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 jours
              }
            }
          },
          {
            // Cache des fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 an
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ]
});
```

### Gestion Mode Hors-ligne (offline-handler.ts)
```typescript
import { registerSW } from 'virtual:pwa-register';

// Fonction pour gérer les mises à jour du service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // Notifier l'utilisateur qu'une mise à jour est disponible
  },
  onOfflineReady() {
    // Notifier l'utilisateur que l'app est prête pour le mode hors-ligne
  },
  immediate: true
});

// Gestion de la synchronisation des données
export async function syncData() {
  if (!navigator.onLine) {
    // Stocker les actions en attente dans IndexedDB
    await storeOfflineAction(action);
  } else {
    // Synchroniser les actions en attente
    await syncOfflineActions();
  }
}
```

## 3. Adaptations pour Appareils Apple

### Safe Areas et Layout
```typescript
// Constantes pour les safe areas
const SAFE_AREAS = {
  TOP: 'env(safe-area-inset-top, 0px)',
  RIGHT: 'env(safe-area-inset-right, 0px)',
  BOTTOM: 'env(safe-area-inset-bottom, 0px)',
  LEFT: 'env(safe-area-inset-left, 0px)',
};

// CSS pour gérer les safe areas
const globalStyles = `
  :root {
    --sat: ${SAFE_AREAS.TOP};
    --sar: ${SAFE_AREAS.RIGHT};
    --sab: ${SAFE_AREAS.BOTTOM};
    --sal: ${SAFE_AREAS.LEFT};
  }

  .app-container {
    padding: var(--sat) var(--sar) var(--sab) var(--sal);
  }
`;
```

### Dimensions Spécifiques des Appareils
```typescript
// Types d'appareils supportés
type AppleDevice = {
  model: string;
  width: number;
  height: number;
  scale: number;
};

const SUPPORTED_DEVICES: AppleDevice[] = [
  { model: 'iPhone 13/14', width: 390, height: 844, scale: 3 },
  { model: 'iPhone 13/14 Pro', width: 393, height: 852, scale: 3 },
  { model: 'iPhone 13/14 Pro Max', width: 428, height: 926, scale: 3 },
  { model: 'iPad Air', width: 820, height: 1180, scale: 2 },
  // Autres modèles...
];

// Configuration des styles spécifiques par appareil
const deviceStyles = SUPPORTED_DEVICES.map(device => `
  @media only screen 
    and (device-width: ${device.width}px) 
    and (device-height: ${device.height}px) 
    and (-webkit-device-pixel-ratio: ${device.scale}) {
    .app-container {
      max-width: ${device.width}px;
    }
    .navigation-bar {
      height: ${device.model.includes('iPhone') ? '44px' : '50px'};
    }
    .tab-bar {
      height: ${device.model.includes('iPhone') ? '83px' : '65px'};
    }
  }
`).join('\n');
```

### Adaptations Gestuelles iOS
```typescript
const iOS_OVERSCROLL = `
  html {
    overflow: hidden;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
`;

// Gestion du "pull to refresh"
const disablePullToRefresh = () => {
  document.body.style.overscrollBehavior = 'none';
};

// Gestion des gestes de navigation
const handleSwipeGesture = (event: TouchEvent) => {
  // Détecter le geste de retour iOS
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    if (touch.pageX < 30) {
      // Gérer le geste de retour
    }
  }
};
```

## Utilisation

Pour implémenter ces configurations :

1. Installer les dépendances requises :
```bash
npm install @vite-pwa/sveltekit workbox-window @capacitor/ios @capacitor/core
```

2. Copier les configurations pertinentes dans vos fichiers de projet

3. Adapter les chemins et valeurs selon votre structure de projet

4. Tester sur différents appareils iOS et sous Safari macOS