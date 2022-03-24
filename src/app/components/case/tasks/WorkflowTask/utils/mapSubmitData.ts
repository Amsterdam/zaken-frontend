import { appendTimeToDate } from 'app/components/shared/Helpers/helpers';

// type Rec = Record<string, { value: string | number | boolean }>

const castValue = (item: any, value: any) => {
  if (item.type === 'select') return value.value !== '' ? value.value : null;
  if (item.type === 'checkbox') return !!(value ?? false);
  if (item.camunda_type === 'Long') return parseFloat(value);
  if (item.is_date) return appendTimeToDate(value);
  return value;
};

export default (form: Components.Schemas.CaseUserTaskWorkdflow['form'], data: any) => form.reduce((acc: any, item: any) => {
  const key = item.name;
  const value = castValue(item, data[key]);
  if (value != null) acc[key] = { value };
  return acc;
}, {});
