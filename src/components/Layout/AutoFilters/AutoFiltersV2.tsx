'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryStates, parseAsString } from 'nuqs';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetMakes } from '@/context/CarEntryContext/services/useGetMakes';

const FormSchema = z.object({
  make: z.string().optional(),
});
type FormValues = z.infer<typeof FormSchema>;

export function AutoFiltersForm() {
  const { data: makes } = useGetMakes();

  // 1. Manage "make" in query state with a short param key `m`
  const [{ make }, setFilters] = useQueryStates(
    { make: parseAsString.withDefault('') },
    { urlKeys: { make: 'm' }, history: 'push', throttleMs: 1000 },
  );

  // 2. Set up the form, initialized from the query state
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { make },
  });

  // 3. On submit (or on value change), sync with URL
  function onSubmit(data: FormValues) {
    setFilters({ make: data.make });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  setFilters({ make: val });
                }}
                value={field.value || make}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Marca" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {makes?.map((mk) => (
                    <SelectItem key={mk.value} value={`${mk.value}`}>
                      {mk.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
