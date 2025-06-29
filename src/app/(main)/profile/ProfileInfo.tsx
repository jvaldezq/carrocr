'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { states_options } from '@/lib/definitions';
import { debounce } from 'lodash';
import {
  Field,
  Form,
  FormRenderProps,
  SupportedInputs,
} from 'react-final-form';
import { cn } from '@/lib/utils';
import { ImageForm } from '@/app/(main)/profile/ImageForm';
import { FormCommand } from '@/components/Forms/Select/FormCommand';
import { FormInput } from '@/components/Forms/Input/FormInput';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { toast } from '@/hooks/use-toast';
import { IdImageForm } from '@/app/(main)/profile/IdImageForm';
import { UserData, UserInfo } from '@/types/User';
import { usePutUser } from '@/app/(main)/profile/service/usePutUser';

// Set the locale to Spanish
dayjs.locale('es');

export const ProfileInfo = (props: UserData) => {
  const { mutateAsync } = usePutUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce((values: UserInfo) => {
      mutateAsync(values).then(() => {
        toast({
          duration: 2000,
          variant: 'default',
          title: 'Guardado',
          description: (
            <div>
              Su información se ha guardado
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            </div>
          ),
        });
      });
    }, 800),
    [],
  );

  return (
    <Form initialValues={props.userTemp} onSubmit={debouncedSubmit}>
      {(formProps) => (
        <ProfileInfoForm
          {...formProps}
          debouncedSubmit={debouncedSubmit}
          inReview={props.inReview}
          hasIdentityPicture={props.hasIdentityPicture}
        />
      )}
    </Form>
  );
};

type FormProps = FormRenderProps<UserInfo> & {
  debouncedSubmit: (values: UserInfo) => void;
  inReview?: boolean;
  hasIdentityPicture?: boolean;
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
        'px-4',
        'py-14',
        'grid',
        'md:grid-cols-2',
        'gap-8',
        'items-center',
        'mb-10',
        'relative',
      )}
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div className="flex flex-col xs:flex-row gap-4 justify-center items-center">
          <ImageForm {...props} />
          <div className="flex flex-col items-center md:items-start">
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
        <div className="grid md:grid-cols-2 gap-2 w-full">
          <Field
            name="firstName"
            component={FormInput as unknown as SupportedInputs}
            placeholder="Juan"
            label="Nombre"
          />
          <Field
            name="lastName"
            component={FormInput as unknown as SupportedInputs}
            placeholder="Perez"
            label="Apellido"
          />
          <Field
            name="phone"
            component={FormInput as unknown as SupportedInputs}
            placeholder="88995566"
            label="Teléfono"
            type="tel"
          />
          <Field
            name="state"
            component={FormCommand as unknown as SupportedInputs}
            options={states_options}
            label="Provincia"
          />
        </div>
      </div>

      {!props.hasIdentityPicture ? (
        <div className="flex flex-col gap-4 justify-start items-center">
          <h2 className="text-base font-bold text-tertiary tracking-widest uppercase">
            ¡Consigue el badge de verificado! (Paso Opcional)
          </h2>
          <p className="text-sm font-medium text-tertiary tracking-wide">
            ¿Quieres que tu perfil destaque y genere más confianza? Sube una
            foto sosteniendo tu documento de identificación para verificar tu
            cuenta por completo. Es rápido, fácil y te otorga nuestro exclusivo
            badge de verificado.
          </p>
          <p className="text-sm font-medium text-tertiary tracking-wide">
            <strong>Totalmente privado:</strong> Queremos que sepas que esta
            imagen es estrictamente confidencial y solo la usaremos para
            verificar tu identidad internamente. Lo único visible para los demás
            será si tu cuenta ha sido verificada o no.
          </p>
          <IdImageForm {...props} />
        </div>
      ) : null}

      {props.inReview && (
        <div className="absolute top-2 left-0 p-2 bg-yellow-400 rounded-r-lg">
          Tu perfil se encuentra en revisión.
        </div>
      )}
    </form>
  );
};
