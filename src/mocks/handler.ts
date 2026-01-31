import { http, HttpResponse } from 'msw'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const handlers = [
  http.get(`${BASE_URL}/api/home`, () => {
    return HttpResponse.json({
      tabs: [
        {
          id: 1,
          title: '경제',
        },
        {
          id: 2,
          title: '두쫀쿠',
        },
        {
          id: 3,
          title: '여행',
        },
        {
          id: 4,
          title: 'IT',
        },
        {
          id: 5,
          title: '취미',
        },
        {
          id: 6,
          title: '기타',
        },
        {
          id: 7,
          title: '영화',
        },
        {
          id: 8,
          title: '음악',
        },
        {
          id: 9,
          title: '게임',
        },
        {
          id: 10,
          title: '쇼핑',
        },
      ],
    })
  }),
]
