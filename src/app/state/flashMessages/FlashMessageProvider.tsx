import { createContext } from "react"

import { useFlashMessagesReducer } from "./hooks/useFlashMessagesReducer"

export type Context = ReturnType<typeof useFlashMessagesReducer>
export const FlashMessageContext = createContext<Context|undefined>(undefined)

const FlashMessageProvider: React.FC = ({ children }) => {
  const value = useFlashMessagesReducer()
  return (
    <FlashMessageContext.Provider value={value}>
      { children }
    </FlashMessageContext.Provider>
  )
}
export default FlashMessageProvider
