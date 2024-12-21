// 'use client';

import React from 'react';
import BdayCard1 from '../cards/birthday/bdaycard1';
import BdayCard2 from '../cards/birthday/bdaycard2';
import AnnCard1 from '../cards/anniversary/anncard1';
import AnnCard2 from '../cards/anniversary/anncard2';
import ValCard1 from '../cards/valentines/valcard1';
import ValCard2 from '../cards/valentines/valcard2';

type CardTemplate = {
  id: string;
  component: React.ComponentType;
  tags: string[];
};

export const cardTemplates: CardTemplate[] = [
  {
    id: 'birthday-card-1',
    component: BdayCard1,
    tags: ['birthday'],
  },
  {
    id: 'birthday-card-2',
    component: BdayCard2,
    tags: ['birthday'],
  },
  {
    id: 'anniversary-card-1',
    component: AnnCard1,
    tags: ['anniversary'],
  },
  {
    id: 'anniversary-card-2',
    component: AnnCard2,
    tags: ['anniversary'],
  },
  {
    id: 'valentines-card-1',
    component: ValCard1,
    tags: ['valentines'],
  },
  {
    id: 'valentines-card-2',
    component: ValCard2,
    tags: ['valentines'],
  },
];
