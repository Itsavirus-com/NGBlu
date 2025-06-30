import { Placeholder } from 'react-bootstrap'

export const SelectLoading = () => {
  return (
    <Placeholder as="div" animation="wave">
      <Placeholder size="lg" bg="gray-500" className="w-100 rounded" style={{ height: '38px' }} />
    </Placeholder>
  )
}
