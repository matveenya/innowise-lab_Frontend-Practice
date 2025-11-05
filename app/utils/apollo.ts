import type { TypedDocumentNode } from '@apollo/client';

function getApolloClient() {
  const { $apollo } = useNuxtApp();

  if (!$apollo) {
    throw new Error('Apollo Client is not initialized');
  }

  return $apollo;
}

export async function apolloQuery<TResult, TVariables = Record<string, never>>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  const apollo = getApolloClient();

  const { data } = await apollo.query<TResult, TVariables>({ query, variables });
  return data as TResult;
}

export async function apolloMutation<TResult, TVariables = Record<string, never>>(
  mutation: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  context?: Record<string, unknown>
): Promise<TResult> {
  const apollo = getApolloClient();

  const { data } = await apollo.mutate<TResult, TVariables>({
    mutation,
    variables,
    ...(context && { context }),
  });
  return data as TResult;
}
