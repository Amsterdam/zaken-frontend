/*
 ** Function to retreive a parameter from the URL.
 ** Example: ?fname=johnny&lname=depp
*/

export default (param: string) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param) || undefined
}
