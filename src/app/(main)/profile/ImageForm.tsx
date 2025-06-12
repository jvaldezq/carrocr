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

export const ImageForm = (props: ImagesFormsProps) => {
  const { mutateAsync, isPending } = usePostUserImage();
  const { values, form } = props;

  const [draggingOver, setDraggingOver] = useState<boolean>(false);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        mutateAsync({
          imageFile: file,
          fileName: 'profilePicture',
        }).then((res) => {
          form.change('profilePicture', res);
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
        fileName: 'profilePicture',
      }).then((res) => {
        form.change('profilePicture', res);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <Field
        name="profilePicture"
        component={FormInput as unknown as SupportedInputs}
        wrapperClassName="hidden"
        childrenClassName="hidden"
        className="hidden"
      />
      <label
        htmlFor="profile-file"
        onDragOver={(event) => handleDragOver(event)}
        onDragLeave={handleDragLeave}
        onDrop={(event) => handleDrop(event)}
        className="flex flex-col items-center justify-center w-[90px] h-[90px] border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
      >
        {values?.profilePicture && (
          <Image
            src={values?.profilePicture}
            height={90}
            width={90}
            alt={values?.firstName || ''}
            className="object-cover rounded-full w-[90px] h-[90px]"
          />
        )}
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-1 absolute w-full h-full rounded-full',
            draggingOver
              ? 'bg-white/[0.7] text-primary'
              : values.profilePicture
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
          id="profile-file"
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/avif, image/webp"
          onChange={(event) => handleImageUpload(event)}
        />
      </label>
    </div>
  );
};
