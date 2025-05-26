import { ApiCore } from './api-core'

export class EnterpriseRootApi extends ApiCore {
  async getEnterpriseRoots(params?: { page?: number; limit?: number }) {
    return await this.get({ path: 'enterprise-roots', payload: params })
  }

  async getEnterpriseRootDetails(id: string) {
    return await this.get({ path: `enterprise-roots/${id}` })
  }

  async getEnterpriseRootAddresses(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `enterprise-roots/${id}/addresses`, payload: params })
  }

  async getEnterpriseRootAddressDetails(id: string, addressId: string) {
    return await this.get({ path: `enterprise-roots/${id}/addresses/${addressId}` })
  }

  async getEnterpriseRootContacts(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `enterprise-roots/${id}/contacts`, payload: params })
  }

  async getEnterpriseRootContactDetails(id: string, contactId: string) {
    return await this.get({ path: `enterprise-roots/${id}/contacts/${contactId}` })
  }

  async getEnterpriseRootCustomers(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `enterprise-roots/${id}/customers`, payload: params })
  }

  async getEnterpriseRootCustomerDetails(id: string, customerId: string) {
    return await this.get({ path: `enterprise-roots/${id}/customers/${customerId}` })
  }

  async getEnterpriseRootUsers(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `enterprise-roots/${id}/users`, payload: params })
  }

  async getEnterpriseRootUserDetails(id: string, userId: string) {
    return await this.get({ path: `enterprise-roots/${id}/users/${userId}` })
  }

  async getEnterpriseRootProjects(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `enterprise-roots/${id}/projects`, payload: params })
  }

  async getEnterpriseRootProjectDetails(id: string, projectId: string) {
    return await this.get({ path: `enterprise-roots/${id}/projects/${projectId}` })
  }

  async getEnterpriseRootOrgUnits(id: string, params?: { page?: number; limit?: number }) {
    return await this.get({ path: `enterprise-roots/${id}/organisational-units`, payload: params })
  }

  async getEnterpriseRootOrgUnitDetails(id: string, orgUnitId: string) {
    return await this.get({ path: `enterprise-roots/${id}/organisational-units/${orgUnitId}` })
  }

  async getItemDetails(path: string) {
    return await this.get({ path })
  }

  async new(payload: Record<string, any>) {
    return await this.post({ path: 'enterprise-roots', payload })
  }

  async update(id: number, payload: Record<string, any>) {
    return await this.put({ path: `enterprise-roots/${id}`, payload })
  }
}

export const enterpriseRootApi = new EnterpriseRootApi()
