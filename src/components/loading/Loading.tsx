import { ProgressBar, Spinner } from 'react-bootstrap'

interface LoadingProps {
  fullPage?: boolean
  message?: string
  progress?: number
}

const Loading = ({ fullPage = false, message, progress }: LoadingProps) => {
  const containerClasses = ['d-flex', 'align-items-center', 'justify-content-center']

  if (fullPage) {
    containerClasses.push(
      'position-fixed',
      'top-0',
      'left-0',
      'w-100',
      'h-100',
      'bg-white',
      'bg-opacity-75',
      'z-3'
    )
  } else {
    containerClasses.push('h-100', 'p-5')
  }

  return (
    <div className={containerClasses.join(' ')}>
      <div className="text-center">
        <Spinner animation="border" variant="primary" className="mb-2" />

        {message && <div className="text-primary fw-bold mb-2">{message}</div>}

        {progress !== undefined && (
          <div className="mt-2" style={{ width: '200px' }}>
            <ProgressBar now={progress} label={`${progress}%`} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Loading
