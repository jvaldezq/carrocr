'use client';

import {
  Tooltip as Tooltipcn,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface TooltipProps {
  children?: ReactNode;
  tooltipContent?: ReactNode;
}

export const Tooltip = (props: TooltipProps) => {
  const { children, tooltipContent } = props;
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltipcn>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltipcn>
    </TooltipProvider>
  );
};
