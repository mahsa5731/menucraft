export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Permission {
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  MANAGE_RESTAURANT = 'MANAGE_RESTAURANT',
  MANAGE_MENUS = 'MANAGE_MENUS',
  MANAGE_ACCOUNT = 'MANAGE_ACCOUNT',
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  VIEW_ALL_USERS = 'VIEW_ALL_USERS',
}

export const RolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_RESTAURANT,
    Permission.MANAGE_MENUS,
    Permission.MANAGE_ACCOUNT,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ALL_USERS,
  ],
  [Role.USER]: [
    Permission.VIEW_DASHBOARD,
    Permission.MANAGE_RESTAURANT,
    Permission.MANAGE_MENUS,
    Permission.MANAGE_ACCOUNT,
  ],
};

export function hasPermission(userRole: Role | undefined | null, permission: Permission): boolean {
  if (!userRole) return false;
  return RolePermissions[userRole]?.includes(permission) ?? false;
}
