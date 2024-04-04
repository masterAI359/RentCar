/** @type {import('tailwindcss').Config} */


import {addDynamicIconSelectors} from '@iconify/tailwind'


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          "url('/Users/jeevan/copy/Rent a drive/client/src/pages/admin/data/welcome-bg.svg')",
      }
    },
   
  },
  plugins: [
    addDynamicIconSelectors()
  ],
}
