// LINK: https://stackoverflow.com/questions/7905929/how-to-test-valid-UUID-guid
const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default <T extends string>(UUID: T | undefined): UUID is T => UUID !== undefined && regex.test(UUID);
