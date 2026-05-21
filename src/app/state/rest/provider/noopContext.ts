const noop = () => {};

export const noopContext = {
  isRequestPendingInQueue: () => false,
  pushRequestInQueue: noop,
  getCacheItem: () => ({ valid: false, value: undefined, errors: [] }),
  setCacheItem: noop,
  updateCacheItem: noop,
  addErrorToCacheItem: noop,
  clearCache: noop,
};
