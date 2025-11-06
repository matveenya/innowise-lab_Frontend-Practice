import type {
  TypedDocumentNode,
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  InternalRefetchQueriesInclude,
  OperationVariables,
} from '@apollo/client';

export type MutationOpts<TResult, TVariables extends OperationVariables> = {
  context?: DefaultContext;
  refetchQueries?: InternalRefetchQueriesInclude;
  update?: MutationUpdaterFunction<TResult, TVariables, ApolloCache>;
};

function getApolloClient() {
  const { $apollo } = useNuxtApp();

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

  return $apollo;
}

export async function apolloQuery<
  TResult,
  TVariables extends OperationVariables = Record<string, never>,
>(query: TypedDocumentNode<TResult, TVariables>, variables?: TVariables): Promise<TResult> {
  const apollo = getApolloClient();

  const { data } = await apollo.query<TResult, TVariables>({ query, variables });
  return data as TResult;
}

export async function apolloMutation<
  TResult,
  TVariables extends OperationVariables = Record<string, never>,
>(
  mutation: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: MutationOpts<TResult, TVariables>
): Promise<TResult> {
  const apollo = getApolloClient();

  const { data } = await apollo.mutate<TResult, TVariables>({
    mutation,
    variables,
    ...options,
  });
  return data as TResult;
}
