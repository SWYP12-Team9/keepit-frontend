export interface OtherUserLinkItem {
  id: number
  url: string
  title: string
  aiSummary: string
  category: {
    name: string
  }
  user: {
    userId: number
    nickname: string
    profileImageUrl: string | null
  }
}
