export const linkKeys = {
  all: ['link'] as const,
  lists: () => [...linkKeys.all, 'list'] as const,
  list: (id?: number) => [...linkKeys.lists(), id] as const,

  details: () => [...linkKeys.all, 'detail'] as const,
  detail: (id: number) => [...linkKeys.details(), id] as const,
}
