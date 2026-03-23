import { renderHook, act } from "@testing-library/react-hooks"
import usePollingRefetch from "./usePollingRefetch"

describe("usePollingRefetch", () => {
  let execGet: ReturnType<typeof vi.fn>

  beforeEach(() => {
    execGet = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("Data behavior", () => {
    it("should not poll when data is undefined", () => {
      const { result } = renderHook(() =>
        usePollingRefetch(undefined, execGet)
      )

      expect(result.current).toBe(false)
      expect(execGet).not.toHaveBeenCalled()
    })

    it("should not poll when data has items", () => {
      const { result } = renderHook(() =>
        usePollingRefetch([{ id: 1 }], execGet)
      )

      expect(result.current).toBe(false)
      expect(execGet).not.toHaveBeenCalled()
    })

    it("should start polling when data is empty array", () => {
      const { result } = renderHook(() =>
        usePollingRefetch([], execGet)
      )

      expect(result.current).toBe(true)
      expect(execGet).not.toHaveBeenCalled() // Not called immediately
    })
  })

  describe("Timer behavior", () => {
    it("should call execGet after first delay (1s)", () => {
      renderHook(() => usePollingRefetch([], execGet))

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(execGet).toHaveBeenCalledTimes(1)
    })

    it("should use exponential backoff", () => {
      const { rerender } = renderHook(
        ({ data }: { data: any[] | undefined }) => usePollingRefetch(data, execGet),
        { initialProps: { data: [] as any[] } }
      )

      // First call after 1s
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(execGet).toHaveBeenCalledTimes(1)
      // Trigger rerender to simulate data refetch (effect re-runs to set up next timer)
      rerender({ data: [] })

      // Second call after 2s more (total 3s)
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(execGet).toHaveBeenCalledTimes(2)
      rerender({ data: [] })

      // Third call after 4s more (total 7s)
      act(() => {
        vi.advanceTimersByTime(4000)
      })
      expect(execGet).toHaveBeenCalledTimes(3)
      rerender({ data: [] })

      // Fourth call after 8s more (total 15s)
      act(() => {
        vi.advanceTimersByTime(8000)
      })
      expect(execGet).toHaveBeenCalledTimes(4)
      rerender({ data: [] })

      // Fifth call after 16s more (total 31s)
      act(() => {
        vi.advanceTimersByTime(16000)
      })
      expect(execGet).toHaveBeenCalledTimes(5)
    })

    it("should stop polling after maxAttempts", () => {
      const { result, rerender } = renderHook(
        ({ data }: { data: any[] | undefined }) => usePollingRefetch(data, execGet, true, 3),
        { initialProps: { data: [] as any[] } }
      )

      // Advance through 3 attempts
      act(() => {
        vi.advanceTimersByTime(1000) // 1s
      })
      expect(execGet).toHaveBeenCalledTimes(1)
      rerender({ data: [] })

      act(() => {
        vi.advanceTimersByTime(2000) // 2s
      })
      expect(execGet).toHaveBeenCalledTimes(2)
      rerender({ data: [] })

      act(() => {
        vi.advanceTimersByTime(4000) // 4s
      })
      expect(execGet).toHaveBeenCalledTimes(3)
      rerender({ data: [] })

      // Should not poll again (maxAttempts reached)
      act(() => {
        vi.advanceTimersByTime(8000)
      })
      expect(execGet).toHaveBeenCalledTimes(3)
      expect(result.current).toBe(false)
    })
  })

  describe("State changes", () => {
    it("should stop polling when data arrives", () => {
      const { result, rerender } = renderHook(
        ({ data }: { data: any[] | undefined }) => usePollingRefetch(data, execGet),
        { initialProps: { data: [] as any[] } }
      )

      expect(result.current).toBe(true)

      // Advance time to trigger first poll
      act(() => {
        vi.advanceTimersByTime(1000)
      })
      expect(execGet).toHaveBeenCalledTimes(1)

      // Data arrives
      rerender({ data: [{ id: 1 }] })
      expect(result.current).toBe(false)

      // Should not poll again
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(execGet).toHaveBeenCalledTimes(1)
    })

    it("should reset isPolling when conditions are no longer met", () => {
      const { result, rerender } = renderHook(
        ({ data }: { data: any[] | undefined }) => usePollingRefetch(data, execGet),
        { initialProps: { data: [] as any[] } as { data: any[] | undefined } }
      )

      expect(result.current).toBe(true)

      rerender({ data: undefined })
      expect(result.current).toBe(false)
    })
  })

  describe("Configuration", () => {
    it("should not poll when disabled", () => {
      const { result } = renderHook(() =>
        usePollingRefetch([], execGet, false)
      )

      expect(result.current).toBe(false)
      
      act(() => {
        vi.advanceTimersByTime(10000)
      })
      expect(execGet).not.toHaveBeenCalled()
    })

    it("should not poll after 30 seconds from mount", () => {
      const { result, rerender } = renderHook(
        ({ data }: { data: any[] | undefined }) => usePollingRefetch(data, execGet),
        { initialProps: { data: [] as any[] } }
      )

      expect(result.current).toBe(true)

      // Advance 31 seconds
      act(() => {
        vi.advanceTimersByTime(31000)
      })

      // Trigger rerender to re-evaluate the effect
      rerender({ data: [] })

      // Should have stopped polling because 30s window has passed
      expect(result.current).toBe(false)
    })
  })
})
