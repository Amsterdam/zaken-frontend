// LINK: https://uibakery.io/regex-library/url
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/

export default <T extends string>(url: T | undefined): url is T => (
  url !== undefined && URL_REGEX.test(url)
)
