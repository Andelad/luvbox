// Add the questions content here
export interface DealbreakerQuestion {
    id: string;
    text: string;
  }
  
  export const dealbreakersQuestions: DealbreakerQuestion[] = [
    {
      id: 'honesty',
      text: 'How important is complete honesty and transparency in your relationship?'
    },
    {
      id: 'independence',
      text: 'How important is maintaining your independence and personal space?'
    },
    {
      id: 'communication',
      text: 'How important is regular, open communication about feelings and needs?'
    },
    {
      id: 'values',
      text: 'How important is sharing similar core values and life goals?'
    },
    {
      id: 'intimacy',
      text: 'How important is physical intimacy and affection in your relationship?'
    },
    {
      id: 'trust',
      text: 'How important is being able to trust your partner completely?'
    },
    {
      id: 'growth',
      text: 'How important is personal growth and supporting each other\'s ambitions?'
    }
  ];