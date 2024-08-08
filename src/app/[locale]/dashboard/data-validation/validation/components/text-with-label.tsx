import { TextWithLabelProps } from './text-with-label.type'

export const TextWithLabel = ({ label, value, className }: TextWithLabelProps) => {
  if (!value) return null

  return (
    <div className={className}>
      <h4 className="text-gray-900 fw-bold fs-6">{label}</h4>
      <p className="text-gray-600 fs-6">{value}</p>
    </div>
  )
}
