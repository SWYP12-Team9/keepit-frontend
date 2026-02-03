import { z } from 'zod'

{
  /* 새 폴더 생성과 함께 저장 */
}
const saveLinkWithNewReferenceSchema = z.object({
  why: z.string(),
  url: z.url(),
  memo: z.string(),
  newReference: z.object({
    title: z.string().min(1),
    colorCode: z.string(),
  }),
})

{
  /* 기존 폴더에 저장 */
}
const saveLinkWithExistingReferenceSchema = z.object({
  why: z.string(),
  url: z.url(),
  memo: z.string(),
  referenceId: z.number(),
})

{
  /* 미지정 폴더 */
}
const saveLinkWithoutReferenceSchema = z.object({
  why: z.string(),
  url: z.url(),
  memo: z.string(),
})

export const saveLinkRequestSchema = z.union([
  saveLinkWithNewReferenceSchema,
  saveLinkWithExistingReferenceSchema,
  saveLinkWithoutReferenceSchema,
])

export type SaveLinkRequest = z.infer<typeof saveLinkRequestSchema>
