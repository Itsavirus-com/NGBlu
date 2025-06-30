import { Placeholder } from 'react-bootstrap'

import { TableLoadingProps } from './table-loading.type'

export const TableLoading = ({ visible, hasActions, columnLength }: TableLoadingProps) => {
  if (!visible) return null

  const colCount = hasActions ? columnLength + 1 : columnLength

  return (
    <>
      {Array(10)
        .fill('row')
        .map((_, row) => (
          <tr key={row}>
            {Array(colCount)
              .fill('col')
              .map((_, column) => (
                <td key={`${column}-${row}`}>
                  <Placeholder as="div" animation="wave">
                    <Placeholder size="lg" bg="gray-500" className="w-100" />
                  </Placeholder>
                </td>
              ))}
          </tr>
        ))}
    </>
  )
}
