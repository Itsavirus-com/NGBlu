import { ApiCore } from './api-core'

export class BusinessPartnerApi extends ApiCore {
  async getBusinessPartners(payload?: Record<string, any>) {
    return await this.get({ path: 'business-partners', payload })
  }

  async getBusinessPartnerDetails(id: string) {
    return await this.get({ path: `business-partners/${id}` })
  }

  async getEnterpriseRootAddresses(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `business-partners/${id}/addresses`, payload: params })
  }

  async getEnterpriseRootAddressDetails(id: string, addressId: string) {
    return await this.get({ path: `business-partners/${id}/addresses/${addressId}` })
  }

  async getEnterpriseRootContacts(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `business-partners/${id}/contacts`, payload: params })
  }

  async getEnterpriseRootContactDetails(id: string, contactId: string) {
    return await this.get({ path: `business-partners/${id}/contacts/${contactId}` })
  }

  async getEnterpriseRootCustomers(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `business-partners/${id}/customers`, payload: params })
  }

  async getEnterpriseRootCustomerDetails(id: string, customerId: string) {
    return await this.get({ path: `business-partners/${id}/customers/${customerId}` })
  }

  async getEnterpriseRootUsers(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `business-partners/${id}/users`, payload: params })
  }

  async getEnterpriseRootUserDetails(id: string, userId: string) {
    return await this.get({ path: `business-partners/${id}/users/${userId}` })
  }

  async getEnterpriseRootProjects(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `business-partners/${id}/projects`, payload: params })
  }

  async getEnterpriseRootProjectDetails(id: string, projectId: string) {
    return await this.get({ path: `business-partners/${id}/projects/${projectId}` })
  }

  async getEnterpriseRootOrgUnits(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `business-partners/${id}/organisational-units`, payload: params })
  }

  async getEnterpriseRootOrgUnitDetails(id: string, orgUnitId: string) {
    return await this.get({ path: `business-partners/${id}/organisational-units/${orgUnitId}` })
  }

  async new(payload: Record<string, any>) {
    return await this.post({ path: 'business-partners', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `business-partners/${id}`, payload })
  }
}

export const businessPartnerApi = new BusinessPartnerApi()
