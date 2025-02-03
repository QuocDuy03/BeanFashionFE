export interface INavigationItem {
  label: React.ReactNode
  key: string
  children?: INavigationItem[]
}
