import type { Config } from 'tailwindcss'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pxToRem = require('tailwindcss-preset-px-to-rem')

const tailwindConfig: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  presets: [pxToRem],
  theme: {
    fontFamily: {
      sans: ['var(--font-pretendard)', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: {
          light: {
            DEFAULT: '#eff0fc',
            hover: '#e7e8fa',
            active: '#cecff5',
          },
          normal: {
            DEFAULT: '#6064de',
            hover: '#565ac8',
            active: '#4d50b2',
          },
          dark: {
            DEFAULT: '#484ba7',
            hover: '#3A3C85',
          },
        },
        gray: {
          white: '#ffffff',
          field: '#fafafa',
          box: '#f6f6f9',
          stroke: '#f3f3f3',
          muted: '#bebebe',
          disabled: '#5f5e5b',
          default: '#2c2c2b',
          black: '#000000',
        },
      },
      fontSize: {
        'display-1': ['60px', { lineHeight: '72px', fontWeight: '700' }],
        'display-2': ['48px', { lineHeight: '60px', fontWeight: '700' }],
        'heading-1': ['36px', { lineHeight: '48px', fontWeight: '700' }],
        'heading-2': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'heading-3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        body: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body-0': ['18px', { lineHeight: '24px', fontWeight: '500' }],
        'body-1': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'body-2': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-3': ['14px', { lineHeight: '22px', fontWeight: '600' }],
        'body-4': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        'caption-1': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'caption-2': ['11px', { lineHeight: '16px', fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
