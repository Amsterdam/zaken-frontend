import { Value, ValueNode, ValueNodes, DataIndex } from "../Table"
import { Sorter } from "./sorters"

const getValue = (valueNode: ValueNode): Value => {
  if (valueNode == null) return valueNode
  if (["boolean", "number", "string"].includes(typeof valueNode)) return valueNode as Value
  if (valueNode.hasOwnProperty("value")) return (valueNode as { value: Value }).value
}

const getValueNode = (valueNodes: ValueNodes, dataIndex: DataIndex) => {
  if (Array.isArray(valueNodes) && typeof dataIndex === "number") return valueNodes[dataIndex]
  if (typeof dataIndex === "string") return (valueNodes as Record<string, ValueNode>)[dataIndex]
}

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
