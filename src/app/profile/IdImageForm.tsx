'use client';
import React, { useCallback, useState } from 'react';
import { CloudUpload, Upload } from 'lucide-react';
import { Field, FormRenderProps, SupportedInputs } from 'react-final-form';
import { UserProfile } from '@/lib/definitions';
import Image from 'next/image';
import UploadFile from '@/assets/upload.gif';
import { cn } from '@/lib/utils';
import { usePostProfileImage } from '@/app/profile/service/postProfileImage';
import { FormInput } from '@/components/Forms/Input/FormInput';

type ImagesFormsProps = FormRenderProps<UserProfile>;

export const IdImageForm = (props: ImagesFormsProps) => {
  const { mutateAsync, isPending } = usePostProfileImage();
  const { values, form } = props;

  const [draggingOver, setDraggingOver] = useState<boolean>(false);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        mutateAsync({
          imageFile: file,
        }).then((res) => {
          form.change('profileIdImage', res);
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
      }).then((res) => {
        form.change('profileIdImage', res);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <Field
        name="profileIdImage"
        component={FormInput as unknown as SupportedInputs}
        wrapperClassName="hidden"
        childrenClassName="hidden"
        className="hidden"
      />
      {isPending ? (
        <div className="flex flex-col justify-center items-center gap-2 border-2 border-gray-300 border-dashed rounded-lg min-w-[260px] w-full sm:max-w-[400px] h-[180px]">
          <Image
            src={UploadFile}
            alt="Uploader"
            height={180}
            width={400}
            className="object-cover rounded-lg min-w-[260px] w-full sm:max-w-[400px] h-[180px]"
          />
        </div>
      ) : (
        <label
          htmlFor="profile-file"
          onDragOver={(event) => handleDragOver(event)}
          onDragLeave={handleDragLeave}
          onDrop={(event) => handleDrop(event)}
          className="flex flex-col items-center justify-center rounded-lg min-w-[260px] w-full sm:max-w-[400px] h-[180px] border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
        >
          {values.profileIdImage && (
            <Image
              src={values.profileIdImage}
              height={180}
              width={400}
              alt={values.firstName}
              className="object-cover rounded-full min-w-[260px] w-full sm:max-w-[400px] h-[180px]"
            />
          )}
          <div
            className={cn(
              'flex flex-col items-center justify-center gap-1 absolute w-full h-full rounded-full',
              draggingOver
                ? 'bg-white/[0.7] text-primary'
                : values.profileIdImage
                  ? 'hover:bg-white/[0.9] text-transparent hover:text-tertiary'
                  : 'text-tertiary',
            )}
          >
            {draggingOver ? (
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
      )}
    </div>
  );
};
