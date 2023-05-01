export interface TableColumn<T> {
  label?: string;
  accessor: keyof T | 'actions';
  render?: (row?: T) => JSX.Element;
}
