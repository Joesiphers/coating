
import useSWR from "swr";


export function useGetProjectsSWR (url: string) {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, isLoading, error } = useSWR(url, fetcher);
    return { data, isLoading, error };
  }

  
