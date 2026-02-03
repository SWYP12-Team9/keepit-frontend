export default function Home() {
  return (
    <div className="bg-gray-white min-h-screen space-y-10 p-10">
      <section className="space-y-4">
        <h1 className="text-gray-default border-gray-stroke border-b pb-2 font-bold">
          1. Typography Test
        </h1>
        <p className="text-display-1 text-gray-default">Display 1 (60px)</p>
        <p className="text-heading-1 text-gray-default">Heading 1 (36px)</p>
        <p className="text-body-1 text-gray-default">Body 1 (16px, Semibold)</p>
        <p className="text-caption-1 text-gray-muted">
          Caption 1 (12px, Medium)
        </p>
      </section>

      <section className="space-y-4">
        <h1 className="text-gray-default border-gray-stroke border-b pb-2 font-bold">
          2. Color & Interaction Test
        </h1>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-normal text-body-2 hover:bg-blue-normal-hover active:bg-blue-normal-active rounded px-6 py-2 text-white transition-colors">
            blue Normal Button
          </button>

          <button className="bg-blue-light text-blue-dark text-body-2 hover:bg-blue-light-hover rounded px-6 py-2">
            blue Light Button
          </button>

          <div className="bg-gray-box border-gray-stroke text-gray-default text-body-2 rounded border px-6 py-2">
            Gray Box / Stroke
          </div>
        </div>
      </section>
    </div>
  )
}
