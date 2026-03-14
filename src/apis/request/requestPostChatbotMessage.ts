import { axiosInstance } from '../instance/axiosInstance'

export interface ChatbotMessageRequest {
  message: string
}

export interface ChatbotUserLink {
  id: number
  url: string
  title: string
  aiSummary: string
  why: string
  memo: string
  relevanceScore: number
}

export interface ChatbotMessageResponse {
  answer: string
  userLinks?: ChatbotUserLink | ChatbotUserLink[]
}

interface ApiResponse {
  status: string
  message: string
  data: ChatbotMessageResponse
}

export const requestPostChatbotMessage = async (
  body: ChatbotMessageRequest,
): Promise<ChatbotMessageResponse> => {
  const res = await axiosInstance.post<ApiResponse>('/chatbots/message', body)
  return res.data.data
}
