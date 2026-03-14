import React from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-full pt-24 pb-16 md:pt-84 md:pb-24">{children}</div>
}
