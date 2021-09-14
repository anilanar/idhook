import * as React from "react";
import Benchmark from "react-component-benchmark";
import { act, render, waitFor } from "@testing-library/react";
import { useUniqueId } from "./index";

/**
 * A wrapper function to make benchmarking in tests a bit more reusable.
 * You might tune this to your specific needs
 * @param  {React.Component} options.component  The component you'd like to benchmark
 * @param  {Object} options.props               Props for your component
 * @param  {Number} options.samples             Number of samples to take. default 50 is a safe number
 * @param  {String} options.type                Lifecycle of a component ('mount', 'update', or 'unmount')
 * @return {Object}                             Results object
 */
async function runBenchmark({ component, props, samples = 50, type }) {
  return new Promise(async (resolve, reject) => {
    const ref = React.createRef();

    let results;
    const handleComplete = jest.fn((res) => {
      results = res;
    });

    render(
      <Benchmark
        component={component}
        onComplete={handleComplete}
        ref={ref}
        samples={400}
        componentProps={props}
        type={type}
      />
    );

    act(() => {
      ref.current.start();
    });

    await waitFor(() => expect(handleComplete).toHaveBeenCalled(), {
      timeout: 10000,
    });
    resolve(results);
  });
}

let emptyMount, emptyUpdate, emptyTenMount;

const tenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

beforeEach(async () => {
  function Example() {
    return <div>foo</div>;
  }
  function Example10() {
    return (
      <div>
        {tenArray.map((id) => (
          <div key={id}>{id}</div>
        ))}
      </div>
    );
  }

  emptyMount = await runBenchmark({ component: Example, type: "mount" });
  emptyUpdate = await runBenchmark({ component: Example, type: "update" });
  emptyTenMount = await runBenchmark({ component: Example10, type: "update" });
});

describe("mount", () => {
  test("single id", async () => {
    function Example() {
      const id = useUniqueId();
      return <div>{id("foo")}</div>;
    }

    const results = await runBenchmark({ component: Example, type: "mount" });
    expect(results.mean).toBeLessThanOrEqual(emptyMount.mean * 1.05);
  });
  test("10 ids", async () => {
    function Example() {
      const id = useUniqueId();
      return (
        <div>
          {tenArray.map((idx) => (
            <div key={idx}>{id(`${idx}`)}</div>
          ))}
        </div>
      );
    }

    const results = await runBenchmark({ component: Example, type: "mount" });
    expect(results.mean).toBeLessThanOrEqual(emptyTenMount.mean * 1.10);
  });
});

describe("update", () => {
  test("single id", async () => {
    function Example() {
      const id = useUniqueId();
      return <div>{id("foo")}</div>;
    }

    const results = await runBenchmark({ component: Example, type: "update" });
    expect(results.mean).toBeLessThanOrEqual(emptyUpdate.mean * 1.05);
  });
});
