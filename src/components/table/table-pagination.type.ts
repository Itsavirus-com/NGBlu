export type TablePaginationProps = {
  currentPage?: number
  totalPage?: number
  perPage?: number
  onPageChange?: (page: number) => void
  onPerPageChange?: (perPage: number) => void
}
