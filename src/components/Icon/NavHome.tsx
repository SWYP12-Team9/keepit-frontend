'use client'

import * as React from 'react'
import type { SVGProps } from 'react'
const SvgNavHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      stroke="#000"
      strokeWidth={2}
      d="M9.651 5.232a2 2 0 0 1 2.698 0l5 4.566A2 2 0 0 1 18 11.274V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4.725a2 2 0 0 1 .651-1.477z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.667 14.5h4.666"
    />
  </svg>
)
export default SvgNavHome
