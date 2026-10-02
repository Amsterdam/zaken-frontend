import { createContext, useEffect, type ReactNode } from "react"

import { useFlashMessagesReducer } from "./hooks/useFlashMessagesReducer"
import { registerFlashMessageBridge } from "./flashMessageBridge"

export type Context = ReturnType<typeof useFlashMessagesReducer>
export const FlashMessageContext = createContext<Context | undefined>(undefined)

const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const value = useFlashMessagesReducer()
  const { addErrorFlashMessage } = value

  useEffect(
    () => registerFlashMessageBridge(addErrorFlashMessage),
    [addErrorFlashMessage],
  )

  return (
    <FlashMessageContext.Provider value={value}>
      {children}
    </FlashMessageContext.Provider>
  )
}
export default FlashMessageProvider
