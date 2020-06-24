import React from "react"
import { mount } from "enzyme"

import TableCell from "./components/TableCell/TableCell"
import Table from "./Table"
import SmallSkeleton from "../../atoms/Skeleton/SmallSkeleton"

describe("Table", () => {
  const columns = ["column1", "column2"]
  const data = [
    ["foo", "bar"],
    ["zoo", "baz"]
  ]

  describe("when NOT loading", () => {
    it("should render 4 table cells", () => {
      const component = mount(<Table data={data} columns={columns} />)
      expect(component.find(TableCell).length).toEqual(4)
    })

    describe("when given fixedColumnWidth", () => {
      it("should pass fixedColumnWidth to the last column", () => {
        const component = mount(<Table data={data} columns={columns} fixedColumnWidth="100px" />)
        const cells = component.find("[fixedWidth]")

        expect(cells.length).toEqual(3)

        expect(cells.at(0).prop("fixedWidth")).toEqual("100px")
        expect(cells.at(0).text()).toEqual("column2")

        expect(cells.at(1).prop("fixedWidth")).toEqual("100px")
        expect(cells.at(1).text()).toEqual("bar")

        expect(cells.at(2).prop("fixedWidth")).toEqual("100px")
        expect(cells.at(2).text()).toEqual("baz")
      })
    })
  })

  describe("when loading", () => {
    it("should render 30 SmallSkeletons", () => {
      const component = mount(<Table data={data} columns={columns} loading={true} />)
      // 15 * 2 = numLoadingRows * numColumns
      expect(component.find(SmallSkeleton).length).toEqual(30)
    })

    describe("when given fixedColumnWidth", () => {
      it("should NOT pass the fixedColumnWidth to the last column", () => {
        const component = mount(<Table data={data} columns={columns} fixedColumnWidth="100px" loading={true} />)
        const cells = component.find("[fixedWidth]")

        expect(cells.length).toEqual(0)
      })
    })
  })
})
