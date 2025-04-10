import mixpanel, { Config, Dict } from 'mixpanel-browser';

const MIXPANEL_TOKEN: string = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '';

declare global {
  interface Window {
    __mixpanel_loaded?: boolean;
  }
}

/**
 * Initialize Mixpanel only once on the client.
 */
export const initMixpanel = (config?: Partial<Config>): void => {
  if (
    typeof window !== 'undefined' &&
    MIXPANEL_TOKEN &&
    !window.__mixpanel_loaded
  ) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === 'development',
      ...config,
    });
    window.__mixpanel_loaded = true;
  }
};

/**
 * Track an event with optional properties.
 */
export const trackEvent = (eventName: string, properties?: Dict): void => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.track(eventName, properties);
  }
};

/**
 * Identify a user by unique ID.
 */
export const identifyUser = (userId: string): void => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.identify(userId);
  }
};

/**
 * Track user sign-up.
 */
export const aliasUser = (aliasId: string): void => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.alias(aliasId);
  }
};

/**
 * Set user profile properties.
 */
export const setUserProperties = (properties: Dict): void => {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.people.set(properties);
  }
};

/**
 * Opt-out of tracking.
 */
export const optOutTracking = (): void => {
  if (typeof window !== 'undefined') {
    mixpanel.opt_out_tracking();
  }
};

/**
 * Opt-in to tracking.
 */
export const optInTracking = (): void => {
  if (typeof window !== 'undefined') {
    mixpanel.opt_in_tracking();
  }
};
