import type { User } from "@/components/auth-provider"

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: "student" | "mentor" | "admin"): boolean {
  return user?.role === role
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  user: User | null,
  roles: ("student" | "mentor" | "admin")[]
): boolean {
  return user ? roles.includes(user.role) : false
}

/**
 * Check if user has all of the specified roles (useful for future multi-role support)
 */
export function hasAllRoles(
  user: User | null,
  roles: ("student" | "mentor" | "admin")[]
): boolean {
  if (!user) return false
  return roles.every((role) => user.role === role)
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: User | null): boolean {
  return !!user
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === "admin"
}

/**
 * Check if user is mentor
 */
export function isMentor(user: User | null): boolean {
  return user?.role === "mentor"
}

/**
 * Check if user is student
 */
export function isStudent(user: User | null): boolean {
  return user?.role === "student"
}

/**
 * Get user permissions based on role
 */
export function getUserPermissions(user: User | null): string[] {
  if (!user) return []

  const permissions: Record<string, string[]> = {
    student: [
      "view:dashboard",
      "view:skills",
      "view:missions",
      "view:teams",
      "view:career-simulator",
      "view:journal",
      "view:time-capsule",
      "view:resume-builder",
      "view:mentors",
      "edit:profile",
      "create:journal-entry",
      "join:teams",
    ],
    mentor: [
      "view:dashboard",
      "view:skills",
      "view:missions",
      "view:teams",
      "view:career-simulator",
      "view:journal",
      "view:time-capsule",
      "view:resume-builder",
      "view:mentors",
      "edit:profile",
      "create:journal-entry",
      "join:teams",
      "manage:mentees",
      "create:learning-spaces",
      "view:mentor-insights",
    ],
    admin: [
      "view:dashboard",
      "view:skills",
      "view:missions",
      "view:teams",
      "view:career-simulator",
      "view:journal",
      "view:time-capsule",
      "view:resume-builder",
      "view:mentors",
      "edit:profile",
      "create:journal-entry",
      "join:teams",
      "manage:mentees",
      "create:learning-spaces",
      "view:mentor-insights",
      "admin:all",
      "manage:users",
      "manage:content",
      "view:analytics",
    ],
  }

  return permissions[user.role] || []
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(user: User | null, permission: string): boolean {
  const permissions = getUserPermissions(user)
  return permissions.includes(permission) || permissions.includes("admin:all")
}
