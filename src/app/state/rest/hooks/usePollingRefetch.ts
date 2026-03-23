import { useEffect, useRef, useState } from "react"

/**
 * Hook that automatically polls for data when empty results are detected after mount.
 * Useful for handling race conditions with async backend processing (e.g. Celery tasks).
 *
 * Uses exponential backoff and stops after max attempts or when data arrives.
 *
 * @param data - Array of data to check for emptiness
 * @param execGet - Function to call to refetch data
 * @param enabled - Whether polling should be enabled (default: true)
 * @param maxAttempts - Maximum number of polling attempts (default: 5)
 * @returns isPolling - Boolean indicating if currently in polling mode
 */
const usePollingRefetch = (
  data: any[] | undefined,
  execGet: () => void,
  enabled: boolean = true,
  maxAttempts = 5
): boolean => {
  const attemptRef = useRef(0)
  const mountTimeRef = useRef(Date.now())
  const [isPolling, setIsPolling] = useState(false)

  useEffect(() => {
    // Only poll if:
    // 1. Polling is enabled
    // 2. Data is empty array (not undefined/loading)
    // 3. Within first 30 seconds after mount (e.g. recent navigation or page reload)
    // 4. Hasn't exceeded max attempts
    const isEmpty = Array.isArray(data) && data.length === 0
    const isRecent = Date.now() - mountTimeRef.current < 30000
    const shouldPoll = enabled && isEmpty && isRecent && attemptRef.current < maxAttempts

    if (shouldPoll) {
      setIsPolling(true)
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s
      const delay = 1000 * Math.pow(2, attemptRef.current)
      const timer = setTimeout(() => {
        attemptRef.current++
        execGet()
      }, delay)

      return () => clearTimeout(timer)
    } else {
      setIsPolling(false)
    }
  }, [data, execGet, enabled, maxAttempts])

  return isPolling
}

export default usePollingRefetch

