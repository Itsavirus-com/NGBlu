'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, CardBody } from 'react-bootstrap'
import {
  InteractionMode,
  Tree,
  TreeItemIndex,
  UncontrolledTreeEnvironment,
} from 'react-complex-tree'

import { KTIcon } from '@/components/kt-icon/KtIcon'
import { PageTitle } from '@/components/page-title'
import { businessPartnerApi } from '@/services/api/business-partner-api'
import { enterpriseRootApi } from '@/services/api/enterprise-root-api'

import { DynamicDrawer } from './_components/dynamic-drawer'
import { generateItemIcon, generateItemTitle, generateItemType } from './_components/helper'
import { TreeData } from './page.type'

import 'react-complex-tree/lib/style-modern.css'
import './data-hierarchy.style.scss'

interface PaginatedTreeData extends TreeData {
  data: {
    items?: any[]
    type?: string
    name?: string
    pagination?: {
      currentPage: number
      total: number
      lastPage: number
      hasMore: boolean
    }
    [key: string]: any
  }
}

export default function Validation() {
  const t = useTranslations('dataValidation.dataHierarchy')

  const [selectedItem, setSelectedItem] = useState<TreeData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [loadedItems, setLoadedItems] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [treeData, setTreeData] = useState<TreeData>({
    index: 'root',
    canMove: false,
    isFolder: true,
    children: [],
    data: {},
    canRename: false,
  })
  // State to force re-render when tree data changes
  const [forceUpdate, setForceUpdate] = useState(0)
  // Track expanded items
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([])

  // Cache timeout in milliseconds (5 minutes)
  const CACHE_TIMEOUT = 5 * 60 * 1000

  const loadTreeRoots = useCallback(async (page: number = 1): Promise<TreeData> => {
    try {
      setIsLoading(true)
      setError(null)
      const res = await enterpriseRootApi.getEnterpriseRoots({ page, limit: 15 })

      const newChildren = res.data.data.map(
        (item: Record<string, any>) => `enterprise-root-${item.id}`
      )

      if (page === 1) {
        setTotalItems(res.data.pagination.total)
        setLoadedItems(newChildren.length)
      } else {
        setLoadedItems(prev => prev + newChildren.length)
      }

      setTreeData(prev => {
        const updatedChildren =
          page === 1 ? newChildren : [...(prev.children || []), ...newChildren]
        const updatedItems =
          page === 1 ? res.data.data : [...(prev.data?.items || []), ...res.data.data]

        return {
          index: 'root',
          canMove: false,
          isFolder: true,
          children: updatedChildren,
          data: {
            items: updatedItems,
          },
          canRename: false,
        }
      })

      setHasMore(page < res.data.pagination.lastPage)
      setCurrentPage(page)

      return {
        index: 'root',
        canMove: false,
        isFolder: true,
        children: page === 1 ? newChildren : [...(treeData.children || []), ...newChildren],
        data: {
          items: page === 1 ? res.data.data : [...(treeData.data?.items || []), ...res.data.data],
        },
        canRename: false,
      }
    } catch (error) {
      console.error('Error loading tree roots:', error)
      setError(t('errorLoadingData'))
      return treeData
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTreeRoots(1)
  }, [loadTreeRoots])

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

  const loadEnterpriseRootAddresses = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootAddresses(id, { page, limit: 15 })

    // Get new children from the response
    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-address-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-addresses-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('addresses'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadEnterpriseRootBusinessPartners = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getBusinessPartners({
      page,
      limit: 15,
      filter: { enterpriseRootId: id },
    })

    // Get new children from the response
    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-business-partner-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-business-partners-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('businessPartners'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadEnterpriseRootContacts = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootContacts(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-contact-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-contacts-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('contacts'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadEnterpriseRootCustomers = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootCustomers(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-customer-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-customers-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('customers'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadEnterpriseRootProjects = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootProjects(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-project-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-projects-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('projects'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadEnterpriseRootUsers = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootUsers(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-user-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-users-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('users'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadEnterpriseRootOrgUnits = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await enterpriseRootApi.getEnterpriseRootOrgUnits(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `enterprise-root-org-unit-${id}-${item.id}`
    )

    return {
      index: `enterprise-root-org-units-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('orgUnits'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadBusinessPartnerAddresses = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootAddresses(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-address-${id}-${item.id}`
    )

    return {
      index: `business-partner-addresses-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('addresses'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadBusinessPartnerBusinessPartners = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getBusinessPartners({
      page,
      limit: 15,
      filter: { parentId: id },
    })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-business-partner-${id}-${item.id}`
    )

    return {
      index: `business-partner-business-partners-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('businessPartners'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadBusinessPartnerContacts = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootContacts(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-contact-${id}-${item.id}`
    )

    return {
      index: `business-partner-contacts-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('contacts'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadBusinessPartnerCustomers = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootCustomers(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-customer-${id}-${item.id}`
    )

    return {
      index: `business-partner-customers-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('customers'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadBusinessPartnerProjects = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootProjects(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-project-${id}-${item.id}`
    )

    return {
      index: `business-partner-projects-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('projects'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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

  const loadBusinessPartnerUsers = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootUsers(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-user-${id}-${item.id}`
    )

    return {
      index: `business-partner-users-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('users'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
      },
      canRename: false,
    }
  }

  const loadBusinessPartnerOrgUnits = async (
    id: string,
    page: number = 1
  ): Promise<PaginatedTreeData> => {
    const res = await businessPartnerApi.getEnterpriseRootOrgUnits(id, { page, limit: 15 })

    const newChildren = res.data.data.map(
      (item: Record<string, any>) => `business-partner-org-unit-${id}-${item.id}`
    )

    return {
      index: `business-partner-org-units-${id}`,
      canMove: false,
      isFolder: true,
      children: newChildren,
      data: {
        type: 'group',
        name: t('orgUnits'),
        items: res.data.data,
        pagination: {
          currentPage: page,
          total: res.data.pagination.total,
          lastPage: res.data.pagination.lastPage,
          hasMore: page < res.data.pagination.lastPage,
        },
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
      errors: Record<string, string> = {}
      cache: Record<string, { data: TreeData; timestamp: number }> = {}
      treeChangeListeners: Array<() => void> = []

      clearExpiredCache = () => {
        const now = Date.now()
        Object.entries(this.cache).forEach(([key, value]) => {
          if (now - value.timestamp > CACHE_TIMEOUT) {
            delete this.cache[key]
          }
        })
      }

      getTreeItem = async (index: TreeItemIndex): Promise<TreeData> => {
        try {
          if (index === 'root') {
            return treeData
          }

          // Clear expired cache entries
          this.clearExpiredCache()

          // Check cache first
          const cached = this.cache[index as string]
          if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
            return cached.data
          }

          const itemType = generateItemType(index as string)
          const ids = /(\d+)\-?(\d+)?/.exec(index as string)

          if (!ids) {
            return treeData
          }

          const [, id, itemId] = ids

          if (itemType === 'enterprise-root') {
            const rootItem = treeData.data?.items?.find(
              (item: Record<string, any>) => item.id.toString() === id
            )
            if (rootItem) {
              const result = {
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
                data: rootItem,
                canRename: true,
              }
              // Cache the result
              this.cache[index as string] = { data: result, timestamp: Date.now() }
              return result
            }
            return {
              index: `enterprise-root-${id}`,
              canMove: false,
              isFolder: false,
              children: [],
              data: {},
              canRename: false,
            }
          }

          if (this.data[index]) {
            return this.data[index]
          }

          let result: TreeData
          switch (itemType) {
            case 'enterprise-root-addresses':
              result = await loadEnterpriseRootAddresses(id, 1)
              break
            case 'enterprise-root-address':
              result = await loadEnterpriseRootAddressDetails(id, itemId)
              break
            case 'enterprise-root-business-partners':
              result = await loadEnterpriseRootBusinessPartners(id, 1)
              break
            case 'enterprise-root-business-partner':
              result = await loadEnterpriseRootBusinessPartnerDetails(id, itemId)
              break
            case 'enterprise-root-contacts':
              result = await loadEnterpriseRootContacts(id, 1)
              break
            case 'enterprise-root-contact':
              result = await loadEnterpriseRootContactDetails(id, itemId)
              break
            case 'enterprise-root-customers':
              result = await loadEnterpriseRootCustomers(id, 1)
              break
            case 'enterprise-root-customer':
              result = await loadEnterpriseRootCustomerDetails(id, itemId)
              break
            case 'enterprise-root-users':
              result = await loadEnterpriseRootUsers(id, 1)
              break
            case 'enterprise-root-user':
              result = await loadEnterpriseRootUserDetails(id, itemId)
              break
            case 'enterprise-root-projects':
              result = await loadEnterpriseRootProjects(id, 1)
              break
            case 'enterprise-root-project':
              result = await loadEnterpriseRootProjectDetails(id, itemId)
              break
            case 'enterprise-root-org-units':
              result = await loadEnterpriseRootOrgUnits(id, 1)
              break
            case 'enterprise-root-org-unit':
              result = await loadEnterpriseRootOrgUnitDetails(id, itemId)
              break
            case 'business-partner-addresses':
              result = await loadBusinessPartnerAddresses(id, 1)
              break
            case 'business-partner-address':
              result = await loadBusinessPartnerAddressDetails(id, itemId)
              break
            case 'business-partner-business-partners':
              result = await loadBusinessPartnerBusinessPartners(id, 1)
              break
            case 'business-partner-business-partner':
              result = await loadBusinessPartnerBusinessPartnerDetails(id, itemId)
              break
            case 'business-partner-contacts':
              result = await loadBusinessPartnerContacts(id, 1)
              break
            case 'business-partner-contact':
              result = await loadBusinessPartnerContactDetails(id, itemId)
              break
            case 'business-partner-customers':
              result = await loadBusinessPartnerCustomers(id, 1)
              break
            case 'business-partner-customer':
              result = await loadBusinessPartnerCustomerDetails(id, itemId)
              break
            case 'business-partner-users':
              result = await loadBusinessPartnerUsers(id, 1)
              break
            case 'business-partner-user':
              result = await loadBusinessPartnerUserDetails(id, itemId)
              break
            case 'business-partner-projects':
              result = await loadBusinessPartnerProjects(id, 1)
              break
            case 'business-partner-project':
              result = await loadBusinessPartnerProjectDetails(id, itemId)
              break
            case 'business-partner-org-units':
              result = await loadBusinessPartnerOrgUnits(id, 1)
              break
            case 'business-partner-org-unit':
              result = await loadBusinessPartnerOrgUnitDetails(id, itemId)
              break
            default:
              result = await loadEnterpriseRootDetails(id)
          }

          delete this.errors[index]
          this.data[index] = result
          // Cache the result
          this.cache[index as string] = { data: result, timestamp: Date.now() }
          return result
        } catch (error) {
          console.error(`Error loading tree item ${index}:`, error)
          this.errors[index as string] = t('errorLoadingItem')
          return {
            index: index as string,
            canMove: false,
            isFolder: false,
            children: [],
            data: { error: t('errorLoadingItem') },
            canRename: false,
          }
        }
      }

      retryLoadItem = async (index: string): Promise<void> => {
        delete this.data[index]
        delete this.errors[index]
        delete this.cache[index]
        await this.getTreeItem(index as TreeItemIndex)
      }

      clearCache = () => {
        this.cache = {}
      }

      onRenameItem = async (item: TreeData, name: string): Promise<void> => {
        if (this.data[item.index]) {
          this.data[item.index].data.name = name
          // Update cache if item exists
          if (this.cache[item.index]) {
            this.cache[item.index].data.data.name = name
          }
        }
      }

      loadMoreItems = async (index: string): Promise<void> => {
        try {
          // Get existing data
          const existingData = this.data[index] as PaginatedTreeData
          if (!existingData || !existingData.data.pagination?.hasMore) return

          const nextPage = existingData.data.pagination.currentPage + 1
          const itemType = generateItemType(index)
          const ids = /(\d+)\-?(\d+)?/.exec(index)

          if (!ids) return

          const [, id] = ids

          let result: PaginatedTreeData

          // Call the appropriate loading function with the next page
          switch (itemType) {
            case 'enterprise-root-addresses':
              result = await loadEnterpriseRootAddresses(id, nextPage)
              break
            case 'enterprise-root-business-partners':
              result = await loadEnterpriseRootBusinessPartners(id, nextPage)
              break
            case 'enterprise-root-contacts':
              result = await loadEnterpriseRootContacts(id, nextPage)
              break
            case 'enterprise-root-customers':
              result = await loadEnterpriseRootCustomers(id, nextPage)
              break
            case 'enterprise-root-projects':
              result = await loadEnterpriseRootProjects(id, nextPage)
              break
            case 'enterprise-root-users':
              result = await loadEnterpriseRootUsers(id, nextPage)
              break
            case 'enterprise-root-org-units':
              result = await loadEnterpriseRootOrgUnits(id, nextPage)
              break
            case 'business-partner-addresses':
              result = await loadBusinessPartnerAddresses(id, nextPage)
              break
            case 'business-partner-business-partners':
              result = await loadBusinessPartnerBusinessPartners(id, nextPage)
              break
            case 'business-partner-contacts':
              result = await loadBusinessPartnerContacts(id, nextPage)
              break
            case 'business-partner-customers':
              result = await loadBusinessPartnerCustomers(id, nextPage)
              break
            case 'business-partner-projects':
              result = await loadBusinessPartnerProjects(id, nextPage)
              break
            case 'business-partner-users':
              result = await loadBusinessPartnerUsers(id, nextPage)
              break
            case 'business-partner-org-units':
              result = await loadBusinessPartnerOrgUnits(id, nextPage)
              break
            default:
              console.warn(`Load more not implemented for item type: ${itemType}`)
              return
          }

          // Merge the new children with existing children
          const mergedChildren = [
            ...((existingData.children || []) as string[]),
            ...((result.children || []) as string[]),
          ]

          // Merge the items
          const mergedItems = [...(existingData.data.items || []), ...(result.data.items || [])]

          // Create updated data
          const updatedData: PaginatedTreeData = {
            ...existingData,
            children: mergedChildren,
            data: {
              ...existingData.data,
              items: mergedItems,
              pagination: result.data.pagination,
            },
          }

          // Update data and cache
          this.data[index] = updatedData
          this.cache[index] = { data: updatedData, timestamp: Date.now() }

          // Notify listeners of the change
          if (this.treeChangeListeners.length > 0) {
            this.treeChangeListeners.forEach(listener => listener())
          }
        } catch (error) {
          console.error(`Error loading more items for ${index}:`, error)
          this.errors[index] = t('errorLoadingMoreItems', {
            defaultValue: 'Error loading more items',
          })
        }
      }

      onTreeChange = (listener: () => void): (() => void) => {
        this.treeChangeListeners.push(listener)
        return () => {
          this.treeChangeListeners = this.treeChangeListeners.filter(l => l !== listener)
        }
      }
    }

    return new CustomDataProviderImplementation()
  }, [treeData])

  // Clear cache when component unmounts
  useEffect(() => {
    return () => {
      dataProvider.clearCache?.()
    }
  }, [dataProvider])

  // Subscribe to tree change events to force re-render when data is updated
  useEffect(() => {
    const unsubscribe = dataProvider.onTreeChange(() => {
      // Force a re-render when the tree data changes
      // This is a simple way to force a re-render in React
      setForceUpdate(prev => prev + 1)
    })

    return unsubscribe
  }, [dataProvider])

  return (
    <>
      <PageTitle title={t('title')} />

      <div className="app-container container-fluid">
        <Card>
          <CardBody className="fs-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div className="position-relative">
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <KTIcon iconName="cross-circle" className="fs-2 text-danger me-2" />
                  <div className="d-flex flex-column">
                    <h4 className="mb-1 text-danger">{t('error')}</h4>
                    <div>{error}</div>
                  </div>
                  <Button
                    variant="danger"
                    className="ms-auto"
                    onClick={() => loadTreeRoots(currentPage)}
                  >
                    {t('retry')}
                  </Button>
                </div>
              )}

              {Array.isArray(treeData.children) && treeData.children.length > 0 ? (
                <>
                  {isLoading && (
                    <div
                      className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        zIndex: 1000,
                        top: 0,
                        left: 0,
                      }}
                    >
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-2" role="status">
                          <span className="visually-hidden">{t('loading')}</span>
                        </div>
                        <div className="text-primary">{t('loading')}...</div>
                      </div>
                    </div>
                  )}
                  <UncontrolledTreeEnvironment
                    key={`${treeData.children.length}-${forceUpdate}`}
                    canDragAndDrop
                    canDropOnFolder
                    canReorderItems
                    dataProvider={dataProvider}
                    getItemTitle={generateItemTitle}
                    viewState={{
                      'enterprise-tree': {
                        expandedItems,
                      },
                    }}
                    onExpandItem={item => {
                      setExpandedItems(prev => [...prev, item.index as TreeItemIndex])
                    }}
                    onCollapseItem={item => {
                      setExpandedItems(prev => prev.filter(i => i !== item.index))
                    }}
                    defaultInteractionMode={InteractionMode.ClickArrowToExpand}
                    renderTreeContainer={({ children, containerProps }) => (
                      <div {...containerProps}>{children}</div>
                    )}
                    renderItem={({ item, depth, children, title, arrow, context }) => {
                      // Get pagination info for this item
                      const pagination = (item as PaginatedTreeData).data?.pagination
                      const hasMore = pagination?.hasMore
                      const isGroup = item.data?.type === 'group'
                      const itemId = item.data?.id

                      return (
                        <>
                          <div
                            className={`rct-tree-item-title-container ${context.isSelected ? 'rct-tree-item-title-container-selected' : ''}`}
                            style={{ paddingLeft: `${depth * 20}px` }}
                            onClick={context.isExpanded ? context.collapseItem : context.expandItem}
                          >
                            {arrow}
                            <div className="rct-tree-item-wrapper">
                              <div className="rct-tree-item-title">
                                <KTIcon
                                  iconName={generateItemIcon(item.index as string)}
                                  className="rct-tree-item-icon"
                                />
                                {itemId && <span className="rct-tree-item-id">{itemId}</span>}
                                <span>{title}</span>
                              </div>

                              {!isGroup && (
                                <Button
                                  as="a"
                                  variant="light-primary"
                                  size="sm"
                                  id="kt_enterprise_root_toggle"
                                  onClick={e => {
                                    e.stopPropagation()
                                    setSelectedItem(item)
                                  }}
                                >
                                  {t('showDetails')}
                                </Button>
                              )}
                            </div>
                          </div>
                          {context.isExpanded && (
                            <div className="rct-tree-items-container">
                              {children}

                              {/* Display no data message when group has no children */}
                              {isGroup &&
                                Array.isArray(item.children) &&
                                item.children.length === 0 &&
                                !isLoading && (
                                  <div className="rct-tree-item-container">
                                    <div
                                      className="rct-tree-item-title-container"
                                      style={{ paddingLeft: `${(depth + 1) * 20}px` }}
                                    >
                                      {arrow && (
                                        <span style={{ visibility: 'hidden' }}>{arrow}</span>
                                      )}
                                      <div className="rct-tree-item-wrapper">
                                        <div className="rct-tree-item-title">
                                          <KTIcon
                                            iconName="information-circle"
                                            className="rct-tree-item-icon text-muted"
                                          />
                                          <span className="text-muted">
                                            {t('noData', { defaultValue: 'No data available' })}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                              {/* Load More button within the expanded list */}
                              {isGroup && hasMore && (
                                <div className="rct-tree-item-container">
                                  <div
                                    className="rct-tree-item-title-container"
                                    style={{ paddingLeft: `${(depth + 1) * 20}px` }}
                                  >
                                    {arrow && <span style={{ visibility: 'hidden' }}>{arrow}</span>}
                                    <div
                                      className="rct-tree-item-wrapper load-more-item"
                                      onClick={() =>
                                        dataProvider.loadMoreItems(item.index as string)
                                      }
                                    >
                                      <div className="rct-tree-item-title">
                                        <KTIcon
                                          iconName="plus-circle"
                                          className="rct-tree-item-icon"
                                        />
                                        <span>
                                          {t('loadMore')} ({t('showing')}{' '}
                                          {item.children?.length || 0} {t('of')}{' '}
                                          {pagination?.total || 0})
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Show "All items displayed" message when all items are loaded */}
                              {isGroup &&
                                !hasMore &&
                                pagination &&
                                typeof pagination.total === 'number' &&
                                pagination.total > 0 &&
                                (item.children?.length || 0) === pagination.total && (
                                  <div className="rct-tree-item-container">
                                    <div
                                      className="rct-tree-item-title-container"
                                      style={{ paddingLeft: `${(depth + 1) * 20}px` }}
                                    >
                                      {arrow && (
                                        <span style={{ visibility: 'hidden' }}>{arrow}</span>
                                      )}
                                      <div className="rct-tree-item-wrapper">
                                        <div className="rct-tree-item-title">
                                          <KTIcon
                                            iconName="check-circle"
                                            className="rct-tree-item-icon text-success"
                                          />
                                          <span className="text-muted">
                                            {t('allItemsLoaded')} ({pagination.total} {t('items')})
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </div>
                          )}
                        </>
                      )
                    }}
                  >
                    <Tree treeId="enterprise-tree" rootItem="root" />
                  </UncontrolledTreeEnvironment>
                </>
              ) : !isLoading ? (
                <div className="alert alert-info d-flex align-items-center my-4">
                  <KTIcon iconName="information-circle" className="fs-2 text-info me-2" />
                  <div>{t('noData', { defaultValue: 'No data available' })}</div>
                </div>
              ) : null}

              {hasMore && !isLoading && (
                <div className="text-center mt-4">
                  <div className="text-muted mb-2">
                    {t('showing')} {loadedItems} {t('of')} {totalItems} {t('items')}
                  </div>
                  <Button variant="text-primary" onClick={() => loadTreeRoots(currentPage + 1)}>
                    {t('loadMore')}
                  </Button>
                </div>
              )}

              {!hasMore && loadedItems > 0 && (
                <div className="text-center mt-4 text-muted">
                  {t('allItemsLoaded')} ({loadedItems} {t('items')})
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>

      <DynamicDrawer item={selectedItem} onBreadcrumbPress={item => setSelectedItem(item)} />
    </>
  )
}
