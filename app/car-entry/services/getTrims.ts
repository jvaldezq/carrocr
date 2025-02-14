import {useQuery} from '@tanstack/react-query';
import {clientApi} from "@/lib/clientApi";

interface ResultType {
    label: string;
    value: string | number;
}

export const fetchTrims = async (modelId?: number | string): Promise<ResultType[]> => {
    const res = await clientApi.get('/trim', {
        params: {
            modelID: modelId
        }
    });
    return res.data;
};

export const useGetTrims = (modelId?: number | string) => {
    return useQuery({
        queryKey: ["trims", modelId],
        enabled: !!modelId,
        queryFn: () => fetchTrims(modelId),
        staleTime: 1000 * 60 * 60 * 24,
        retry: 2,
        refetchOnReconnect: false,
        select: (data: ResultType[]) => {
            return [{
                label: 'Modelos',
                options: data,
            }];
        },
    });
}