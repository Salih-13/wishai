type CardTemplate = {
    id: string;
    component: React.ComponentType;
    tags: string[];
  };
  
  import { BirthdayCard1, BirthdayCard2 } from './birthday';
  import { ValentinesCard1, ValentinesCard2 } from './valentines';
  import { AnniversaryCard1, AnniversaryCard2 } from './anniversary';
  
  export const cardTemplates: CardTemplate[] = [
    {
      id: 'birthday-card-1',
      component: BirthdayCard1,
      tags: ['birthday'],
    },
    {
      id: 'birthday-card-2',
      component: BirthdayCard2,
      tags: ['birthday'],
    },
    {
      id: 'valentines-card-1',
      component: ValentinesCard1,
      tags: ['valentines'],
    },
    {
      id: 'valentines-card-2',
      component: ValentinesCard2,
      tags: ['valentines'],
    },
    {
      id: 'anniversary-card-1',
      component: AnniversaryCard1,
      tags: ['anniversary'],
    },
    {
      id: 'anniversary-card-2',
      component: AnniversaryCard2,
      tags: ['anniversary'],
    },
  ];
  