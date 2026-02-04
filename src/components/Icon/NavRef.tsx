'use client'

import * as React from 'react'
import type { SVGProps } from 'react'
const SvgNavRef = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      stroke="#2C2C2B"
      strokeWidth={2}
      d="M18 9a1 1 0 0 0-1-1h-3.532a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2z"
    />
    <path
      stroke="#2C2C2B"
      strokeLinecap="round"
      strokeWidth={2}
      d="M14.5 13.5H12"
    />
  </svg>
)
export default SvgNavRef
