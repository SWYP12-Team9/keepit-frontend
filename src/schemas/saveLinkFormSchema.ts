import { z } from 'zod'

{
  /* 폼 검증 */
}
export const saveLinkFormSchema = z
  .object({
    why: z.string().min(1, '저장 이유를 입력해 주세요'),
    url: z.url({ message: '올바른 URL 형식이 아닙니다' }),
    selectedFolder: z
      .object({
        id: z.union([z.string(), z.number()]),
        title: z.string(),
      })
      .nullable(),
    newFolder: z.string(),
    colorCode: z.string(),
    memo: z.string().max(500, '메모는 최대 500자까지 입력할 수 있습니다'),
  })
  .superRefine((data, ctx) => {
    if (data.selectedFolder?.id === 'create-folder') {
      if (!data.newFolder || data.newFolder.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: '레퍼런스 폴더 이름을 입력해 주세요',
          path: ['newFolder'],
        })
      }
      if (!data.colorCode) {
        ctx.addIssue({
          code: 'custom',
          message: '색상을 선택해 주세요',
          path: ['colorCode'],
        })
      }
    }
  })

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
