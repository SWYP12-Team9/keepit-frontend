import { requestGetHome } from '../apis/request/requestGetHome'

export default async function Home() {
  const data = await requestGetHome()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button className="rounded bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-600">
        Tailwind Button Test
      </button>

      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
