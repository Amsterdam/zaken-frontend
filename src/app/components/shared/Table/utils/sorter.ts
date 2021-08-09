export type Sorter = (a: any, b: any) => number
export const invertedSorter: (sorter: Sorter) => Sorter = (sorter) => (a, b) => sorter(a, b) * -1