'use client';
import React, { useCallback, useState } from 'react';
import { CloudUpload, Upload } from 'lucide-react';
import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { FormInput } from '@/components/Forms/Input/FormInput';
import { UserInfo } from '@/types/User';
import { usePostUserImage } from '@/app/(main)/profile/service/usePostUserImage';

type ImagesFormsProps = FormRenderProps<UserInfo>;

export const IdImageForm = (props: ImagesFormsProps) => {
  const { mutateAsync, isPending } = usePostUserImage();
  const { values, form } = props;

  const [draggingOver, setDraggingOver] = useState<boolean>(false);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        mutateAsync({
          imageFile: file,
          fileName: 'identityPicture',
        }).then((res) => {
          form.change('identityPicture', res);
        });
      }
    },
    [form, mutateAsync],
  );

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDraggingOver(true);
  };

  const handleDragLeave = () => {
    setDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDraggingOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      mutateAsync({
        imageFile: file,
        fileName: 'identityPicture',
      }).then((res) => {
        form.change('identityPicture', res);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <Field
        name="identityPicture"
        component={FormInput as unknown as SupportedInputs}
        wrapperClassName="hidden"
        childrenClassName="hidden"
        className="hidden"
      />
      <label
        htmlFor="profile-id-file"
        onDragOver={(event) => handleDragOver(event)}
        onDragLeave={handleDragLeave}
        onDrop={(event) => handleDrop(event)}
        className="flex flex-col items-center justify-center rounded-lg min-w-[260px] w-full sm:max-w-[400px] h-[180px] border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
      >
        {values?.identityPicture && (
          <Image
            src={values?.identityPicture}
            height={180}
            width={400}
            alt={values?.firstName || ''}
            className="object-cover rounded-full min-w-[260px] w-full sm:max-w-[400px] h-[180px]"
          />
        )}
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-1 absolute w-full h-full rounded-full',
            draggingOver
              ? 'bg-white/[0.7] text-primary'
              : values.identityPicture
                ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                : 'text-tertiary',
          )}
        >
          {draggingOver || isPending ? (
            <CloudUpload className="h-5 w-5 animate-bounce animate-infinite animate-duration-500 animate-delay-0 animate-ease-linear" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </div>
        <input
          id="profile-id-file"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/avif, image/webp"
          onChange={(event) => handleImageUpload(event)}
        />
      </label>
    </div>
  );
};
