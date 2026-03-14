import * as React from 'react'
import type { SVGProps } from 'react'

const PlusGradient = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 92 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_2361_14560)">
      <rect
        x="11"
        y="11"
        width="70"
        height="70"
        rx="35"
        fill="white"
        shapeRendering="crispEdges"
      />
      <rect
        x="10.5"
        y="10.5"
        width="71"
        height="71"
        rx="35.5"
        stroke="url(#paint0_linear_2361_14560)"
        shapeRendering="crispEdges"
      />
      <mask
        id="path-3-outside-1_2361_14560"
        maskUnits="userSpaceOnUse"
        x="28"
        y="28"
        width="36"
        height="36"
        fill="black"
      >
        <rect fill="white" x="28" y="28" width="36" height="36" />
        <path d="M46 29C48.2091 29 50 30.7909 50 33V42H59C61.2091 42 63 43.7909 63 46C63 48.2091 61.2091 50 59 50H50V59C50 61.2091 48.2091 63 46 63C43.7909 63 42 61.2091 42 59V50H33C30.7909 50 29 48.2091 29 46C29 43.7909 30.7909 42 33 42H42V33C42 30.7909 43.7909 29 46 29Z" />
      </mask>
      <path
        d="M46 29C48.2091 29 50 30.7909 50 33V42H59C61.2091 42 63 43.7909 63 46C63 48.2091 61.2091 50 59 50H50V59C50 61.2091 48.2091 63 46 63C43.7909 63 42 61.2091 42 59V50H33C30.7909 50 29 48.2091 29 46C29 43.7909 30.7909 42 33 42H42V33C42 30.7909 43.7909 29 46 29Z"
        fill="#CECFF5"
      />
      <path
        d="M50 33H50.5H50ZM50 42H49.5V42.5H50V42ZM59 50V50.5V50ZM50 50V49.5H49.5V50H50ZM42 59H41.5H42ZM42 50H42.5V49.5H42V50ZM33 42V41.5V42ZM42 42V42.5H42.5V42H42ZM46 29V29.5C47.933 29.5 49.5 31.067 49.5 33H50H50.5C50.5 30.5147 48.4853 28.5 46 28.5V29ZM50 33H49.5V42H50H50.5V33H50ZM50 42V42.5H59V42V41.5H50V42ZM59 42V42.5C60.933 42.5 62.5 44.067 62.5 46H63H63.5C63.5 43.5147 61.4853 41.5 59 41.5V42ZM63 46H62.5C62.5 47.933 60.933 49.5 59 49.5V50V50.5C61.4853 50.5 63.5 48.4853 63.5 46H63ZM59 50V49.5H50V50V50.5H59V50ZM50 50H49.5V59H50H50.5V50H50ZM50 59H49.5C49.5 60.933 47.933 62.5 46 62.5V63V63.5C48.4853 63.5 50.5 61.4853 50.5 59H50ZM46 63V62.5C44.067 62.5 42.5 60.933 42.5 59H42H41.5C41.5 61.4853 43.5147 63.5 46 63.5V63ZM42 59H42.5V50H42H41.5V59H42ZM42 50V49.5H33V50V50.5H42V50ZM33 50V49.5C31.067 49.5 29.5 47.933 29.5 46H29H28.5C28.5 48.4853 30.5147 50.5 33 50.5V50ZM29 46H29.5C29.5 44.067 31.067 42.5 33 42.5V42V41.5C30.5147 41.5 28.5 43.5147 28.5 46H29ZM33 42V42.5H42V42V41.5H33V42ZM42 42H42.5V33H42H41.5V42H42ZM42 33H42.5C42.5 31.067 44.067 29.5 46 29.5V29V28.5C43.5147 28.5 41.5 30.5147 41.5 33H42Z"
        fill="#6064DE"
        mask="url(#path-3-outside-1_2361_14560)"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_2361_14560"
        x="0"
        y="0"
        width="92"
        height="92"
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
          result="effect1_dropShadow_2361_14560"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2361_14560"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2361_14560"
        x1="73"
        y1="22"
        x2="21"
        y2="75.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6064DE" />
        <stop offset="0.504808" stopColor="#F1F2FA" />
        <stop offset="1" stopColor="#6064DE" />
      </linearGradient>
    </defs>
  </svg>
)

export default PlusGradient
