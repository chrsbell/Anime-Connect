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
      brand: '#ED6F00',
      control: '#ED6F00',
      focus: '#FFED00',
      'accent-1': '#9fd4c9',
      'accent-2': '#d5d848',
      'dark-1': '#000001',
      'dark-2': '#646569',
      'neutral-1': '#646569',
      'neutral-2': '#004876',
      'neutral-3': '#004876',
      'status-critical': '#dd3000',
      'status-warning': '#f0c954',
      'status-ok': '#008375',
      'status-unknown': '#C3C5C8',
      'status-disabled': '#C3C5C8',
    },
  },
  anchor: {
    color: {
      dark: 'brand',
      light: '#000000',
    },
  },
});

export { customTheme };
