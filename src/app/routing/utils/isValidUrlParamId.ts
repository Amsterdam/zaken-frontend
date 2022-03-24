export default <T>(param: T | undefined): param is T => param !== undefined;
