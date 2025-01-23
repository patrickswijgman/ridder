import { expect, test } from "vitest";
import { zero } from "./mem.js";

test("zeroes an object recursively", () => {
  const input = {
    a: 123,
    b: "test",
    c: true,
    d: { e: 123, f: "test", g: true },
    h: [{ i: 123 }, { j: "test" }, { k: false }, 123, "test", true],
  };

  const expected = {
    a: 0,
    b: "",
    c: false,
    d: { e: 0, f: "", g: false },
    h: [{ i: 0 }, { j: "" }, { k: false }, 0, "", false],
  };

  zero(input);

  expect(input).toEqual(expected);
});
