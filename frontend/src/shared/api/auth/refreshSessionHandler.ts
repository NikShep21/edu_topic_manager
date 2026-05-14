type RefreshSessionHandler = () => Promise<unknown>;

let refreshSessionHandler: RefreshSessionHandler | null = null;

export const setRefreshSessionHandler = (handler: RefreshSessionHandler) => {
  refreshSessionHandler = handler;
};

export const getRefreshSessionHandler = () => {
  return refreshSessionHandler;
};
