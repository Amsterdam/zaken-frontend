import { ValueNodes, DataIndex } from "../Table"
import { Sorter } from "./sorters"
import { getValue } from "./getValue"
import getValueNode from "./indexValueNode"

export default (index: DataIndex, sorter: Sorter) =>
  (as: ValueNodes, bs: ValueNodes) => {
    const a = getValueNode(as, index)
    const b = getValueNode(bs, index)
    const aValue = getValue(a)
    const bValue = getValue(b)
    if (bValue == null) return 1
    if (aValue == null) return -1
    return sorter(aValue, bValue)
  }
