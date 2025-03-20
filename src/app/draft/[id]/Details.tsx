'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';
import { Tabs } from '@/components/Tabs';
import { APPROVAL_STAGE, FormCarType } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Form, FormRenderProps } from 'react-final-form';
import { DetailsForms } from '@/app/draft/[id]/DetailsForms';
import { debounce } from 'lodash';
import { useGetDraftById } from '@/app/draft/[id]/service/putDraftById';
import EditSVG from '@/assets/edit.gif';
import Image from 'next/image';
import { ImagesForm } from '@/app/draft/[id]/ImagesForm';

interface Props {
  car: FormCarType;
}

export default function Details(props: Props) {
  const { car } = props;
  const { mutateAsync, isPending } = useGetDraftById();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce((values: FormCarType) => {
      mutateAsync(values).then(() => {});
    }, 500),
    [mutateAsync],
  );

  return (
    <Form
      initialValues={car}
      onSubmit={debouncedSubmit}
      subscription={{ values: true, dirty: true }}
    >
      {(formProps) => (
        <DraftForm
          {...formProps}
          debouncedSubmit={debouncedSubmit}
          isPending={isPending}
        />
      )}
    </Form>
  );
}

type FormProps = FormRenderProps<FormCarType> & {
  debouncedSubmit: (values: FormCarType) => void;
  isPending: boolean;
};

const DraftForm = (props: FormProps) => {
  const { debouncedSubmit, isPending, ...rest } = props;
  const completion = 60;
  const { handleSubmit } = rest;

  const isFirstRender = useRef(true);

  const handleDelete = useCallback(() => {
    console.log('delete', rest.values.id);
  }, [rest.values.id]);

  const handleComplete = useCallback(() => {
    console.log('complete', rest.values.id);
  }, [rest.values.id]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (rest.dirty) {
      debouncedSubmit(rest.values);
    }
  }, [rest.dirty, debouncedSubmit, rest.values]);

  const options = [
    {
      title: (
        <div className="flex gap-1 items-center">
          <FileText className="h-5 w-5" />
          Detalles
        </div>
      ),
      value: 'details',
      content: <DetailsForms />,
    },
    {
      title: (
        <div className="flex gap-1 items-center">
          <ImageIcon className="h-5 w-5" />
          Imagenes
        </div>
      ),
      value: 'images',
      content: <ImagesForm {...rest} />,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 pb-16 mb-12">
      <Tabs options={options} defaultValue="details" ariaLabel="draft-car" />
      <SubmitButton completion={completion} isPending={isPending} />
      {rest?.values?.approvalStageID === APPROVAL_STAGE.PUBLISHED && (
        <Button
          type="button"
          variant="default"
          onClick={handleComplete}
          className="cursor-pointer"
        >
          Marcar como vendido
        </Button>
      )}
      <Button
        type="button"
        variant="destructive"
        onClick={handleDelete}
        className="cursor-pointer"
      >
        Eliminar anuncio
      </Button>
    </form>
  );
};

const SubmitButton = ({
  completion,
  isPending,
}: {
  completion: number;
  isPending: boolean;
}) => {
  const isReady = completion === 100;
  return (
    <div
      className={cn(
        'fixed',
        'bottom-0',
        'left-0',
        'right-0',
        'bg-white',
        'border-t',
        'shadow-lg',
        'py-3',
        'px-2',
        'flex',
        'flex-col-reverse',
        'sm:flex-row',
        'gap-2',
        'justify-end',
        'items-center',
      )}
    >
      <div className="flex gap-2 w-full sm:w-fit">
        <div className="items-center gap-2 flex">
          {isPending ? (
            <Image
              src={EditSVG}
              alt="Loading"
              height={30}
              width={30}
              className="animate-fade-right animate-once animate-duration-500 animate-delay-0 animate-ease-in-out"
            />
          ) : isReady ? (
            <CheckCircle2 className="h-5 w-5 text-success animate-fade-right animate-once animate-duration-500 animate-delay-0 animate-ease-in-out" />
          ) : (
            <AlertCircle className="h-5 w-5 text-warning animate-fade-right animate-once animate-duration-500 animate-delay-0 animate-ease-in-out" />
          )}
          {completion && (
            <span className="font-medium text-tertiary animate-flip-up animate-once animate-duration-500 animate-delay-0 animate-ease-in-out">
              {completion}%
            </span>
          )}
        </div>
        <Button
          type="submit"
          variant={isReady ? 'default' : 'outline'}
          disabled={!isReady}
          className="w-full sm:w-fit"
        >
          Enviar a revisión
        </Button>
      </div>
    </div>
  );
};
