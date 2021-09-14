import { useUniqueId } from "./index";
import { renderHook } from "@testing-library/react-hooks";

describe("useUniqueId", () => {
  it("returns the same id accross rerenders", () => {
    const { result, rerender } = renderHook(() => {
      const id = useUniqueId();
      return id("foo");
    });

    const firstRender = result.current;

    rerender();

    const secondRender = result.current;

    expect(secondRender).toBe(firstRender);
  });

  it("returns different ids for different keys", () => {
    const { result } = renderHook(() => {
      const id = useUniqueId();
      return {
        foo: id("foo"),
        bar: id("bar"),
      };
    });

    const { foo, bar } = result.current;
    expect(foo).not.toBe(bar);
  });

  it("scopes hook instances", () => {
    const { result } = renderHook(() => {
      const id1 = useUniqueId();
      const id2 = useUniqueId();
      return [id1("foo"), id2("foo")] as const;
    });

    const [first, second] = result.current;
    expect(first).not.toBe(second);
  });
});
