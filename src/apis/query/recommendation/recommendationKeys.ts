export const recommendationKeys = {
  all: ['recommendation'] as const,
  categories: () => [...recommendationKeys.all, 'categories'] as const,
}
