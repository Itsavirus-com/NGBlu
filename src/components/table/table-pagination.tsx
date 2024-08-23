import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Form, Pagination, Row } from 'react-bootstrap'

import { useViewport } from '@/hooks'

import { TablePaginationProps } from './table-pagination.type'
import { KTIcon } from '../kt-icon/kt-icon'

export const TablePagination = (props: TablePaginationProps) => {
  const t = useTranslations('common.table')
  const { width } = useViewport()

  const { currentPage = 1, totalPage = 1, perPage = 20, onPageChange, onPerPageChange } = props

  const setPage = (page: number) => onPageChange && onPageChange(page)

  const setPerPage = (perPage: number) => onPerPageChange && onPerPageChange(perPage)

  const filterPages = useCallback(
    (visiblePages: number[]) => {
      return visiblePages.filter((page: number) => page <= totalPage)
    },
    [totalPage]
  )

  const getVisiblePages = useCallback(
    (page: number, total: number) => {
      if (width < 576) return []

      if (total < 7) {
        return filterPages([1, 2, 3, 4, 5, 6])
      } else {
        if (page % 5 >= 0 && page > 4 && page + 2 < total) {
          return [1, page - 1, page, page + 1, total]
        } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
          return [1, total - 3, total - 2, total - 1, total]
        } else {
          return [1, 2, 3, 4, 5, total]
        }
      }
    },
    [filterPages, width]
  )

  const [visiblePages, setVisiblePages] = useState<number[]>(
    getVisiblePages(currentPage, totalPage)
  )

  useEffect(() => {
    const visiblePages = getVisiblePages(currentPage, totalPage)

    setVisiblePages(visiblePages)
  }, [currentPage, totalPage, getVisiblePages])

  return (
    <Row className="mt-8 mb-4">
      <Col xs={12} lg={7} className="d-flex align-items-center">
        <Form.Group className="d-flex align-items-center">
          <Form.Label className="me-2 mb-0">{t('display')}</Form.Label>
          <Form.Select
            value={perPage}
            onChange={e => setPerPage(Number(e.target.value))}
            style={{ width: '115px' }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {t('rows', { pageSize })}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="ms-sm-3 me-sm-3">
          {t.rich('pageInfo', {
            currentPage,
            totalPage,
            strong: chunks => <strong>{chunks}</strong>,
          })}
        </div>

        <Form.Group className="d-flex align-items-center">
          <Form.Label className="me-2 mb-0" htmlFor="goToPage">
            {t('goToPage')}
          </Form.Label>
          <Form.Control
            type="number"
            value={currentPage}
            onChange={e => setPage(Number(e.target.value))}
            style={{ width: '80px' }}
            id="goToPage"
          />
        </Form.Group>
      </Col>
      {totalPage > 1 && (
        <Col xs={12} lg={5} className="d-flex justify-content-end align-items-center">
          <Pagination className="mb-0" {...(width < 576 && { size: 'lg' })}>
            <Pagination.Prev disabled={false} onClick={() => setPage(currentPage - 1)}>
              <KTIcon iconName="double-left-arrow" />
            </Pagination.Prev>

            {(visiblePages || []).map((page, index, array) => {
              return array[index - 1] + 1 < page ? (
                <React.Fragment key={page.toString()}>
                  <Pagination.Item>...</Pagination.Item>
                  <Pagination.Item active={page === currentPage} onClick={() => setPage(page)}>
                    {page}
                  </Pagination.Item>
                </React.Fragment>
              ) : (
                <Pagination.Item
                  key={page.toString()}
                  active={page === currentPage}
                  onClick={() => setPage(page)}
                >
                  {page}
                </Pagination.Item>
              )
            })}

            <Pagination.Next disabled={false} onClick={() => setPage(currentPage + 1)}>
              <KTIcon iconName="double-right-arrow" />
            </Pagination.Next>
          </Pagination>
        </Col>
      )}
    </Row>
  )
}
