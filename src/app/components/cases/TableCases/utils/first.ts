export default <T>(items: T[] | undefined) => (items !== undefined ? items[0] : undefined);
