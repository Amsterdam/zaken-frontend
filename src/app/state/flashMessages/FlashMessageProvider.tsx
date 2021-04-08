import { createContext, FC } from "react"

import { useFlashMessagesReducer } from "./useFlashMessagesReducer"

export type Context = ReturnType<typeof useFlashMessagesReducer>
export const FlashMessageContext = createContext<Context|undefined>(undefined)

const FlashMessageProvider: FC = ({ children }) => {
  const value = useFlashMessagesReducer()
  return (
    <FlashMessageContext.Provider value={value}>
      { children }
    </FlashMessageContext.Provider>
  )
}
export default FlashMessageProvider
