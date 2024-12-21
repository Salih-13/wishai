'use client';

import React from 'react';
import anncard1 from '../templates/anniversary/anncard1';
import anncard2 from '../templates/anniversary/anncard2';
import BdayCard1 from '../templates/birthday/BdayCard1';
import BdayCard2 from '../templates/birthday/BdayCard2';
import ValCard1 from '../templates/valentines/ValCard1';
import ValCard2 from '../templates/valentines/ValCard2';

const cardTemplates = [
  {
    id: 'birthday-card-1',
    component: <BdayCard1 />,
    tags: ['birthday'],
  },
  {
    id: 'birthday-card-2',
    component: <BdayCard2 />,
    tags: ['birthday'],
  },
  {
    id: 'valentines-card-1',
    component: <ValCard1 />,
    tags: ['valentines'],
  },
  {
    id: 'valentines-card-2',
    component: <ValCard2 />,
    tags: ['valentines'],
  },
];

export default cardTemplates;
