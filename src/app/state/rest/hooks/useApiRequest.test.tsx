import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApiProvider from "../provider/ApiProvider";
import useApiRequest from "./useApiRequest";

let resolveRequest: (value: unknown) => void = () => {};
const request = vi.fn(
  () => new Promise((resolve) => {
    resolveRequest = resolve;
  }),
);

vi.mock("./useRequestWrapper", () => ({
  default: () => request,
}));

describe("useApiRequest migration bridge", () => {
  it("invalidates the TanStack queries of its group only after the mutation is done", async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(["cases", 1, "workflows"], { results: [] });
    queryClient.setQueryData(["users", "list"], {});
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <ApiProvider>{children}</ApiProvider>
      </QueryClientProvider>
    );
    const { result } = renderHook(
      () => useApiRequest({ url: "/generic-tasks/complete/", groupName: "cases", lazy: true }),
      { wrapper },
    );

    let done: Promise<unknown> = Promise.resolve();
    act(() => {
      done = result.current[1].execPost({});
    });
    // The POST is still running: refetching now would get the old state.
    expect(queryClient.getQueryState(["cases", 1, "workflows"])?.isInvalidated).toBe(false);

    await act(async () => {
      resolveRequest({ data: "ok" });
      await done;
    });
    expect(queryClient.getQueryState(["cases", 1, "workflows"])?.isInvalidated).toBe(true);
    expect(queryClient.getQueryState(["users", "list"])?.isInvalidated).toBe(false);
  });
});
