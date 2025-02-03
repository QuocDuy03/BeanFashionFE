import { INavigationItem } from '@/interfaces'

export const normalizeKey = (key: string) => {
  return key
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')
}
export const findActiveKey = (items: INavigationItem[], url: string): string | null => {
  const normalizedUrl = normalizeKey(url)
  for (const item of items) {
    if (normalizedUrl.includes(normalizeKey(item.key))) {
      return item.key
    }
    if (item.children) {
      const childKey = findActiveKey(item.children, url)
      if (childKey) {
        return childKey
      }
    }
  }
  return null
}
