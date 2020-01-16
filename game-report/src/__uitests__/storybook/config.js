import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/opponent.jsx');
}

configure(loadStories, module);