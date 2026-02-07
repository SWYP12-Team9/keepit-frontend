export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  info: () => [...userKeys.all, 'info'] as const,
}
