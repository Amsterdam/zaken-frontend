import { useState } from "react"
import { fireEvent, render } from "@testing-library/react"
// import { describe, it, expect, afterEach, beforeEach } from "vitest"
import { Tab, Tabs } from "."

describe("Tabs", () => {
  const consoleOutput: string[] = []
  const originalWarning = console.warn
  const mockedWarn = (output: string) => consoleOutput.push(output)
  beforeEach(() => {
    console.warn = mockedWarn
  })
  afterEach(() => {
    console.warn = originalWarning
  })
  it("should render the labels and contents of the tabs", () => {
    const { container } = render(
      <Tabs label="An example of tabs">
        <Tab id="one" label="First">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
      </Tabs>
    )

    const tabOne = container.querySelector("#tab-one")
    const tabTwo = container.querySelector("#tab-two")
    const tabPanelOne = container.querySelector("#panel-one")
    const tabPanelTwo = container.querySelector("#panel-two")

    expect(tabOne?.textContent).toContain("First")
    expect(tabTwo?.textContent).toContain("Second")
    expect(tabPanelOne?.textContent).toContain("Contents of the first tab.")
    expect(tabPanelTwo?.textContent).toContain("Contents of the second tab.")
  })

  it("should set up aria attributes and associate the tab buttons with the tab panels", () => {
    const { container, getByRole } = render(
      <Tabs label="An example of tabs">
        <Tab id="one" label="First">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
      </Tabs>
    )

    expect(getByRole("tablist").getAttribute("aria-label")).toBe("An example of tabs")

    const tabOne = container.querySelector("#tab-one")
    const tabTwo = container.querySelector("#tab-two")
    const tabPanelOne = container.querySelector("#panel-one")
    const tabPanelTwo = container.querySelector("#panel-two")

    expect(tabOne?.getAttribute("role")).toBe("tab")
    expect(tabOne?.getAttribute("aria-controls")).toBe("panel-one")

    expect(tabTwo?.getAttribute("role")).toBe("tab")
    expect(tabTwo?.getAttribute("aria-controls")).toBe("panel-two")

    expect(tabPanelOne?.getAttribute("role")).toBe("tabpanel")
    expect(tabPanelOne?.getAttribute("aria-labelledby")).toBe("tab-one")

    expect(tabPanelTwo?.getAttribute("role")).toBe("tabpanel")
    expect(tabPanelTwo?.getAttribute("aria-labelledby")).toBe("tab-two")
  })

  it("should select a tab when clicked", () => {
    const { container } = render(
      <Tabs label="An example of tabs">
        <Tab id="one" label="First">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
      </Tabs>
    )

    const tabOne = container.querySelector("#tab-one")
    const tabTwo = container.querySelector("#tab-two")
    const tabPanelOne = container.querySelector("#panel-one")
    const tabPanelTwo = container.querySelector("#panel-two")

    expect(tabOne?.getAttribute("aria-selected")).toBe("true")
    expect(tabOne?.getAttribute("tabindex")).toBe("0")

    expect(tabTwo?.getAttribute("aria-selected")).toBe("false")
    expect(tabTwo?.getAttribute("tabindex")).toBe("-1")

    expect(tabPanelOne?.hasAttribute("hidden")).toBeFalsy()
    expect(tabPanelTwo?.hasAttribute("hidden")).toBeTruthy()

    if (tabTwo) {
      fireEvent.click(tabTwo)
    }

    expect(tabOne?.getAttribute("aria-selected")).toBe("false")
    expect(tabOne?.getAttribute("tabindex")).toBe("-1")

    expect(tabTwo?.getAttribute("aria-selected")).toBe("true")
    expect(tabTwo?.getAttribute("tabindex")).toBe("0")

    expect(tabPanelOne?.hasAttribute("hidden")).toBeTruthy()
    expect(tabPanelTwo?.hasAttribute("hidden")).toBeFalsy()
  })

  it("should have tab panels reachable by keyboard navigation", () => {
    const { container } = render(
      <Tabs label="An example of tabs">
        <Tab id="one" label="First">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
      </Tabs>
    )

    const tabPanelOne = container.querySelector("#panel-one")
    const tabPanelTwo = container.querySelector("#panel-two")

    expect(tabPanelOne?.getAttribute("tabindex")).toBe("0")
    expect(tabPanelTwo?.getAttribute("tabindex")).toBe("0")
  })

  it("should forward the onClick event on the Tab", () => {
    const onClick = vi.fn()
    const { container } = render(
      <Tabs label="An example of tabs">
        <Tab id="one" label="First" onClick={onClick}>
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
      </Tabs>
    )

    const tabOne = container.querySelector("#tab-one")

    if (tabOne) {
      fireEvent.click(tabOne)
    }

    expect(onClick).toHaveBeenCalled()
  })

  it("should forward props to the Tab", () => {
    const { container } = render(
      <Tabs label="An example of tabs">
        <Tab id="one" label="First" title="foo">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
      </Tabs>
    )

    expect(container.querySelector("#tab-one")?.getAttribute("title")).toBe("foo")
  })

  it("should be able to set the active initial tab", () => {
    const { container } = render(
      <Tabs label="An example of tabs" activeTab="three">
        <Tab id="one" label="First">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
        <Tab id="three" label="Third">
          Contents of the third tab.
        </Tab>
      </Tabs>
    )

    expect(container.querySelector("#tab-three")?.getAttribute("tabindex")).toBe("0")
  })

  it("should log a warning and set the active tab to the first when passing a wrong activeTab", () => {
    const { container } = render(
      <Tabs label="An example of tabs" activeTab="foo">
        <Tab id="one" label="First">
          Contents of the first tab.
        </Tab>
        <Tab id="two" label="Second">
          Contents of the second tab.
        </Tab>
        <Tab id="three" label="Third">
          Contents of the third tab.
        </Tab>
      </Tabs>
    )

    expect(container.querySelector("#tab-one")?.getAttribute("tabindex")).toBe("0")

    expect(consoleOutput).toEqual([
      "You passed a wrong activeTab value to Tabs component. Given ID: foo"
    ])
  })

  it("should change the active tab when the activeTab prop changes", () => {
    function Wrapper() {
      const [activeTab, setActiveTab] = useState("two")
      return (
        <>
          <Tabs label="An example of tabs" activeTab={activeTab}>
            <Tab id="one" label="First">
              Contents of the first tab.
            </Tab>
            <Tab id="two" label="Second">
              Contents of the second tab.
            </Tab>
            <Tab id="three" label="Third">
              Contents of the third tab.
            </Tab>
          </Tabs>
          <button
            type="button"
            data-testid="button"
            onClick={() => setActiveTab("three")}
          >
            Programmically change the active tab to the third tab
          </button>
        </>
      )
    }
    const { container, getByTestId } = render(<Wrapper />)

    expect(container.querySelector("#tab-two")?.getAttribute("tabindex")).toBe("0")
    expect(container.querySelector("#tab-three")?.getAttribute("tabindex")).toBe("-1")
    fireEvent.click(getByTestId("button"))
    expect(container.querySelector("#tab-two")?.getAttribute("tabindex")).toBe("-1")
    expect(container.querySelector("#tab-three")?.getAttribute("tabindex")).toBe("0")
  })
})
