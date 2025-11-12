import type { FetchPolicy } from '@apollo/client';

type ServiceFunction<TResult, TVariables = unknown> = (
  // eslint-disable-next-line no-unused-vars
  _args?: TVariables,
  // eslint-disable-next-line no-unused-vars
  _fetchPolicy?: FetchPolicy
) => Promise<TResult>;

type MutationAdapter<TResult, TVariables = unknown> = {
  data: Ref<TResult | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  // eslint-disable-next-line no-unused-vars
  mutate: (args?: TVariables) => Promise<TResult | null>;
};

type QueryAdapter<TResult, TVariables> = {
  data: Ref<TResult | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  // eslint-disable-next-line no-unused-vars
  refetch: (args?: TVariables) => Promise<TResult | null>;
};

type QueryOptions<TVariables> = {
  variables?: TVariables | undefined;
};

export function createQueryAdapter<TResult, TVariables>(
  serviceFn: ServiceFunction<TResult, TVariables>,
  options: QueryOptions<TVariables> = {}
): QueryAdapter<TResult, TVariables> {
  const data: Ref<TResult | null> = ref(null);
  const loading = ref(false);
  const error: Ref<Error | null> = ref(null);

  const fetchData = async (
    args?: TVariables,
    fetchPolicy?: FetchPolicy
  ): Promise<TResult | null> => {
    loading.value = true;
    error.value = null;
    try {
      const result = await serviceFn(args, fetchPolicy);
      data.value = result;

      return result;
    } catch (err) {
      error.value = err as Error;
      data.value = null;

      return null;
    } finally {
      loading.value = false;
    }
  };

  const refetch = (vars?: TVariables) => {
    const currentVars = vars ?? unref(options.variables);
    return fetchData(currentVars, 'network-only');
  };

  const initialVariables = unref(options.variables) ?? undefined;
  fetchData(initialVariables);

  if (options.variables) {
    watch(
      () => unref(options.variables),
      newVArs => {
        fetchData(newVArs);
      },
      {
        deep: true,
      }
    );
  }

  return { data, loading, error, refetch };
}

export function createMutationAdapter<TResult, TVariables>(
  serviceFn: ServiceFunction<TResult, TVariables>
): MutationAdapter<TResult, TVariables> {
  const data: Ref<TResult | null> = ref(null);
  const loading = ref(false);
  const error: Ref<Error | null> = ref(null);

  const mutate = async (args?: TVariables): Promise<TResult | null> => {
    loading.value = true;
    error.value = null;
    data.value = null;
    try {
      const result = await serviceFn(args);
      data.value = result;

      return result;
    } catch (err) {
      error.value = err as Error;
      data.value = null;

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { mutate, data, loading, error };
}
