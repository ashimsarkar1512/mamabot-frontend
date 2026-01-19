// Role priority system - admin has highest priority, then moderator, then user
export const ROLE_PRIORITY = ["admin", "moderator", "user"] as const;

export type RoleType = (typeof ROLE_PRIORITY)[number];

/**
 * Gets the primary role based on priority
 * @param roles - Array of user roles
 * @returns The highest priority role or 'user' as default
 */
export function getPrimaryRole(roles: string[]): RoleType {
  // Find the first role in the priority list that exists in the user's roles
  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) {
      return role;
    }
  }
  // Default to 'user' if no known roles found
  return "user";
}

/**
 * Gets the redirect path based on primary role
 * @param roles - Array of user roles
 * @returns The appropriate dashboard path
 */
export function getRedirectPath(roles: string[]): string {
  const primaryRole = getPrimaryRole(roles);

  switch (primaryRole) {
    case "admin":
      return "/admin-dashboard";
    case "moderator":
      return "/moderator-dashboard"; // This will need to be created
    default:
      return "/user-dashboard";
  }
}
