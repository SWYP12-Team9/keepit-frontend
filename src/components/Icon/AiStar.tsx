import * as React from 'react'
import type { SVGProps } from 'react'
const SvgAiStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_2361_14466)">
      <rect
        x="10"
        y="10"
        width="70"
        height="70"
        rx="35"
        fill="white"
        shapeRendering="crispEdges"
      />
      <rect
        x="10.5"
        y="10.5"
        width="69"
        height="69"
        rx="34.5"
        stroke="url(#paint0_linear_2361_14466)"
        shapeRendering="crispEdges"
      />
      <path
        d="M45 26L47.7638 33.4545C49.2511 37.466 52.3806 40.6515 56.3651 42.2098L63.5 45L56.3651 47.7902C52.3806 49.3485 49.2511 52.534 47.7638 56.5455L45 64L42.2362 56.5455C40.7489 52.534 37.6194 49.3485 33.6349 47.7902L26.5 45L33.6349 42.2098C37.6194 40.6515 40.7489 37.466 42.2362 33.4545L45 26Z"
        fill="url(#paint1_linear_2361_14466)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_2361_14466"
        x="0"
        y="0"
        width="90"
        height="90"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.90364 0 0 0 0 0.90364 0 0 0 0 0.90364 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2361_14466"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2361_14466"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2361_14466"
        x1="72.75"
        y1="73.75"
        x2="19.25"
        y2="21.75"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6064DE" />
        <stop offset="0.504808" stopColor="#F1F2FA" />
        <stop offset="1" stopColor="#6064DE" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2361_14466"
        x1="45"
        y1="26"
        x2="45"
        y2="64"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F1F2FA" />
        <stop offset="1" stopColor="#6064DE" />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgAiStar
