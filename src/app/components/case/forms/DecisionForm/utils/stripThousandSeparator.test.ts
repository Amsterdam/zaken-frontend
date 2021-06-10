import stripThousandSeparator from "./stripThousandSeparator"

describe("stripThousandSeparator", () => {

	it("stripThousandSeparator for thousands", () => {
    expect(stripThousandSeparator("1.000.000")).toBe("1000000")
	})

	it("stripThousandSeparator for non thousands", () => {
    expect(stripThousandSeparator("1.00")).toBe("1.00")
	})

	it("separator", () => {
    expect(stripThousandSeparator("1,000,000", ",")).toBe("1000000")
	})
})