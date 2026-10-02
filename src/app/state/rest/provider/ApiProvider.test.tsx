import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ApiProvider from "./ApiProvider";

describe("ApiProvider", () => {
  const renderWithQueryClient = (queryClient = new QueryClient()) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <ApiProvider>{children}</ApiProvider>
      </QueryClientProvider>
    );
    return wrapper;
  };

  it("should render an ApiContext.Provider with children", () => {
    render(<span>TEST</span>, { wrapper: renderWithQueryClient() });
    const element = screen.getByText("TEST");
    expect(element).toBeTruthy(); // This checks that the element is found in the DOM
  });
});
