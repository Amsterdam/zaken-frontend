import { useMemo } from 'react';
import { Fields } from 'app/components/shared/Form/ScaffoldFields';

type Scaffold = (...data: any[]) => { fields: Fields }
export default <T extends Scaffold>(scaffold: T, ...params: Parameters<T>) => useMemo(
  () => (params.length === 0 || !params.includes(undefined) ? scaffold(...params) : undefined),
  [scaffold, params],
);
