import React from "react";
import Opponent from '../../opponent';
import { storiesOf } from '@storybook/react';
//import { withKnobs, text, boolean } from '@storybook/addon-knobs';

const buttonClicked = () => {
  alert('Button Clicked');
}

const stories = storiesOf('Button with knobs', module);
stories.addDecorator(withKnobs);

stories.add('Renders button with knobs for props', () => {
  return (
    <div className='container'>
      <Opponent
      />
    </div>
  );
})

