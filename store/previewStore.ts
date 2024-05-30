import {atom} from 'nanostores';

interface PreviewInterface {
    id: number | null;
}

export const previewConfig = atom<PreviewInterface>({id: null});