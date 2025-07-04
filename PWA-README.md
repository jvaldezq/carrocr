# CarroCR - PWA Setup

This document explains the Progressive Web App (PWA) features implemented in the CarroCR application and how to test them.

## Features Implemented

1. **Web App Manifest** - Provides metadata for the app when installed on a device
2. **Service Worker** - Enables offline functionality and asset caching
3. **Offline Page** - Shows a custom page when the user is offline
4. **App Icons** - Icons for different device displays
5. **Theming** - Consistent theming across devices

## Testing the PWA

### Development Mode

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open Chrome DevTools (F12)
3. Go to the "Application" tab
4. In the left sidebar, click on "Service Workers"
5. Check "Offline" to simulate offline mode
6. Refresh the page to see the offline experience

### Production Build

1. Create a production build:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Open Chrome and go to your app
4. Open Chrome DevTools (F12)
5. Go to the "Lighthouse" tab
6. Check the "Progressive Web App" option
7. Click "Generate report" to test PWA compliance

### Testing Installation

1. In Chrome, click the install button in the address bar (or the three dots menu > Install)
2. Confirm the installation
3. The app should now be installed and launch in its own window

## Cache Management

The service worker caches the following:
- HTML pages
- CSS and JavaScript bundles
- Static assets (images, fonts, etc.)
- API responses (optional, not implemented by default)

To clear the cache:
1. Open Chrome DevTools
2. Go to the "Application" tab
3. Click on "Clear storage" in the left sidebar
4. Check "Unregister service workers" and "Local and session storage"
5. Click "Clear site data"

## Adding Icons

Make sure to add the following icon files to the `public` folder:
- `icon-192x192.png` (192x192 pixels)
- `icon-512x512.png` (512x512 pixels)

These icons will be used for the home screen and app launcher.
