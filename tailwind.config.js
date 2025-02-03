/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-cyan': '#00354b',
        yellow: '#ffc107',
        primary: '#007bff',
        'off-white': '#f7f8f9',
        'dark-blue': '#01567f',
        'green-success': '#52c41a',
        'dark-blue-02': '#01567f05',
        'light-blue': '#8db5dd'
      },
      boxShadow: {
        'dark-blue': '0 0 0 1px #01567f',
        error: '0 0 0 1px #ff4d4f'
      },
      width: {
        1200: '1200px'
      },
      maxWidth: {
        1200: '1200px'
      },
      maxHeight: {
        380: '380px'
      },
      screens: {
        xs: '480px'
      },
      willChange: {
        opacity: 'opacity'
      },
      keyframes: {
        pulsate: {
          '0%': {
            transform: 'scale(0.1)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(1.2)'
          }
        },
        aniName: {
          '0%': {
            left: '0px'
          },

          '50%': {
            left: '3%'
          },

          '100%': {
            left: '0px'
          }
        },
        shine: {
          '100%': {
            left: '125%'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        pulsate: 'pulsate 1s ease-out infinite',
        aniName: 'aniName 3s infinite',
        shine: 'shine 1.1s',
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-in-out'
      },
      backgroundImage: {
        fire: "url('@/assets/images/fire.png')",
        'big-banner-sale': "url('@/assets/images/bg_banner_big.webp')"
      }
    }
  },
  plugins: [
    tailwindcssAnimate,
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          '::-webkit-scrollbar': {
            width: '4px',
            height: '4px'
          }
        },
        '.scrollbar-thumb': {
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#01567f',
            borderRadius: '10px'
          }
        },
        '.scrollbar-track': {
          '::-webkit-scrollbar-track': {
            backgroundColor: '#ccc',
            borderRadius: '10px'
          }
        },
        '.scrollbar-thumb:hover': {
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00354b'
          }
        }
      })
    }
  ]
}
