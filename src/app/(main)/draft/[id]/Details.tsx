'use client';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Trash,
} from 'lucide-react';
import { Tabs } from '@/components/Tabs';
import { APPROVAL_STAGE } from '@/lib/definitions';
import { UserListing } from '@/types/User';
import { Button } from '@/components/ui/button';
import { cn, tw } from '@/lib/utils';
import { Form, FormRenderProps } from 'react-final-form';
import { DetailsForms } from '@/app/(main)/draft/[id]/DetailsForms';
import { debounce } from 'lodash';
import { useUpdateDraftByIdMutation } from '@/app/(main)/draft/[id]/service/putDraftById';
import { ImagesForm } from '@/app/(main)/draft/[id]/ImagesForm';
import { useRemoveDraftByIdMutation } from '@/app/(main)/draft/[id]/service/removeDraftById';
import { useRouter } from 'next/navigation';
import { useSetToReview } from './service/putSetToReview';
import { Tooltip } from '@/components/Tooltip';

interface Props {
  car?: UserListing;
}

export default function Details(props: Props) {
  const { car } = props;
  const { mutateAsync, isPending } = useUpdateDraftByIdMutation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce((values: UserListing) => {
      mutateAsync(values).then(() => { });
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

type FormProps = FormRenderProps<UserListing> & {
  debouncedSubmit: (values: UserListing) => void;
  isPending: boolean;
};

const DraftForm = (props: FormProps) => {
  const { debouncedSubmit, isPending, ...rest } = props;
  const router = useRouter();
  const { mutateAsync: removeMutate } = useRemoveDraftByIdMutation();
  const { mutateAsync: completeMutate } = useSetToReview();
  const { handleSubmit } = rest;

  const completion = useMemo(() => {
    let completion = 0
    if (rest?.values?.state) {
      completion += 5.8823529412
    }
    if (rest?.values?.condition) {
      completion += 5.8823529412
    }
    if (rest?.values?.currency) {
      completion += 5.8823529412
    }
    if (rest?.values?.driveType) {
      completion += 5.8823529412
    }
    if (rest?.values?.fuelType) {
      completion += 5.8823529412
    }
    if (rest?.values?.inspectionYear) {
      completion += 5.8823529412
    }
    if (rest?.values?.mileage) {
      completion += 5.8823529412
    }
    if (rest?.values?.mileageType) {
      completion += 5.8823529412
    }
    if (rest?.values?.price) {
      completion += 5.8823529412
    }
    if (rest?.values?.price) {
      completion += 5.8823529412
    }
    if (rest?.values?.transGearCount) {
      completion += 5.8823529412
    }
    if (rest?.values?.transType) {
      completion += 5.8823529412
    }
    if (rest?.values?.images?.imgBodyFL) {
      completion += 5.8823529412
    }
    if (rest?.values?.images?.imgBodyFR) {
      completion += 5.8823529412
    }
    if (rest?.values?.images?.imgBodyRL) {
      completion += 5.8823529412
    }
    if (rest?.values?.images?.imgBodyRR) {
      completion += 5.8823529412
    }
    if (rest?.values?.images?.imgInteriorCluster) {
      completion += 5.8823529412
    }
    return completion;
  }, [rest]);

  const isFirstRender = useRef(true);

  const handleDelete = useCallback(() => {
    removeMutate(rest?.values?.id || 0).then(() => {
      router.push('/profile');
    });
  }, [removeMutate, rest?.values?.id, router]);

  const handleComplete = useCallback(() => {
    completeMutate(rest?.values?.id || '').then(() => {
      router.push('/profile');
    });
  }, [completeMutate, rest?.values, router]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (rest.dirty) {
      debouncedSubmit(rest.values);
    }
  }, [rest.dirty, debouncedSubmit, rest.values]);

  const handleSendToReview = useCallback(() => {
    completeMutate(rest?.values?.id || '').then(() => {
      router.push('/profile');
    });
  }, [completeMutate, rest?.values, router]);

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
      <SubmitButton completion={completion} handleSendToReview={handleSendToReview} isPending={isPending} handleDelete={handleDelete} />
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
    </form>
  );
};

const SubmitButton = ({
  completion,
  isPending,
  handleSendToReview,
  handleDelete,
}: {
  completion: number;
  isPending: boolean;
  handleSendToReview: () => void;
  handleDelete: () => void;
}) => {
  const isReady = completion > 99;
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
        <Tooltip
          tooltipContent={
            "Eliminar anuncio"
          }
        >
          <a
            onClick={handleDelete}
            className="rounded-lg p-2 border border-solid border-red-700/40 flex items-center"
          >
            <Trash className="w-5 h-5 text-red-700" />
          </a>
        </Tooltip>
        <Tooltip
          tooltipContent={
            "Marcar como vendido"
          }
        >
          <a
            onClick={handleDelete}
            className="rounded-lg p-2 border border-solid border-black/40 text-black flex items-center"
          >
            Vendido
          </a>
        </Tooltip>
        <Button
          type="button"
          onClick={handleSendToReview}
          variant={isReady ? 'default' : 'outline'}
          disabled={!isReady}
          className={
            tw('rounded-lg',
              'p-2',
              'border',
              'border-solid',
              'border-black/40',
              'flex',
              'items-center',
              'gap-1',
              'w-fit',
              'bg-white',
              'hover:bg-white'
            )
          }
        >
          {isReady && (
            <span className="font-medium text-black">
              Enviar a revisión
            </span>
          )}
          <div className="items-center gap-0.5 flex justify-center">
            {completion && (
              <span className={
                tw('font-bold',
                  'text-xs',
                  'text-black',
                  completion > 75 ? completion > 99 ? 'text-green-700' : 'text-orange-700' : 'text-black'
                )
              }
              >
                {completion.toFixed(0)}%
              </span>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
};
