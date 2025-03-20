'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { states_options, UserProfile } from '@/lib/definitions';
import { debounce } from 'lodash';
import {
  Field,
  Form,
  FormRenderProps,
  SupportedInputs,
} from 'react-final-form';
import { useUpdateProfileInfoMutation } from '@/app/profile/service/putProfileInfo';
import { cn } from '@/lib/utils';
import { ImageForm } from '@/app/profile/ImageForm';
import { FormSelect } from '@/components/Forms/Select/FormSelect';
import { FormInput } from '@/components/Forms/Input/FormInput';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { toast } from '@/hooks/use-toast';

// Set the locale to Spanish
dayjs.locale('es');

type Props = UserProfile;

export const ProfileInfo = (props: Props) => {
  const { mutateAsync, isPending } = useUpdateProfileInfoMutation();

  useEffect(() => {
    if (isPending) {
      toast({
        duration: 1500,
        variant: 'default',
        title: 'Guardando',
        description: (
          <div>
            Estamos guardando tu información
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          </div>
        ),
      });
    }
  }, [isPending]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce((values: UserProfile) => {
      mutateAsync(values).then(() => {});
    }, 500),
    [],
  );

  return (
    <Form
      initialValues={props}
      onSubmit={debouncedSubmit}
      subscription={{ values: true, dirty: true }}
    >
      {(formProps) => (
        <ProfileInfoForm
          {...formProps}
          debouncedSubmit={debouncedSubmit}
          isPending={isPending}
        />
      )}
    </Form>
  );
};

type FormProps = FormRenderProps<UserProfile> & {
  debouncedSubmit: (values: UserProfile) => void;
  isPending: boolean;
};

export const ProfileInfoForm = (props: FormProps) => {
  const { handleSubmit, debouncedSubmit, values, dirty } = props;
  const { firstName = '', lastName = '', email, createdDT = dayjs() } = values;

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (dirty) {
      debouncedSubmit(values);
    }
  }, [values, debouncedSubmit, dirty]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'bg-white',
        'rounded-lg',
        'shadow-md',
        'p-4',
        'grid',
        'md:grid-cols-2',
        'gap-2',
        'items-center',
        'mb-10',
      )}
    >
      <div className="flex flex-col xs:flex-row gap-4 justify-start items-center">
        <ImageForm {...props} />
        <div>
          <h3 className="text-lg font-medium text-tertiary">
            {`${firstName} ${lastName}`}
          </h3>
          <h4 className="text-sm font-medium text-tertiary">{email}</h4>
          <p className="text-sm text-tertiary/60">
            Miembro desde{': '}
            <span className="capitalize font-semibold">
              {dayjs(createdDT).format('MMMM YYYY')}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Field
          name="phone"
          component={FormInput as unknown as SupportedInputs}
          placeholder="8899-5566"
          label="Teléfono"
          required
        />
        <Field
          name="state"
          component={FormSelect as unknown as SupportedInputs}
          options={states_options}
          label="Provincia"
          required
        />
      </div>
    </form>
  );
};
