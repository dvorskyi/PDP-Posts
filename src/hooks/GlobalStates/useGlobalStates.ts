import { QueryKey, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/api/query/utils";

type UseGlobalState<T> = {
    value: T | undefined;
    setAction: (value: T) => void;
};

export const useRQGlobalStates = <T>(key: QueryKey, initialData?: T): UseGlobalState<T> => {
    const query = useQuery<T>({
        queryKey: key,
        queryFn: initialData ? () => initialData : undefined,
        initialData
    });

    const setValue = (value?: T) => queryClient.setQueryData(key, value);

    return {
        value: query.data,
        setAction: setValue
    };
};
