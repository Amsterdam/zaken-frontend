import React from "react"
import { shallow } from "enzyme"

import ApiProvider, { ApiContext } from "./ApiProvider"

describe("ApiProvider", () => {
  it("should render an ApiContext.Provider", () => {
      const component = shallow(<ApiProvider />)
      expect(component.find(ApiContext.Provider).exists()).toEqual(true)
  })
})
