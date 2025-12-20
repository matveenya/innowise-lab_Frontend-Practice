type RefetchFunction = () => Promise<unknown>;

export const useUserMenuRefetch = () => {
  const refetchCallbacks = useState<RefetchFunction[]>('user-menu-refetch-callbacks', () => []);

  const registerRefetch = (refetchFn: RefetchFunction) => {
    refetchCallbacks.value.push(refetchFn);

    return () => {
      const index = refetchCallbacks.value.indexOf(refetchFn);
      if (index > -1) {
        refetchCallbacks.value.splice(index, 1);
      }
    };
  };

  const triggerRefetch = async () => {
    await Promise.all(refetchCallbacks.value.map(fn => fn()));
  };

  return {
    registerRefetch,
    triggerRefetch,
  };
};
