type CardTemplate = {
    id: string;
    component: React.ComponentType;
    tags: string[];
  };
  
  import bdaycard1 from '../cards/birthday/bdaycard1';
  import bdaycard2 from '../cards/birthday/bdaycard2';
  import bdaycard1 from '../cards/birthday/bdaycard1';
  import bdaycard1 from '../cards/birthday/bdaycard1';
  import bdaycard1 from '../cards/birthday/bdaycard1';
  import bdaycard1 from '../cards/birthday/bdaycard1';
  
  export const cardTemplates: CardTemplate[] = [
    {
      id: 'birthday-card-1',
      component: bdaycard1,
      tags: ['birthday'],
    },
    {
      id: 'birthday-card-2',
      component: bdaycard2,
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
  