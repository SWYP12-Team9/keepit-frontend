import { MyLinkCard } from '@/src/components/LinkCard/MyLinkCard'
import { OtherLinkCard } from '@/src/components/LinkCard/OtherLinkCard'

const MOCK_MY_DATA_LIST = [
  {
    id: 1,
    references: {
      id: 10,
      title: '디자인 시스템',
      colorCode: '#FF5733',
      isDefault: false,
    },

    title:
      '픽셀에서 문자까지: GitHub Copilot CLI의 애니메이션 ASCII 배너를 구현한 엔지니어링',
    url: 'https://example.com/article1',
    aiSummary:
      'GitHub Copilot CLI의 애니메이션 ASCII 배너가 어떻게 구현되었는지 공학적인 관점에서 상세히 설명합니다.',
    status: 'READ' as const,
    viewCount: 128,
  },
  {
    id: 2,
    references: {
      id: 11,
      title: '프론트엔드',
      colorCode: '#5C6CFF',
      isDefault: false,
    },
    title: 'Next.js 캐싱 전략 완벽 가이드',
    url: 'https://example.com/article2',
    aiSummary:
      'Next.js 14 버전 이후의 캐싱 메커니즘을 이해하고 성능을 최적화하는 방법을 다룹니다.',
    status: 'UNREAD' as const,
    viewCount: 5,
  },
]

const MOCK_OTHER_DATA = {
  id: 1,
  url: 'https://example.com/article',
  title: '성장하는 개발자가 되기 위한 5가지 습관',
  aiSummary:
    '지속적인 성장을 위해 프론트엔드 엔지니어가 가져야 할 학습 태도와 구체적인 실천 방안을 제시합니다.',
  category: '커리어/자기계발',
  user: {
    userId: 1,
    nickname: '스위프',
    profileImageUrl: '/profile.png',
  },
}

export default function LinkCardTest() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-10">
      <div className="flex flex-row flex-wrap justify-center gap-6">
        {MOCK_MY_DATA_LIST.map((data) => (
          <MyLinkCard key={data.id} data={data} />
        ))}

        <OtherLinkCard data={MOCK_OTHER_DATA} />
      </div>
    </div>
  )
}
