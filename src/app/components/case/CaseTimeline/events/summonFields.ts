import { displayDate } from '@amsterdam/wonen-ui';

export default [
  {
    key: 'date_added',
    mapValue: (v: string) => displayDate(v),
    shouldShow: (value: any, isNested: boolean) => !isNested,
  },
  'author',
  'type',
  'persons',
  {
    key: 'description',
    italic: true,
  },
];
