import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center p-5">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default Loading
