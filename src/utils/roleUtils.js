export function hasRole(usuario, roleName) {
  if (!usuario) return false;
  return usuario.role?.name === roleName;
}