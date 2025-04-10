'use client';

import { ReactNode, useEffect } from 'react';
import { initMixpanel, trackEvent } from '@/lib/mixpanel';

interface Props {
  children?: ReactNode;
}

export const MixPanelWrapper = (props: Props) => {
  const { children } = props;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_IS_LOCAL !== 'true') {
      initMixpanel();
      trackEvent('Init');
    }
  }, []);

  return children;
};
