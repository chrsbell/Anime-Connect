import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet';
import { deepFreeze } from 'grommet/utils';

// const customTheme = deepFreeze({});

// const customTheme = deepFreeze({
//   global: {
//     colors: {
//       brand: '#570296',
//       focus: '#831187',
//       placeholder: '#ef9af2',
//       selected: '#240c76',
//       'neutral-1': 'rgb(99,0,115)',
//       'neutral-2': 'rgb(198,6,115)',
//       'neutral-3': 'rgb(247,13,115)',
//       'neutral-4': '#rgb(99,0,115)',
//       'status-critical': '#F72975',
//       'status-error': 'rgb(249,144,32)',
//       'status-ok': 'rgb(140,29,255)',
//     },
//   },
// });

const customTheme = deepMerge(grommet, {
  diagram: {
    extend: `@keyframes
  draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  path {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: draw 2s linear both;
  }`,
  },
  global: {
    colors: {
      brand: '#01a982',
      focus: '#2AD2C9',
      'accent-1': '#2AD2C9',
      'accent-2': '#614767',
      'accent-3': '#ff8d6d',
      'neutral-1': '#425563',
      'neutral-2': '#5F7A76',
      'neutral-3': '#80746E',
      'neutral-4': '#767676',
      'status-critical': '#F04953',
      'status-error': '#F04953',
      'status-warning': '#FFD144',
      'status-ok': '#01a982',
    },
  },
  anchor: {
    textDecoration: 'none',
    color: {
      dark: '#FFFFFF',
      light: '#000000',
    },
  },
  button: {
    border: {
      radius: '10px',
    },
  },
  clock: {
    analog: {
      second: {
        color: {
          dark: '#01a982',
          light: '#01a982',
        },
      },
    },
  },
});

export { customTheme };
