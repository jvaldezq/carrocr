import {useQuery} from '@tanstack/react-query';
import {clientApi} from "@/lib/clientApi";

// TODO need to fix
interface MakesResult {
    id: number;
    name: string;
    value: number;
}

export const fetchMakes = async (): Promise<MakesResult[]> => {
    const makes = await clientApi.get('/make');
    return makes.data;
};

export const fetchModels = async (makeid: number): Promise<MakesResult[]> => {
    const makes = await clientApi.get('/model', {
        params: {
            makeid
        }
    });
    return makes.data;
};

export const fetchTrims = async (modelId: number): Promise<MakesResult[]> => {
    const trim = await clientApi.get('/trim', {
        params: {
            modelId
        }
    });
    return trim.data;
};

export const useGetMakes = () => useQuery({
    queryKey: ["makes"],
    queryFn: fetchMakes,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
});

export const useGetModels = (makeid: number) => useQuery({
    queryKey: ["models", makeid],
    enabled: !!makeid,
    queryFn: () => fetchModels(makeid),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
});


export const useGetTrims = (modelId: number) => useQuery({
    queryKey: ["trims", modelId],
    enabled: !!modelId,
    queryFn: () => fetchTrims(modelId),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    refetchOnReconnect: false,
});