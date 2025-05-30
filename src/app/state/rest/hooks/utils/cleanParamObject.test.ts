import { describe, it, expect } from "vitest"
import { cleanParamObject } from "./cleanParamObject"

describe("cleanParamObject", () => {
  it("should remove keys with undefined, null, or empty string values", () => {
    const input = {
      key1: "value1",
      key2: undefined,
      key3: null,
      key4: "",
      key5: 0,
      key6: false,
      key7: "value7"
    }

    const expectedOutput = {
      key1: "value1",
      key5: 0,
      key6: false,
      key7: "value7"
    }

    expect(cleanParamObject(input)).toEqual(expectedOutput)
  })

  it("should return an empty object if all values are undefined, null, or empty strings", () => {
    const input = {
      key1: undefined,
      key2: null,
      key3: ""
    }

    const expectedOutput = {}

    expect(cleanParamObject(input)).toEqual(expectedOutput)
  })

  it("should return the same object if no values are undefined, null, or empty strings", () => {
    const input = {
      key1: "value1",
      key2: 42,
      key3: true
    }

    const expectedOutput = {
      key1: "value1",
      key2: 42,
      key3: true
    }

    expect(cleanParamObject(input)).toEqual(expectedOutput)
  })

  it("should handle an empty object", () => {
    const input = {}
    const expectedOutput = {}

    expect(cleanParamObject(input)).toEqual(expectedOutput)
  })
})
