export default (param: string | undefined): param is Components.Schemas.Address['bag_id'] => {
  const int = parseInt(param ?? '', 10);
  return Number.isNaN(int) === false && int > 0;
};
