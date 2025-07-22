'use client'

import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import { KTIcon } from '@/components/kt-icon/KtIcon'

export interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile?: File | null
  accept?: string
  maxSize?: number
  maxWidth?: number
  maxHeight?: number
  aspectRatio?: string
  className?: string
}

export const FileUpload = ({
  onFileSelect,
  selectedFile,
  accept = 'image/webp,image/svg+xml,image/png',
  maxSize = 1024 * 1024, // 1MB
  maxWidth = 300,
  maxHeight = 100,
  aspectRatio = '3:1',
  className = '',
}: FileUploadProps) => {
  const t = useTranslations('fileUpload')
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `${t('fileSizeTooLarge')} ${(maxSize / (1024 * 1024)).toFixed(1)}${t('mb')}`
    }

    // Check file type
    const allowedTypes = accept.split(',').map((type: string) => type.trim())
    if (!allowedTypes.includes(file.type)) {
      return t('invalidFileType', { types: allowedTypes.join(', ') })
    }

    return null
  }

  const handleFileSelect = useCallback(
    (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setDragError(validationError)
        return
      }

      setDragError(null)
      onFileSelect(file)
    },
    [onFileSelect, accept, maxSize]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect]
  )

  const handleRemoveFile = useCallback(() => {
    onFileSelect(null)
    setDragError(null)
  }, [onFileSelect])

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} ${t('bytes')}`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} ${t('kb')}`
    return `${(size / (1024 * 1024)).toFixed(1)} ${t('mb')}`
  }

  return (
    <div className={`mb-6 ${className}`}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center position-relative
          ${
            isDragOver
              ? 'border-primary bg-light-primary'
              : 'border-gray-300 bg-light-gray hover:border-gray-400'
          }
          ${dragError ? 'border-danger bg-light-danger' : ''}
          transition-all duration-300 cursor-pointer
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ minHeight: '200px' }}
      >
        {!dragError && selectedFile ? (
          <div className="d-flex align-items-center justify-content-between p-4 bg-light rounded">
            <div className="d-flex align-items-center">
              <div className="symbol symbol-50px me-4">
                <div className="symbol-label bg-light-success">
                  <KTIcon iconName="picture" className="fs-2 text-success" />
                </div>
              </div>
              <div className="text-start">
                <div className="fw-bold text-gray-800 fs-6">{selectedFile.name}</div>
                <div className="text-muted fs-7">{formatFileSize(selectedFile.size)}</div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-light-danger btn-active-danger"
              onClick={handleRemoveFile}
              title={t('removeFile')}
            >
              <KTIcon iconName="trash" className="fs-4" />
            </button>
          </div>
        ) : (
          <div className="py-8">
            <div className="mb-4">
              <div className="symbol symbol-75px mx-auto mb-4">
                <div className={`symbol-label ${isDragOver ? 'bg-primary' : 'bg-light-primary'}`}>
                  <KTIcon
                    iconName="file-added"
                    className={`fs-1 ${isDragOver ? 'text-white' : 'text-primary'}`}
                  />
                </div>
              </div>
              <h4 className={`fw-bold ${isDragOver ? 'text-primary' : 'text-gray-800'}`}>
                {isDragOver ? t('dropFile') : t('dropOrClick')}
              </h4>
              <p className="text-muted fs-6 mb-0">
                {t('supports')}{' '}
                {accept
                  .split(',')
                  .map((type: string) => type.split('/')[1])
                  .join(', ')}{' '}
                {t('filesUpTo')} {(maxSize / (1024 * 1024)).toFixed(1)}
                {t('mb')}
              </p>
            </div>

            <div className="d-flex justify-content-center gap-4 mb-4">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-20px me-2">
                  <div className="symbol-label bg-light-info">
                    <KTIcon iconName="file-added" className="fs-8 text-info" />
                  </div>
                </div>
                <span className="text-gray-600 fs-8">
                  {accept
                    .split(',')
                    .map((type: string) => type.split('/')[1])
                    .join(', ')}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div className="symbol symbol-20px me-2">
                  <div className="symbol-label bg-light-warning">
                    <KTIcon iconName="size" className="fs-8 text-warning" />
                  </div>
                </div>
                <span className="text-gray-600 fs-8">
                  {t('max')} {(maxSize / (1024 * 1024)).toFixed(1)}
                  {t('mb')}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div className="symbol symbol-20px me-2">
                  <div className="symbol-label bg-light-success">
                    <KTIcon iconName="resize" className="fs-8 text-success" />
                  </div>
                </div>
                <span className="text-gray-600 fs-8">
                  {maxWidth}x{maxHeight}px
                </span>
              </div>
            </div>

            <input
              type="file"
              className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
              accept={accept}
              onChange={handleInputChange}
            />
          </div>
        )}
        {!dragError && selectedFile && selectedFile.type.startsWith('image/') && (
          <div className="mt-4 text-center">
            <div className="border rounded p-4 bg-light">
              <h6 className="fw-bold text-gray-800 mb-3">{t('logoPreview')}</h6>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Logo preview"
                className="img-fluid rounded"
                style={{ maxHeight: '100px', maxWidth: '300px' }}
              />
            </div>
          </div>
        )}
      </div>

      {dragError && (
        <div className="alert alert-danger d-flex align-items-center mt-4">
          <div className="symbol symbol-30px me-3">
            <div className="symbol-label bg-light-danger">
              <KTIcon iconName="information-5" className="fs-5 text-danger" />
            </div>
          </div>
          <div className="fw-semibold">{dragError}</div>
        </div>
      )}
    </div>
  )
}
