import {
  Tabs as TabsCn,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ReactNode, useMemo, JSX } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  title: string | ReactNode;
  value: string;
  content: ReactNode;
}

interface Props {
  options: Option[];
  defaultValue?: string;
  ariaLabel?: string;
}

export const Tabs = (props: Props) => {
  const { options, defaultValue, ariaLabel = 'Default Tabs Aria' } = props;
  const { triggers, contents } = useMemo(() => {
    const triggers: JSX.Element[] = [];
    const contents: JSX.Element[] = [];

    options.forEach((option) => {
      triggers.push(
        <TabsTrigger
          key={option.value}
          className={cn(
            'flex',
            'flex-1',
            'cursor-pointer',
            'select-none',
            'items-center',
            'justify-center',
            'py-3',
            'text-sm',
            'leading-none',
            'text-tertiary',
            'outline-none',
            'transition-all',
            'font-semibold',
            'border-b',
            'border-solid',
            'outline-0',
            'border-black',
            'hover:text-black',
            'data-[state=active]:shadow-none',
            'data-[state=active]:text-white',
            'data-[state=active]:bg-black',
            'data-[state=active]:relative',
            'data-[state=active]:font-bold',
          )}
          value={option.value}
        >
          {option.title}
        </TabsTrigger>,
      );

      contents.push(
        <TabsContent
          key={option.value}
          className="grow outline-none py-6"
          value={option.value}
        >
          {option.content}
        </TabsContent>,
      );
    });

    return { triggers, contents };
  }, [options]);

  return (
    <TabsCn
      className="flex flex-col"
      defaultValue={defaultValue || options[0]?.value}
    >
      <TabsList className="flex shrink-0 bg-transparent" aria-label={ariaLabel}>
        {triggers}
      </TabsList>
      {contents}
    </TabsCn>
  );
};
