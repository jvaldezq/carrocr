import {useQuery} from '@tanstack/react-query';
import {clientApi} from "@/lib/clientApi";

enum MAKESENUM {
    OTHER = 'OTHER'
}

interface ResultType {
    label: string;
    value: string | number;
}

export const fetchMakes = async (): Promise<ResultType[]> => {
    const res = await clientApi.get('/make');
    return res.data;
};

export const useGetMakes = () => {
    return useQuery({
        queryKey: ["makes"], queryFn: fetchMakes, staleTime: 1000 * 60 * 60 * 24, retry: 2, select: (data: ResultType[]) => {
            return [{
                label: 'Marcas',
                options: data,
            }];
        },
    });
};