import { useQuery } from '@tanstack/react-query'
import {
  requestGetPrivacyTerms,
  requestGetServiceTerms,
} from '../../request/requestGetTerms'
import { termsKeys } from './termsKeys'

export const useGetServiceTerms = () => {
  return useQuery({
    queryKey: termsKeys.service(),
    queryFn: requestGetServiceTerms,
    staleTime: 1000 * 60 * 60,
  })
}

export const useGetPrivacyTerms = () => {
  return useQuery({
    queryKey: termsKeys.privacy(),
    queryFn: requestGetPrivacyTerms,
    staleTime: 1000 * 60 * 60,
  })
}
