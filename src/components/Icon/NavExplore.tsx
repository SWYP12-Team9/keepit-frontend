'use client'

import * as React from 'react'
import type { SVGProps } from 'react'
const SvgNavExplore = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <rect
      width={14}
      height={14}
      x={4}
      y={4}
      stroke="#2C2C2B"
      strokeWidth={2}
      rx={7}
    />
    <path
      fill="#2C2C2B"
      d="M12.698 7.32a1 1 0 0 1 1.47 1.025l-.559 3.762a1 1 0 0 1-.509.73l-3.726 2.04a1 1 0 0 1-1.469-1.024l.559-3.763a1 1 0 0 1 .508-.73zM11 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
    />
  </svg>
)
export default SvgNavExplore
