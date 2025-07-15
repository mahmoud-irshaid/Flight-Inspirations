import { setCached, getCached } from "./cacheUtils";

describe("cache utilities", () => {
  it("sets and gets cache values", () => {
    setCached("testKey", undefined, "testValue");
    expect(getCached("testKey", 10000)).toBe("testValue");
  });
});
