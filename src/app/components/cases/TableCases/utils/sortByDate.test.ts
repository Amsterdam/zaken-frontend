import sortByDate from './sortByDate';

describe('sortByDate', () => {
  it('one item', () => {
    expect(['2021-04-07'].sort(sortByDate())).toEqual(['2021-04-07']);
  });

  it('one item, descending', () => {
    expect(['2021-04-07'].sort(sortByDate('DESC'))).toEqual(['2021-04-07']);
  });

  it('two items', () => {
    expect(['2021-04-08', '2021-04-07'].sort(sortByDate())).toEqual(['2021-04-07', '2021-04-08']);
  });

  it('two items, descending', () => {
    expect(['2021-04-07', '2021-04-08'].sort(sortByDate('DESC'))).toEqual(['2021-04-08', '2021-04-07']);
  });

  it('three items', () => {
    expect(['2021-04-08', '2021-04-07', '2021-04-09'].sort(sortByDate())).toEqual(['2021-04-07', '2021-04-08', '2021-04-09']);
  });

  it('three items, descending', () => {
    expect(['2021-04-08', '2021-04-07', '2021-04-09'].sort(sortByDate('DESC'))).toEqual(['2021-04-09', '2021-04-08', '2021-04-07']);
  });
});
