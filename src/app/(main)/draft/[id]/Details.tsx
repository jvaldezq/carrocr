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
import { DetailsForms } from '@/app/(main)/draft/[id]/DetailsForms';
import { debounce } from 'lodash';
import { useUpdateDraftByIdMutation } from '@/app/(main)/draft/[id]/service/putDraftById';
import { ImagesForm } from '@/app/(main)/draft/[id]/ImagesForm';
import { useRemoveDraftByIdMutation } from '@/app/(main)/draft/[id]/service/removeDraftById';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface Props {
  car: FormCarType;
}

export default function Details(props: Props) {
  const { car } = props;
  const { mutateAsync, isPending } = useUpdateDraftByIdMutation();

  console.log('car', car);

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
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: removeMutate } = useRemoveDraftByIdMutation();
  const { mutateAsync: completeMutate } = useUpdateDraftByIdMutation();
  const completion = 60;
  const { handleSubmit } = rest;

  const isFirstRender = useRef(true);

  const handleDelete = useCallback(() => {
    toast({
      variant: 'default',
      title: 'Eliminando',
      description: (
        <div>
          Estamos eliminando el anuncio
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
        </div>
      ),
    });
    removeMutate(rest?.values?.id || 0).then(() => {
      router.push('/profile');
    });
  }, [removeMutate, rest?.values?.id, router, toast]);

  const handleComplete = useCallback(() => {
    toast({
      variant: 'default',
      title: 'Completando',
      description: <div>Estamos completando el anuncio</div>,
    });
    completeMutate({
      ...rest?.values,
      approvalStageID: APPROVAL_STAGE.ENDED,
    }).then(() => {
      router.push('/profile');
    });
  }, [completeMutate, rest?.values, router, toast]);

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
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : isReady ? (
            <CheckCircle2 className="h-5 w-5 text-success animate-fade-right animate-once animate-duration-500 animate-delay-0 animate-ease-in-out" />
          ) : (
            <AlertCircle className="h-5 w-5 text-warning animate-fade-right animate-once animate-duration-500 animate-delay-0 animate-ease-in-out" />
          )}
          {completion && !isPending && (
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
