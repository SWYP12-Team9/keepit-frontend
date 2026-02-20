import React from 'react'

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex h-full flex-col pt-16 md:pt-36">{children}</div>
}
