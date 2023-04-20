import React from "react";

// testing
import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  // wrap provider(s) here if needed
  return <div>{children}</div>;
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

afterEach(() => {
  cleanup();
});

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
