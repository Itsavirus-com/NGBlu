'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Button, Card, CardBody } from 'react-bootstrap'
import {
  InteractionMode,
  Tree,
  TreeItem,
  TreeItemIndex,
  UncontrolledTreeEnvironment,
} from 'react-complex-tree'

import { PageTitle } from '@/components/page-title'
import { businessPartnerApi } from '@/services/api/business-partner-api'
import { enterpriseRootApi } from '@/services/api/enterprise-root-api'

import { DynamicDrawer } from './components/dynamic-drawer'
import { DynamicDrawerProps } from './components/dynamic-drawer.type'

import 'react-complex-tree/lib/style-modern.css'
import './style.scss'

type TreeData = TreeItem<Record<string, any>>

export default function Validation() {
  const t = useTranslations('data_validation.validation')

  const [selectedItem, setSelectedItem] = useState<DynamicDrawerProps['item'] | null>(null)
  const [selectedItemTitle, setSelectedItemTitle] = useState<string | null>('')
  const [selectedItemIndex, setSelectedItemIndex] = useState<string | null>('')

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
        id: 1,
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
    const res = await businessPartnerApi.getBusinessPartners()

    return {
      index: `enterprise-root-business-partners-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-business-partner-${id}-${item.id}`
      ),
      data: {
        id: 1,
        name: t('business_partners'),
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
        `business-partner-addresses-${id}`,
        `business-partner-business-partners-${id}`,
        `business-partner-contacts-${id}`,
        `business-partner-customers-${id}`,
        `business-partner-projects-${id}`,
        `business-partner-users-${id}`,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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
    const res = await businessPartnerApi.getBusinessPartners()

    return {
      index: `business-partner-business-partners-${id}`,
      canMove: false,
      isFolder: true,
      children: res.data.data.map(
        (item: Record<string, any>) => `business-partner-business-partner-${id}-${item.id}`
      ),
      data: {
        id: 1,
        name: t('business_partners'),
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
        `business-partner-addresses-${id}`,
        `business-partner-business-partners-${id}`,
        `business-partner-contacts-${id}`,
        `business-partner-customers-${id}`,
        `business-partner-projects-${id}`,
        `business-partner-users-${id}`,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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
        id: 1,
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

  const dataProvider = useMemo(() => {
    class CustomDataProviderImplementation {
      data: Record<string, TreeData> = {}

      treeChangeListeners = []

      getTreeItem = async (itemId: TreeItemIndex): Promise<TreeData> => {
        if (typeof itemId === 'string') {
          // Enterprise Root
          if (itemId.startsWith('enterprise-root-addresses-')) {
            const id = itemId.replace('enterprise-root-addresses-', '')
            this.data[itemId] = await loadEnterpriseRootAddresses(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-address-')) {
            const ids = itemId.replace('enterprise-root-address-', '')
            const [id, addressId] = ids.split('-')

            this.data[itemId] = await loadEnterpriseRootAddressDetails(id, addressId)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-business-partners-')) {
            const id = itemId.replace('enterprise-root-business-partners-', '')
            this.data[itemId] = await loadEnterpriseRootBusinessPartners(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-business-partner-')) {
            const ids = itemId.replace('enterprise-root-business-partner-', '')
            const [id, businessPartnerId] = ids.split('-')
            this.data[itemId] = await loadEnterpriseRootBusinessPartnerDetails(
              id,
              businessPartnerId
            )

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-contacts-')) {
            const id = itemId.replace('enterprise-root-contacts-', '')
            this.data[itemId] = await loadEnterpriseRootContacts(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-contact-')) {
            const ids = itemId.replace('enterprise-root-contact-', '')
            const [id, contactId] = ids.split('-')

            this.data[itemId] = await loadEnterpriseRootContactDetails(id, contactId)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-customers-')) {
            const id = itemId.replace('enterprise-root-customers-', '')
            this.data[itemId] = await loadEnterpriseRootCustomers(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-customer-')) {
            const ids = itemId.replace('enterprise-root-customer-', '')
            const [id, customerId] = ids.split('-')

            this.data[itemId] = await loadEnterpriseRootCustomerDetails(id, customerId)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-users-')) {
            const id = itemId.replace('enterprise-root-users-', '')
            this.data[itemId] = await loadEnterpriseRootUsers(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-user-')) {
            const ids = itemId.replace('enterprise-root-user-', '')
            const [id, userId] = ids.split('-')

            this.data[itemId] = await loadEnterpriseRootUserDetails(id, userId)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-projects-')) {
            const id = itemId.replace('enterprise-root-projects-', '')
            this.data[itemId] = await loadEnterpriseRootProjects(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('enterprise-root-project-')) {
            const ids = itemId.replace('enterprise-root-project-', '')
            const [id, projectId] = ids.split('-')

            this.data[itemId] = await loadEnterpriseRootProjectDetails(id, projectId)

            return this.data[itemId]
          }

          // Business Partner
          if (itemId.startsWith('business-partner-addresses-')) {
            const id = itemId.replace('business-partner-addresses-', '')
            this.data[itemId] = await loadBusinessPartnerAddresses(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-address-')) {
            const ids = itemId.replace('business-partner-address-', '')
            const [id, addressId] = ids.split('-')

            this.data[itemId] = await loadBusinessPartnerAddressDetails(id, addressId)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-business-partners-')) {
            const id = itemId.replace('business-partner-business-partners-', '')
            this.data[itemId] = await loadBusinessPartnerBusinessPartners(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-business-partner-')) {
            const ids = itemId.replace('business-partner-business-partner-', '')
            const [id, businessPartnerId] = ids.split('-')
            this.data[itemId] = await loadBusinessPartnerBusinessPartnerDetails(
              id,
              businessPartnerId
            )

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-contacts-')) {
            const id = itemId.replace('business-partner-contacts-', '')
            this.data[itemId] = await loadBusinessPartnerContacts(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-contact-')) {
            const ids = itemId.replace('business-partner-contact-', '')
            const [id, contactId] = ids.split('-')

            this.data[itemId] = await loadBusinessPartnerContactDetails(id, contactId)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-customers-')) {
            const id = itemId.replace('business-partner-customers-', '')
            this.data[itemId] = await loadBusinessPartnerCustomers(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-customer-')) {
            const ids = itemId.replace('business-partner-customer-', '')
            const [id, customerId] = ids.split('-')

            this.data[itemId] = await loadBusinessPartnerCustomerDetails(id, customerId)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-users-')) {
            const id = itemId.replace('business-partner-users-', '')
            this.data[itemId] = await loadBusinessPartnerUsers(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-user-')) {
            const ids = itemId.replace('business-partner-user-', '')
            const [id, userId] = ids.split('-')

            this.data[itemId] = await loadBusinessPartnerUserDetails(id, userId)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-projects-')) {
            const id = itemId.replace('business-partner-projects-', '')
            this.data[itemId] = await loadBusinessPartnerProjects(id)

            return this.data[itemId]
          }
          if (itemId.startsWith('business-partner-project-')) {
            const ids = itemId.replace('business-partner-project-', '')
            const [id, projectId] = ids.split('-')

            this.data[itemId] = await loadBusinessPartnerProjectDetails(id, projectId)

            return this.data[itemId]
          }

          // Root
          if (itemId.startsWith('enterprise-root')) {
            const id = itemId.replace('enterprise-root-', '')
            this.data[itemId] = await loadEnterpriseRootDetails(id)

            return this.data[itemId]
          }
        }

        this.data['root'] = await loadTreeRoots()
        return this.data['root']
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
              getItemTitle={item => {
                if (item.data.person) {
                  return `${item.data.person.firstname} ${item.data.person.lastname}`
                }

                if (item.data.address) return item.data.address.addressName

                if (item.data.project) return item.data.project.projectName

                if (item.data.endclient) return item.data.endclient.name

                if (item.data.ouUnit) return item.data.ouUnit.name

                if (item.data.user) return item.data.user.displayName

                return item.data.name
              }}
              viewState={{
                'enterprise-tree': {},
              }}
              defaultInteractionMode={InteractionMode.ClickArrowToExpand}
              renderItemTitle={({ item, title }) => {
                return (
                  <div className="rct-tree-item-title-wrapper">
                    <span>{title}</span>
                    {item.canMove && (
                      <Button
                        as="a"
                        variant="light-primary"
                        size="sm"
                        id="kt_enterprise_root_toggle"
                        onClick={() => {
                          setSelectedItem(item.data)
                          setSelectedItemTitle(title)
                          setSelectedItemIndex(item.index as string)
                        }}
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

      <DynamicDrawer index={selectedItemIndex} title={selectedItemTitle} item={selectedItem} />
    </>
  )
}
