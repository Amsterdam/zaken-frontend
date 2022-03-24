export const capitalizeString = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const appendTimeToDate = (date: string) => {
  if (date === '') return '';
  return `${date}T12:00:00+0200`;
};

export const createNameAbbreviation = (user: Components.Schemas.User) => (
  user.first_name && user.last_name
    ? `${user?.first_name.charAt(0).toUpperCase()}${user?.last_name.charAt(0).toUpperCase()}`
    : 'Onbekend'
);
