'use client'

import * as React from 'react'
import type { SVGProps } from 'react'
const SvgNavMypage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <rect
      width={5}
      height={5}
      x={8.5}
      y={4}
      stroke="#2C2C2B"
      strokeWidth={2}
      rx={2.5}
    />
    <path
      stroke="#2C2C2B"
      strokeWidth={2}
      d="M11 12c-3.47 0-6.352 2.165-6.904 5.006-.106.542.352.994.904.994h12c.552 0 1.01-.452.904-.994C17.352 14.166 14.471 12 11 12Z"
    />
  </svg>
)
export default SvgNavMypage
