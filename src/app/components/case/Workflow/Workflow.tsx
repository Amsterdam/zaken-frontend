import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useTaskComplete, useCaseWorkflows } from "app/state/rest"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"
import getColumns from "./columns"
import { LoadingRows } from "@amsterdam/wonen-ui"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
}

const Wrap = styled.div`
  margin-bottom: ${ themeSpacing(12) };
  &:last-child {
    margin-bottom: 0;
  }
`

const Div = styled.div`
  margin-bottom: ${ themeSpacing(4) };
`

const POLLING_INTERVAL_MS = 1500 // 1.5 seconds
const POLLING_MAX_DURATION_MS = 10000 // 10 seconds

const Workflow: React.FC<Props> = ({ id }) => {
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const [data, { isBusy: isBusyGetting, execGet }] = useCaseWorkflows(id)

  const [isPollingAfterCompletion, setIsPollingAfterCompletion] = useState(false)
  const [isBusyPosting, setIsBusyPosting] = useState(false)
  const pollingStartTimeRef = useRef<number | null>(null)
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const workflows = useMemo(() => data?.results ?? [], [data?.results])

  // Wrapper around execPost to detect task completion and trigger polling
  const execPostWithPolling = useCallback(async (payload?: any) => {
    setIsBusyPosting(true)
    try {
      await execPost(payload)
      setIsPollingAfterCompletion(true)
      setIsBusyPosting(false)
      pollingStartTimeRef.current = Date.now()
    } catch (error) {
      setIsBusyPosting(false)
      setIsPollingAfterCompletion(false)
      throw error
    }
  }, [execPost])

  const columns = getColumns(execPostWithPolling)

  // Polling logic: poll workflows endpoint until workflows appear or timeout
  useEffect(() => {
    if (!isPollingAfterCompletion) {
      return
    }

    const startTime = pollingStartTimeRef.current || Date.now()

    // Clear any existing intervals/timeouts
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
    }
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current)
    }

    // Trigger immediate poll (don't wait for first interval)
    execGet()

    // Set timeout to stop polling after MAX_POLL_DURATION_MS
    pollTimeoutRef.current = setTimeout(() => {
      setIsPollingAfterCompletion(false)
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
    }, POLLING_MAX_DURATION_MS)

    // Poll at intervals
    pollIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      if (elapsed >= POLLING_MAX_DURATION_MS) {
        // Timeout reached, stop polling
        setIsPollingAfterCompletion(false)
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current)
          pollIntervalRef.current = null
        }
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current)
          pollTimeoutRef.current = null
        }
        return
      }
      execGet()
    }, POLLING_INTERVAL_MS)

    // Cleanup function
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
        pollTimeoutRef.current = null
      }
    }
  }, [isPollingAfterCompletion, execGet])

  // Stop polling when workflows appear
  useEffect(() => {
    if (isPollingAfterCompletion && workflows.length > 0) {
      setIsPollingAfterCompletion(false)
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current)
        pollTimeoutRef.current = null
      }
    }
  }, [isPollingAfterCompletion, workflows])

  const onClickLink = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsPollingAfterCompletion(false)
    execGet()
  }

  if (isBusyPosting || isBusyGetting || isPollingAfterCompletion) {
    return <LoadingRows numRows={2} />
  }

  return (
    <>
      {workflows.length > 0 ? (
        workflows.map(({ state, tasks, information }, index) => (
          <Wrap key={`${ state.name }_${ index }`}>
            <Div>
              <Heading as="h4">{state.name}</Heading>
              {information && <p>{information}</p>}
            </Div>
            <StyledTable
              columns={columns}
              lastColumnFixed
              data={tasks || []}
              pagination={false}
            />
          </Wrap>
        ))
      ) : (
        <>
          <>Geen taken beschikbaar. </>
          <Button variant="textButton" onClick={onClickLink}>
            Herlaad taken.
          </Button>
        </>
      )}
    </>
  )
}

export default Workflow
