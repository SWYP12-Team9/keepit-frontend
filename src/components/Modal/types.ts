import { DropdownOption } from '../Dropdown'

export interface SaveLinkFormData {
  why: string
  url: string
  selectedFolder: DropdownOption | null
  newFolder: string
  colorCode: string
  memo: string
}

export interface MoveLinkFormData {
  newFolder: string
  colorCode: string
  selectedFolder: DropdownOption | null
}
