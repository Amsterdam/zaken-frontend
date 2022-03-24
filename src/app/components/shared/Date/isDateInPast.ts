export default (dateToCheck: Date) => {
  const currentDate = new Date().getTime();
  const dateToCheckEndOfDay = dateToCheck.setHours(23, 59, 59);

  return (dateToCheckEndOfDay - currentDate) < 0;
};
