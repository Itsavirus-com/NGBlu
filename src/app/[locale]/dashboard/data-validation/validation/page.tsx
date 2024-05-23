'use client'

import { useTranslations } from 'next-intl'
import { Button, Card, CardBody } from 'react-bootstrap'
import {
  InteractionMode,
  StaticTreeDataProvider,
  Tree,
  UncontrolledTreeEnvironment,
} from 'react-complex-tree'

import { PageTitle } from '@/components/page-title'

import { convertedList } from './data'

import 'react-complex-tree/lib/style-modern.css'
import './style.scss'

export default function Validation() {
  const t = useTranslations('data_validation.validation')

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
              dataProvider={
                new StaticTreeDataProvider(convertedList, (item, data) => ({ ...item, data }))
              }
              getItemTitle={item => item.data}
              viewState={{
                'enterprise-tree': {
                  expandedItems: ['1', '2', '3'],
                },
              }}
              defaultInteractionMode={InteractionMode.ClickArrowToExpand}
              renderItemTitle={item => (
                <div className="rct-tree-item-title-wrapper">
                  <span>{item.title}</span>
                  <Button variant="light-primary" size="sm" id="kt_enterprise_root_toggle">
                    {t('showDetails')}
                  </Button>
                </div>
              )}
            >
              <Tree treeId="enterprise-tree" rootItem="root" />
            </UncontrolledTreeEnvironment>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
