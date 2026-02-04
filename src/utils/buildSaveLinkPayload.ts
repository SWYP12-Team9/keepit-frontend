import { SaveLinkFormData } from '../components/Modal'
import { SaveLinkRequest } from '../schemas/saveLinkFormSchema'

export const buildSaveLinkPayload = (
  data: SaveLinkFormData,
): SaveLinkRequest => {
  const basePayload = {
    why: data.why,
    url: data.url,
    memo: data.memo,
  }

  {
    /* 새 폴더 생성 */
  }
  if (data.selectedFolder?.id === 'create-folder') {
    return {
      ...basePayload,
      newReference: {
        title: data.newFolder,
        colorCode: data.colorCode,
      },
    }
  }

  {
    /* 기존 폴더 선택 */
  }
  if (data.selectedFolder?.id && typeof data.selectedFolder.id === 'number') {
    return {
      ...basePayload,
      referenceId: data.selectedFolder.id,
    }
  }

  {
    /* 폴더 미지정 */
  }
  return basePayload
}
