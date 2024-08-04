import {useQuery} from 'react-query';

interface Options<Data> {
  onSuccess?: (data: Data) => Promise<unknown> | void;
  onError?: () => Promise<unknown> | void;
  quietly?: boolean;
  enabled?: boolean;
}

export const useQueryService = <Data>(
  key: string,
  deps: any[],
  service: () => Promise<Data>,
  options?: Options<Data>,
) => {
  return useQuery<Data>([key, ...deps], service, {
    retry: false,
    onSuccess: data => options?.onSuccess?.(data),
    onError: () => () => options?.onError?.(),
    enabled: options?.enabled || true,
    cacheTime: 5000,
  });
};
