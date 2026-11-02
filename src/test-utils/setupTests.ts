import { configure } from "@testing-library/react"
// The same language for dates as the app.
import "@/config/dayjs"

// With all files in parallel the default of 1 second for findBy and waitFor is
// too short on a busy machine.
configure({ asyncUtilTimeout: 3000 })

// jsdom has no matchMedia, which Amsterdam Design System components (e.g. the
// responsive Menu and PageHeader) use. In tests every media query "doesn't match".
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

// jsdom has no modal dialogs. In tests showModal() opens the dialog and close()
// closes it and tells the listeners, like a browser does.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true
  }
  HTMLDialogElement.prototype.close = function () {
    this.open = false
    this.dispatchEvent(new Event("close"))
  }
}
