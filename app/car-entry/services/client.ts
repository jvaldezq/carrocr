import {useMutation, useQuery} from '@tanstack/react-query';
import {clientApi} from "@/lib/clientApi";
import {CreateCarFormProps} from "@/app/car-entry/forms/CreateCarForm";

interface MakesResult {
    id: number;
    name: string;
    value: number;
}

export const fetchMakes = async (): Promise<MakesResult[]> => {
    const makes = await clientApi.get('/makes');
    return makes.data;
};

export const fetchModels = async (makeid: number): Promise<MakesResult[]> => {
    const makes = await clientApi.get('/models', {
        params: {
            makeid
        }
    });
    return makes.data;
};

export const fetchTrims = async (modelId: number): Promise<MakesResult[]> => {
    const trim = await clientApi.get('/trims', {
        params: {
            modelID: modelId
        }
    });
    return trim.data;
};

export const createListing = async (data: CreateCarFormProps): Promise<MakesResult[]> => {
    const newListing = await clientApi.post('/listing/create/s1', data);
    return newListing.data;
};

export const useGetMakes = () => {
    return useQuery({
        queryKey: ["makes"], queryFn: fetchMakes, staleTime: 1000 * 60 * 60 * 24, retry: 2,
    });
};

export const useGetModels = (makeid: number) => {
    return useQuery({
        queryKey: ["models", makeid],
        enabled: !!makeid,
        queryFn: () => fetchModels(makeid),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 2,
        refetchOnReconnect: false,
    });
}

export const useGetTrims = (modelId: number) => {
    return useQuery({
        queryKey: ["trims", modelId],
        enabled: !!modelId,
        queryFn: () => fetchTrims(modelId),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 2,
        refetchOnReconnect: false,
    });
}

export const useCreateMutation = () => {
    return useMutation({
        mutationFn: (data: CreateCarFormProps) => {
            return createListing(data);
        }, mutationKey: ['listing-create'],
    });
};