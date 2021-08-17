import { Value, WrappedValue, ValueNode } from "../Table"

const isWrappedValue = (valueNode: ValueNode): valueNode is WrappedValue => valueNode != null && valueNode.hasOwnProperty("value") && valueNode.hasOwnProperty("node")

const getValueNode = (valueNode: ValueNode, key: "value" | "node"): Value | ValueNode => {
  if (valueNode == null) return undefined
  const t = typeof valueNode
  if (t === "boolean") return valueNode as boolean
  if (t === "number") return valueNode as number
  if (t === "string") return valueNode as string
  if (isWrappedValue(valueNode)) return valueNode[key]
  if (key === "value") return undefined
  return valueNode
}

export const getValue = (valueNode: ValueNode): Value => getValueNode(valueNode, "value") as Value
export const getNode = (valueNode: ValueNode): React.ReactNode => getValueNode(valueNode, "node")
