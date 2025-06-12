interface ErrorStateProps {
  message?: string
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <div className="alert alert-danger">
      <h4>Error</h4>
      <p>{message || 'Failed to load audit trail details. Please try again later.'}</p>
    </div>
  )
}
