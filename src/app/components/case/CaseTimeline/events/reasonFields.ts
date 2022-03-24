import { displayDate } from '@amsterdam/wonen-ui';

export default [
  {
    key: 'start_date',
    mapValue: (v: string) => displayDate(v),
  },
  'author',
  'reason',
  {
    key: 'description',
    italic: true,
  },
];
