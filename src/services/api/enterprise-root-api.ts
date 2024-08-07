import { ApiCore } from './api-core'

export class EnterpriseRootApi extends ApiCore {
  async getEnterpriseRoots() {
    return await this.get({ path: 'enterprise-roots' })
  }

  async getEnterpriseRootDetails(id: string) {
    return await this.get({ path: `enterprise-roots/${id}` })
  }

  async getEnterpriseRootAddresses(id: string) {
    return await this.get({ path: `enterprise-roots/${id}/addresses` })
  }

  async getEnterpriseRootAddressDetails(id: string, addressId: string) {
    return await this.get({ path: `enterprise-roots/${id}/addresses/${addressId}` })
  }

  async getEnterpriseRootContacts(id: string) {
    return await this.get({ path: `enterprise-roots/${id}/contacts` })
  }

  async getEnterpriseRootContactDetails(id: string, contactId: string) {
    return await this.get({ path: `enterprise-roots/${id}/contacts/${contactId}` })
  }

  async getEnterpriseRootCustomers(id: string) {
    return await this.get({ path: `enterprise-roots/${id}/customers` })
  }

  async getEnterpriseRootCustomerDetails(id: string, customerId: string) {
    return await this.get({ path: `enterprise-roots/${id}/customers/${customerId}` })
  }

  async getEnterpriseRootUsers(id: string) {
    return await this.get({ path: `enterprise-roots/${id}/users` })
  }

  async getEnterpriseRootUserDetails(id: string, userId: string) {
    return await this.get({ path: `enterprise-roots/${id}/users/${userId}` })
  }

  async getEnterpriseRootProjects(id: string) {
    return await this.get({ path: `enterprise-roots/${id}/projects` })
  }

  async getEnterpriseRootProjectDetails(id: string, customerId: string) {
    return await this.get({ path: `enterprise-roots/${id}/projects/${customerId}` })
  }
}

export const enterpriseRootApi = new EnterpriseRootApi()
