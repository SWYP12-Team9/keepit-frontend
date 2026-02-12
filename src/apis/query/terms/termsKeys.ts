export const termsKeys = {
  all: ['terms'] as const,
  service: () => [...termsKeys.all, 'service'] as const,
  privacy: () => [...termsKeys.all, 'privacy'] as const,
}
