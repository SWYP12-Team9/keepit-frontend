import React from 'react'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-full px-84 pt-84">{children}</div>
}
