import { checkIsActive, getCurrentUrl } from '../helper'

describe('Sidebar Helper Functions', () => {
  describe('getCurrentUrl', () => {
    it('returns pathname without query parameters', () => {
      // Arrange
      const pathname = '/dashboard/users?page=1&sort=name'

      // Act
      const result = getCurrentUrl(pathname)

      // Assert
      expect(result).toBe('/dashboard/users')
    })

    it('returns pathname without hash fragment', () => {
      // Arrange
      const pathname = '/dashboard/settings#profile'

      // Act
      const result = getCurrentUrl(pathname)

      // Assert
      expect(result).toBe('/dashboard/settings')
    })

    it('returns pathname without query and hash', () => {
      // Arrange
      const pathname = '/dashboard/companies?filter=active#list'

      // Act
      const result = getCurrentUrl(pathname)

      // Assert
      expect(result).toBe('/dashboard/companies')
    })

    it('returns clean pathname when no query or hash', () => {
      // Arrange
      const pathname = '/dashboard'

      // Act
      const result = getCurrentUrl(pathname)

      // Assert
      expect(result).toBe('/dashboard')
    })

    it('handles empty string', () => {
      // Arrange
      const pathname = ''

      // Act
      const result = getCurrentUrl(pathname)

      // Assert
      expect(result).toBe('')
    })
  })

  describe('checkIsActive', () => {
    it('returns true for exact match', () => {
      // Arrange
      const pathname = '/dashboard/users'
      const url = '/dashboard/users'

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(true)
    })

    it('returns true when current path contains url', () => {
      // Arrange
      const pathname = '/dashboard/users/123/edit'
      const url = '/dashboard/users'

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(true)
    })

    it('returns false when paths do not match', () => {
      // Arrange
      const pathname = '/dashboard/companies'
      const url = '/dashboard/users'

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(false)
    })

    it('returns false when pathname is empty', () => {
      // Arrange
      const pathname = ''
      const url = '/dashboard/users'

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(false)
    })

    it('returns false when url is empty', () => {
      // Arrange
      const pathname = '/dashboard/users'
      const url = ''

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(false)
    })

    it('returns false when both are empty', () => {
      // Arrange
      const pathname = ''
      const url = ''

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(false)
    })

    it('handles query parameters in pathname', () => {
      // Arrange
      const pathname = '/dashboard/users?page=1'
      const url = '/dashboard/users'

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(true)
    })

    it('handles hash fragments in pathname', () => {
      // Arrange
      const pathname = '/dashboard/settings#profile'
      const url = '/dashboard/settings'

      // Act
      const result = checkIsActive(pathname, url)

      // Assert
      expect(result).toBe(true)
    })
  })
})
