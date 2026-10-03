import { useLocation } from "react-router-dom"
import { Alert, Column, Grid, Paragraph } from "@amsterdam/design-system-react"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"

/**
 * The flash messages (same state as the old asc-ui FlashMessages), as
 * Amsterdam Design System alerts. Closing one removes it, so the same message
 * can be shown again later.
 */
export function FlashMessages() {
  const { pathname } = useLocation()
  const { state, removeFlashMessage } = useFlashMessages()
  const messages = [
    ...(state[pathname] ?? []).map((message) => ({ path: pathname, message })),
    ...(state.current ?? []).map((message) => ({ path: "current", message })),
  ]

  if (messages.length === 0) return null

  return (
    <Grid.Cell span="all" appearance="transparent">
      <Column gap="small">
        {messages.map(
          ({ path, message: { messageId, title, children, level } }) => (
            <Alert
              key={messageId}
              heading={typeof title === "string" ? title : ""}
              headingLevel={2}
              severity={level === "error" ? "error" : "success"}
              closeable
              onClose={() => removeFlashMessage(path, messageId)}
            >
              {typeof children === "string" ? (
                <Paragraph>{children}</Paragraph>
              ) : (
                children
              )}
            </Alert>
          ),
        )}
      </Column>
    </Grid.Cell>
  )
}
