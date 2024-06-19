import {useQuery} from '@tanstack/react-query';
import {serverApi} from "@/lib/serverApi";

// TODO need to fix
interface MakesResult {
    id: number;
    name: string;
    value: number;
}

export const fetchMakes = async (): Promise<MakesResult[]> => {
    const makes = await serverApi.get('/data/make');
    return makes.data;
};

export const fetchModels = async (makeid: number): Promise<MakesResult[]> => {
    const makes = await serverApi.get('/data/model', {
        params: {
            makeid
        }
    });
    return makes.data;
};

export const useGetMakes = () => useQuery({
    queryKey: ["makes"],
    queryFn: fetchMakes,
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
});

export const useGetModels = (makeid: number) => useQuery({
    queryKey: ["models"],
    enabled: !!makeid,
    queryFn: () => fetchModels(makeid),
    // staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
    // refetchOnReconnect: false,
});