import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet';

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
});

export { customTheme };
