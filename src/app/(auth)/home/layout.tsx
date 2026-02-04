import React from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-full pt-84 pb-24">{children}</div>
}
