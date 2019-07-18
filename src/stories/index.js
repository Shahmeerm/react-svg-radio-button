import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import ReactRadio from './../components/ReactRadio'


//onChange={action('onChange')}

  storiesOf('ReactAnimatedRadio', module)
    .add('Default', () => <ReactRadio />)
    .add('Custom Size', () => 
      <>
        <ReactRadio width={40}  />
        <ReactRadio width={80}  />
        <ReactRadio width={120}  />
        <ReactRadio width={160}  />
      </>
    )
    .add('Custom Colors', () => 
      <>
        <ReactRadio  trueColor={'#00ADEF'} checked = { false } falseColor={'#EC115E'}  />
        <ReactRadio  trueColor={'#67FCF1'} checked = { true } falseColor={'#FF652F'} />
        <ReactRadio  trueColor={'#0677A1'} checked = { false } falseColor={'#895061'}  baseColor={'#59243B'}/>
        <ReactRadio  trueColor={'#529110'} checked = { true } falseColor={'#CFCD2F'}  baseColor={'#1E2505'}/>
      </>
    )

