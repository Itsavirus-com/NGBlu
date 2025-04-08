import { useUserProfile } from '@/services/swr/use-user-profile'

/**
 * Custom hook to check if the current user is a SuperAdmin.
 * It utilizes the useUserProfile hook to fetch user data.
 * @returns An object containing:
 *  - isSuperAdmin: boolean indicating if the user has the 'SuperAdmin' role.
 *  - isLoading: boolean indicating if the user profile data is loading.
 */
export const useIsSuperAdmin = () => {
  const { data: userProfile, isLoading } = useUserProfile()

  const isSuperAdmin = !!userProfile?.roles?.includes('SuperAdmin')

  return { isSuperAdmin, isLoading }
}
