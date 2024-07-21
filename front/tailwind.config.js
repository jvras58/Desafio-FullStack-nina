/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      fontSize: {
        'h1': ['48px', '64px'],
        'h2': ['32px', '48px'],
        'h3': ['28px', '40px'],
        'h4': ['24px', '32px'],
        'body1': ['18px', '28px'],
        'body2': ['16px', '28px'],
        'legend1': ['14px', '28px'],
        'legend2': ['12px', '21px']
      },
      colors: {
        primary: {
          DEFAULT: '#5B43D9',
          medium: '#8B86F2',
          light: '#C9BEFF',
          extralight: '#F1ECFF',
        },
        black: {
          1: '#050505',
          2: '#313131',
          3: '#515151',
          4: '#F1ECFF',
          absolute: '#000000',
        },
        gray: {
          1: '#89888E',
          2: '#B6B5BB',
          3: '#E9E8EB',
          4: '#F8F8F8',
        },
        white: {
          absolute: '#FFFFFF',
        } 
      }
    },
  },
  plugins: [
  ]

}
