import {
  Activity,
  CircleDollarSign,
  ReceiptText,
  Settings,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const CarDialogDetailsSkeleton = () => {
  return (
    <div className="overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col p-4 border-b">
        <h2 className="text-2xl font-bold flex gap-2 items-end text-tertiary">
          <Skeleton className="h-4 w-1/3 bg-primary/[0.2] dark:bg-primary/[0.7]" />
          <span className="text-sm font-light">
            <Skeleton className="h-2 w-6 bg-primary/[0.2] dark:bg-primary/[0.7]" />
          </span>
        </h2>
        <div className="text-lg text-primary flex gap-2 mt-2 items-center">
          <Skeleton className="h-4 w-1/5 bg-primary/[0.2] dark:bg-primary/[0.7]" />
        </div>
      </div>

      <Skeleton className="h-[380px] md:h-[460px] w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />

      {/* Car Details */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-tertiary">
            Detalles del vehículo
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Condición</p>
                <div className="font-medium">
                  <Skeleton className="h-3 w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Kilometraje</p>
                <div className="font-medium">
                  <Skeleton className="h-3 w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Transmisión</p>
                <div className="font-medium">
                  <Skeleton className="h-3 w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Precio</p>
                <div className="font-medium">
                  <Skeleton className="h-3 w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-full w-full bg-primary/[0.2] dark:bg-primary/[0.7]" />
        </div>
      </div>
    </div>
  );
};
