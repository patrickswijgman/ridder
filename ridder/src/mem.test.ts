import { expect, test } from "vitest";
import { zero } from "./mem.js";

test("zeroes an object recursively", () => {
  const input = {
    a: 123,
    b: "test",
    c: true,
    d: { e: 456, f: "testtest", g: false },
    h: [{ i: 789 }, { j: "testtesttest" }, { k: false }],
  };

  const expected = {
    a: 0,
    b: "",
    c: false,
    d: { e: 0, f: "", g: false },
    h: [{ i: 0 }, { j: "" }, { k: false }],
  };

  zero(input);

  expect(input).toEqual(expected);
});
