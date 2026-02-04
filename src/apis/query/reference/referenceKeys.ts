import { ReferenceVisibility } from '@/src/types/reference/reference'

export const referenceKeys = {
  all: ['reference'] as const,
  lists: () => [...referenceKeys.all, 'list'] as const,
  list: (visibility?: ReferenceVisibility) =>
    [...referenceKeys.lists(), visibility] as const,
}
