import { ApiCore } from './api-core'

export class BusinessPartnerApi extends ApiCore {
  async getBusinessPartners(payload?: Record<string, any>) {
    return await this.get({ path: 'business-partners', payload })
  }

  async getBusinessPartnerDetails(id: string) {
    return await this.get({ path: `business-partners/${id}` })
  }

  async getEnterpriseRootAddresses(id: string) {
    return await this.get({ path: `business-partners/${id}/addresses` })
  }

  async getEnterpriseRootAddressDetails(id: string, addressId: string) {
    return await this.get({ path: `business-partners/${id}/addresses/${addressId}` })
  }

  async getEnterpriseRootContacts(id: string) {
    return await this.get({ path: `business-partners/${id}/contacts` })
  }

  async getEnterpriseRootContactDetails(id: string, contactId: string) {
    return await this.get({ path: `business-partners/${id}/contacts/${contactId}` })
  }

  async getEnterpriseRootCustomers(id: string) {
    return await this.get({ path: `business-partners/${id}/customers` })
  }

  async getEnterpriseRootCustomerDetails(id: string, customerId: string) {
    return await this.get({ path: `business-partners/${id}/customers/${customerId}` })
  }

  async getEnterpriseRootUsers(id: string) {
    return await this.get({ path: `business-partners/${id}/users` })
  }

  async getEnterpriseRootUserDetails(id: string, userId: string) {
    return await this.get({ path: `business-partners/${id}/users/${userId}` })
  }

  async getEnterpriseRootProjects(id: string) {
    return await this.get({ path: `business-partners/${id}/projects` })
  }

  async getEnterpriseRootProjectDetails(id: string, projectId: string) {
    return await this.get({ path: `business-partners/${id}/projects/${projectId}` })
  }

  async getEnterpriseRootOrgUnits(id: string) {
    return await this.get({ path: `business-partners/${id}/organisational-units` })
  }

  async getEnterpriseRootOrgUnitDetails(id: string, orgUnitId: string) {
    return await this.get({ path: `business-partners/${id}/organisational-units/${orgUnitId}` })
  }
}

export const businessPartnerApi = new BusinessPartnerApi()
