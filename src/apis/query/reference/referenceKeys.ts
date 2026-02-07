import { ReferenceVisibility } from '@/src/types/reference/reference'

export const referenceKeys = {
  all: ['reference'] as const,
  lists: () => [...referenceKeys.all, 'list'] as const,
  list: (visibility?: ReferenceVisibility) =>
    [...referenceKeys.lists(), visibility] as const,

  details: () => [...referenceKeys.all, 'detail'] as const,
  detail: (id: number) => [...referenceKeys.details(), id] as const,

  frequentInfinite: () =>
    [...referenceKeys.all, 'frequent', 'infinite'] as const,

  listInfinite: ({ type }: { type: ReferenceVisibility; size: number }) =>
    [...referenceKeys.all, 'list', 'infinite', type] as const,
}
