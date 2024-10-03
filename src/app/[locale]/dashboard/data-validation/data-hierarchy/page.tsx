'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Button, Card, CardBody } from 'react-bootstrap'
import {
  InteractionMode,
  Tree,
  TreeItemIndex,
  UncontrolledTreeEnvironment,
} from 'react-complex-tree'

import { KTIcon } from '@/components/kt-icon/kt-icon'
import { PageTitle } from '@/components/page-title'
import { businessPartnerApi } from '@/services/api/business-partner-api'
import { enterpriseRootApi } from '@/services/api/enterprise-root-api'

import { DynamicDrawer } from './components/dynamic-drawer'
import {
  generateItemIcon,
  generateItemId,
  generateItemTitle,
  generateItemType,
} from './components/helper'
import { TreeData } from './page.type'

import 'react-complex-tree/lib/style-modern.css'
import './style.scss'

export default function Validation() {
  const t = useTranslations('dataValidation.dataHierarchy')

  const [selectedItem, setSelectedItem] = useState<TreeData | null>(null)

  const loadTreeRoots = async (): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRoots()

    return {
      index: 'root',
      canMove: false,
      isFolder: true,
      children: res.data.data.map((item: Record<string, any>) => `enterprise-root-${item.id}`),
      data: {},
      canRename: false,
    }
  }

  const loadEnterpriseRootDetails = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootDetails(id)

    return {
      index: `enterprise-root-${id}`,
      canMove: true,
      isFolder: true,
      children: [
        `enterprise-root-addresses-${id}`,
        `enterprise-root-business-partners-${id}`,
        `enterprise-root-contacts-${id}`,
        `enterprise-root-customers-${id}`,
        `enterprise-root-projects-${id}`,
        `enterprise-root-users-${id}`,
        `enterprise-root-org-units-${id}`,
      ],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadEnterpriseRootAddresses = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootAddresses(id)

    return {
      index: `enterprise-root-addresses-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-address-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('addresses'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootAddressDetails = async (
    id: string,
    addressId: string
  ): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootAddressDetails(id, addressId)

    return {
      index: `enterprise-root-address-${id}-${addressId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadEnterpriseRootBusinessPartners = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getBusinessPartners({ filter: { enterpriseRootId: id } })

    return {
      index: `enterprise-root-business-partners-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-business-partner-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('businessPartners'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootBusinessPartnerDetails = async (
    id: string,
    businessPartnerId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getBusinessPartnerDetails(businessPartnerId)

    return {
      index: `enterprise-root-business-partner-${id}-${businessPartnerId}`,
      canMove: true,
      isFolder: true,
      children: [
        `business-partner-addresses-${businessPartnerId}`,
        `business-partner-business-partners-${businessPartnerId}`,
        `business-partner-contacts-${businessPartnerId}`,
        `business-partner-customers-${businessPartnerId}`,
        `business-partner-projects-${businessPartnerId}`,
        `business-partner-users-${businessPartnerId}`,
        `business-partner-org-units-${businessPartnerId}`,
      ],
      data: res.data.data,
      canRename: false,
    }
  }

  const loadEnterpriseRootContacts = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootContacts(id)

    return {
      index: `enterprise-root-contacts-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-contact-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('contacts'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootContactDetails = async (
    id: string,
    contactId: string
  ): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootContactDetails(id, contactId)

    return {
      index: `enterprise-root-contact-${id}-${contactId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadEnterpriseRootCustomers = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootCustomers(id)

    return {
      index: `enterprise-root-customers-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-customer-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('customers'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootCustomerDetails = async (
    id: string,
    customerId: string
  ): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootCustomerDetails(id, customerId)

    return {
      index: `enterprise-root-customer-${id}-${customerId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadEnterpriseRootProjects = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootProjects(id)

    return {
      index: `enterprise-root-projects-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-project-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('projects'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootProjectDetails = async (
    id: string,
    projectId: string
  ): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootProjectDetails(id, projectId)

    return {
      index: `enterprise-root-project-${id}-${projectId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadEnterpriseRootUsers = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootUsers(id)

    return {
      index: `enterprise-root-users-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-user-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('users'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootUserDetails = async (id: string, userId: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootUserDetails(id, userId)

    return {
      index: `enterprise-root-user-${id}-${userId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadEnterpriseRootOrgUnits = async (id: string): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootOrgUnits(id)

    return {
      index: `enterprise-root-org-units-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-org-unit-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('orgUnits'),
      },
      canRename: false,
    }
  }

  const loadEnterpriseRootOrgUnitDetails = async (
    id: string,
    orgUnitId: string
  ): Promise<TreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootOrgUnitDetails(id, orgUnitId)

    return {
      index: `enterprise-root-org-unit-${id}-${orgUnitId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadBusinessPartnerAddresses = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootAddresses(id)

    return {
      index: `business-partner-addresses-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-address-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('addresses'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerAddressDetails = async (
    id: string,
    addressId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootAddressDetails(id, addressId)

    return {
      index: `business-partner-address-${id}-${addressId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadBusinessPartnerBusinessPartners = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getBusinessPartners({ filter: { parentId: id } })

    return {
      index: `business-partner-business-partners-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-business-partner-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('businessPartners'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerBusinessPartnerDetails = async (
    id: string,
    businessPartnerId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getBusinessPartnerDetails(businessPartnerId)

    return {
      index: `business-partner-business-partner-${id}-${businessPartnerId}`,
      canMove: true,
      isFolder: true,
      children: [
        `business-partner-addresses-${businessPartnerId}`,
        `business-partner-business-partners-${businessPartnerId}`,
        `business-partner-contacts-${businessPartnerId}`,
        `business-partner-customers-${businessPartnerId}`,
        `business-partner-projects-${businessPartnerId}`,
        `business-partner-users-${businessPartnerId}`,
        `business-partner-org-units-${businessPartnerId}`,
      ],
      data: res.data.data,
      canRename: false,
    }
  }

  const loadBusinessPartnerContacts = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootContacts(id)

    return {
      index: `business-partner-contacts-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-contact-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('contacts'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerContactDetails = async (
    id: string,
    contactId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootContactDetails(id, contactId)

    return {
      index: `business-partner-contact-${id}-${contactId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadBusinessPartnerCustomers = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootCustomers(id)

    return {
      index: `business-partner-customers-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-customer-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('customers'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerCustomerDetails = async (
    id: string,
    customerId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootCustomerDetails(id, customerId)

    return {
      index: `business-partner-customer-${id}-${customerId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadBusinessPartnerProjects = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootProjects(id)

    return {
      index: `business-partner-projects-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-project-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('projects'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerProjectDetails = async (
    id: string,
    projectId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootProjectDetails(id, projectId)

    return {
      index: `business-partner-project-${id}-${projectId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadBusinessPartnerUsers = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootUsers(id)

    return {
      index: `business-partner-users-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-user-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('users'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerUserDetails = async (id: string, userId: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootUserDetails(id, userId)

    return {
      index: `business-partner-user-${id}-${userId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const loadBusinessPartnerOrgUnits = async (id: string): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootOrgUnits(id)

    return {
      index: `business-partner-org-units-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-org-unit-${id}-${item.id}`
      ),
      data: {
        type: 'group',
        name: t('orgUnits'),
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerOrgUnitDetails = async (
    id: string,
    orgUnitId: string
  ): Promise<TreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootOrgUnitDetails(id, orgUnitId)

    return {
      index: `business-partner-org-unit-${id}-${orgUnitId}`,
      canMove: true,
      isFolder: false,
      children: [],
      data: res.data.data,
      canRename: true,
    }
  }

  const dataProvider = useMemo(() => {
    class CustomDataProviderImplementation {
      data: Record<string, TreeData> = {}

      treeChangeListeners = []

      getTreeItem = async (index: TreeItemIndex): Promise<TreeData> => {
        const itemType = generateItemType(index as string)
        const ids = /(\d+)\-?(\d+)?/.exec(index as string)

        if (!ids) {
          this.data['root'] = await loadTreeRoots()
          return this.data['root']
        }

        const [, id, itemId] = ids
        switch (itemType) {
          case 'enterprise-root-addresses':
            this.data[index] = await loadEnterpriseRootAddresses(id)
            return this.data[index]
          case 'enterprise-root-address':
            this.data[index] = await loadEnterpriseRootAddressDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root-business-partners':
            this.data[index] = await loadEnterpriseRootBusinessPartners(id)
            return this.data[index]
          case 'enterprise-root-business-partner':
            this.data[index] = await loadEnterpriseRootBusinessPartnerDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root-contacts':
            this.data[index] = await loadEnterpriseRootContacts(id)
            return this.data[index]
          case 'enterprise-root-contact':
            this.data[index] = await loadEnterpriseRootContactDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root-customers':
            this.data[index] = await loadEnterpriseRootCustomers(id)
            return this.data[index]
          case 'enterprise-root-customer':
            this.data[index] = await loadEnterpriseRootCustomerDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root-users':
            this.data[index] = await loadEnterpriseRootUsers(id)
            return this.data[index]
          case 'enterprise-root-user':
            this.data[index] = await loadEnterpriseRootUserDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root-projects':
            this.data[index] = await loadEnterpriseRootProjects(id)
            return this.data[index]
          case 'enterprise-root-project':
            this.data[index] = await loadEnterpriseRootProjectDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root-org-units':
            this.data[index] = await loadEnterpriseRootOrgUnits(id)
            return this.data[index]
          case 'enterprise-root-org-unit':
            this.data[index] = await loadEnterpriseRootOrgUnitDetails(id, itemId)
            return this.data[index]
          case 'business-partner-addresses':
            this.data[index] = await loadBusinessPartnerAddresses(id)
            return this.data[index]
          case 'business-partner-address':
            this.data[index] = await loadBusinessPartnerAddressDetails(id, itemId)
            return this.data[index]
          case 'business-partner-business-partners':
            this.data[index] = await loadBusinessPartnerBusinessPartners(id)
            return this.data[index]
          case 'business-partner-business-partner':
            this.data[index] = await loadBusinessPartnerBusinessPartnerDetails(id, itemId)
            return this.data[index]
          case 'business-partner-contacts':
            this.data[index] = await loadBusinessPartnerContacts(id)
            return this.data[index]
          case 'business-partner-contact':
            this.data[index] = await loadBusinessPartnerContactDetails(id, itemId)
            return this.data[index]
          case 'business-partner-customers':
            this.data[index] = await loadBusinessPartnerCustomers(id)
            return this.data[index]
          case 'business-partner-customer':
            this.data[index] = await loadBusinessPartnerCustomerDetails(id, itemId)
            return this.data[index]
          case 'business-partner-users':
            this.data[index] = await loadBusinessPartnerUsers(id)
            return this.data[index]
          case 'business-partner-user':
            this.data[index] = await loadBusinessPartnerUserDetails(id, itemId)
            return this.data[index]
          case 'business-partner-projects':
            this.data[index] = await loadBusinessPartnerProjects(id)
            return this.data[index]
          case 'business-partner-project':
            this.data[index] = await loadBusinessPartnerProjectDetails(id, itemId)
            return this.data[index]
          case 'business-partner-org-units':
            this.data[index] = await loadBusinessPartnerOrgUnits(id)
            return this.data[index]
          case 'business-partner-org-unit':
            this.data[index] = await loadBusinessPartnerOrgUnitDetails(id, itemId)
            return this.data[index]
          case 'enterprise-root':
          default:
            this.data[index] = await loadEnterpriseRootDetails(id)
            return this.data[index]
        }
      }

      onRenameItem = async (item: TreeData, name: string) => {
        this.data[item.index].data.name = name
      }
    }

    return new CustomDataProviderImplementation()
  }, [])

  return (
    <>
      <PageTitle title={t('title')} />

      <div className="app-container container-fluid">
        <Card>
          <CardBody className="fs-5">
            <UncontrolledTreeEnvironment
              canDragAndDrop
              canDropOnFolder
              canReorderItems
              dataProvider={dataProvider}
              getItemTitle={generateItemTitle}
              viewState={{
                'enterprise-tree': {},
              }}
              defaultInteractionMode={InteractionMode.ClickArrowToExpand}
              renderItemTitle={({ item, title }) => {
                const itemId = generateItemId(item)

                return (
                  <div className="rct-tree-item-wrapper">
                    <div className="rct-tree-item-title">
                      <KTIcon
                        iconName={generateItemIcon(item.index as string)}
                        className="rct-tree-item-icon"
                      />
                      {itemId && <span className="rct-tree-item-id">{itemId}</span>}
                      <span>{title}</span>
                    </div>

                    {item.data?.type !== 'group' && (
                      <Button
                        as="a"
                        variant="light-primary"
                        size="sm"
                        id="kt_enterprise_root_toggle"
                        onClick={() => setSelectedItem(item)}
                      >
                        {t('showDetails')}
                      </Button>
                    )}
                  </div>
                )
              }}
            >
              <Tree treeId="enterprise-tree" rootItem="root" />
            </UncontrolledTreeEnvironment>
          </CardBody>
        </Card>
      </div>

      <DynamicDrawer item={selectedItem} onBreadcrumbPress={item => setSelectedItem(item)} />
    </>
  )
}
