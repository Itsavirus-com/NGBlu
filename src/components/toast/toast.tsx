'use client'

import React from 'react'
import { Toast as RBToast, ToastContainer } from 'react-bootstrap'
import { useSnapshot } from 'valtio'

import { toastStore } from '@/stores/toast-store'
import { hideStackedToast } from '@/stores/toast-store.actions'

import { KTIcon } from '../kt-icon/kt-icon'

export const Toast = () => {
  const { stacked } = useSnapshot(toastStore)

  const getIcon = (variant?: string) => {
    switch (variant) {
      case 'warning':
        return 'information'
      case 'danger':
        return 'cross-circle'
      case 'info':
        return 'information-3'
      case 'success':
      default:
        return 'verify'
    }
  }

  return (
    <ToastContainer containerPosition="fixed" position="top-end" className="p-3">
      {stacked.map((item, index) => (
        <RBToast
          key={index}
          bg={item.variant}
          autohide
          delay={2500}
          show={item.visible}
          onClose={() => hideStackedToast(index)}
        >
          <RBToast.Body className="text-white p-4">
            <div className="d-flex align-items-center">
              <KTIcon
                className="fs-2"
                iconName={getIcon(item.variant)}
                onClick={() => hideStackedToast(index)}
              />
              <strong className="ms-2 me-auto text-capitalize fs-7">{item.displayTitle}</strong>
              <KTIcon className="fs-2" iconName="cross" onClick={() => hideStackedToast(index)} />
            </div>

            <div className="ms-1 mt-1 fs-8">{item.body}</div>
          </RBToast.Body>
        </RBToast>
      ))}
    </ToastContainer>
  )
}
