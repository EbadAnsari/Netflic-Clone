import { sum } from "@components/sum";
import { describe, expect, it } from "vitest";

describe("#sum", () => {
	it("returns 0 with no number", () => {
		expect(sum(1, 1)).toBe(2);
	});
});
