export const mapUserToOption = (user: Components.Schemas.User) => {
  const name =
    [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email;
  if (!name) return null;
  return { id: user.id, name };
};
