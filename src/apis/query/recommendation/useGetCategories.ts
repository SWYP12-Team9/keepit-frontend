import { useQuery } from '@tanstack/react-query'
import { recommendationKeys } from './recommendationKeys'
import { requestGetCategories } from '../../request/requestGetCategories'

export const useGetCategories = () => {
  return useQuery({
    queryKey: recommendationKeys.categories(),
    queryFn: () => requestGetCategories(),
  })
}
