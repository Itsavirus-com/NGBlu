export type AuditTrail = {
  id: string
  userType: string | null
  userId: number | null
  event: 'created' | 'updated' | 'deleted' | 'restored'
  auditableType: string
  auditableId: number
  oldValues: Record<string, any>
  newValues: Record<string, any>
  url: string
  ipAddress: string
  location: string
  signature: string
  userAgent: string
  tags: string | null
  createdAt: string
  updatedAt: string
  user: AuditUser | null
  auditable: Record<string, any> | null
}

export type AuditUser = {
  id: number
  displayName: string
  email: string
  blockedAt: string | null
  lastLogin: string
  personId: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  invitationSentAt: string | null
  entraObjectId: string | null
  accountActivatedAt: string
  stateUser: string
  authType: 'manual' | 'microsoft'
  newEmailToVerify: string | null
}

export type AuditTrailResponse = {
  data: AuditTrail[]
  meta: {
    currentPage: number
    lastPage: number
    perPage: number
    total: number
  }
}

export type AuditTrailFilters = {
  event?: string
  userId?: string
  auditableType?: string
  fromDate?: string
  toDate?: string
  page?: number
  limit?: number
}
