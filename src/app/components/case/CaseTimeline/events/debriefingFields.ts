import { displayDate } from '@amsterdam/wonen-ui';
import { debriefViolationMap } from '../helpers/dictionaries';

export default [
  {
    key: 'date_added',
    mapValue: (v: string) => displayDate(v),
  },
  'author',
  {
    key: 'violation',
    mapValue: (v: keyof typeof debriefViolationMap) => debriefViolationMap[v],
  },
  {
    key: 'feedback',
    italic: true,
  },
];
