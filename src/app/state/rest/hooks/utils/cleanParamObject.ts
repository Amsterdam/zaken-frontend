// Removes undefined, null, and empty string values from an object
// This is useful for cleaning up query parameters before making API requests
// This function is used to clean up query parameters before making API requests

export const cleanParamObject = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, v]) => v !== undefined && v !== null && v !== ""
    )
  )
