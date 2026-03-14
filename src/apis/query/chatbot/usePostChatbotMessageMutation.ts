import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import {
  requestPostChatbotMessage,
  ChatbotMessageRequest,
  ChatbotMessageResponse,
} from '../../request/requestPostChatbotMessage'

export const usePostChatbotMessageMutation = (
  options?: UseMutationOptions<
    ChatbotMessageResponse,
    unknown,
    ChatbotMessageRequest
  >,
) => {
  return useMutation({
    mutationFn: requestPostChatbotMessage,
    ...options,
  })
}
