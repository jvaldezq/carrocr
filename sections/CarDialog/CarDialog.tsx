import {Dialog, DialogContent} from "@/components/ui/dialog";
import {useGetCar} from "./service";
import {CarDialogDetailsLoader} from "@/sections/CarDialog/CarDialogDetailsLoader";
import {CarDialogDetails} from "@/sections/CarDialog/CarDialogDetails";

interface CarDialogProps {
    isOpen: boolean;
    onClose: () => void;
    uuid: string | null;
}

export function CarDialog(props: CarDialogProps) {
    const {isOpen, onClose, uuid} = props;
    const {data, isLoading} = useGetCar(uuid);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="max-w-[95%] lg:max-w-[850px] h-fit max-h-[90%] overflow-scroll dark:bg-white color-primary rounded-2xl"
            >
                {isLoading && <CarDialogDetailsLoader/>}
                {data && <CarDialogDetails {...data} />}
            </DialogContent>
        </Dialog>
    );
}
