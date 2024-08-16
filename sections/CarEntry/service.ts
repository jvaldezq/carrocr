import {useMutation, useQuery} from '@tanstack/react-query';
import {clientApi} from "@/lib/clientApi";
import {CreateCarInputs} from "@/sections/CarEntry/CreateCar";

interface MakesResult {
    id: number;
    name: string;
    value: number;
}

export const fetchMakes = async (): Promise<MakesResult[]> => {
    const makes = await clientApi.get('/makes');
    return makes.data;
};

export const fetchTypeBodies = async (): Promise<MakesResult[]> => {
    const response = await clientApi.get('/body');
    return response.data;
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

export const createListing = async (data: CreateCarInputs): Promise<MakesResult[]> => {
    const newListing = await clientApi.post('/listing/create/s1', data);
    return newListing.data;
};

export const useGetMakes = () => {
    const {data, isLoading} = useQuery({
        queryKey: ["makes"], queryFn: fetchMakes, staleTime: 1000 * 60 * 60 * 24, retry: 2,
    });
    return {
        data: data?.map((make) => ({
            value: make.name, label: make.name, id: make.value
        })), isLoading
    }
};

export const useGetTypeBodies = () => {
    const {data, isLoading} = useQuery({
        queryKey: ["typeBody"], queryFn: fetchTypeBodies, staleTime: 1000 * 60 * 60 * 24, retry: 2,
    });
    return {
        data: data?.map((make) => ({
            value: make.name, label: make.name, id: make.id
        })), isLoading
    }
};

export const useGetModels = (makeid: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ["models", makeid],
        enabled: !!makeid,
        queryFn: () => fetchModels(makeid),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 2,
        refetchOnReconnect: false,
    });
    return {
        data: data?.map((make) => ({
            value: make.name, label: make.name, id: make.value
        })), isLoading
    }
}

export const useGetTrims = (modelId: number) => {
    const {data, isLoading} = useQuery({
        queryKey: ["trims", modelId],
        enabled: !!modelId,
        queryFn: () => fetchTrims(modelId),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 2,
        refetchOnReconnect: false,
    });

    return {
        data: data?.map((make) => ({
            value: make.name, label: make.name, id: make.value
        })), isLoading
    }
}

export const useCreateMutation = () => {
    return useMutation({
        mutationFn: (data: CreateCarInputs) => {
            return createListing(data);
        },
        mutationKey: ['listing-create'],
    });
};