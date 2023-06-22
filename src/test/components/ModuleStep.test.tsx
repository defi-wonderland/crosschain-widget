import { render, screen, fireEvent, act } from "../test-utils";

import { ModuleStep } from "~/pages";

describe("ModuleStep", () => {
  it("renders ModuleStep component correctly", async () => {
    const props = {};

    await act(async () => {
      render(<ModuleStep {...props} />);
    });

    expect(screen.getByText("Safe module setup")).toBeInTheDocument();
    expect(screen.getByText("Verify setup")).toBeInTheDocument();
  });

  it("clicking on 'Verify setup' redirects to loading screen", async () => {
    const props = {};

    await act(async () => {
      render(<ModuleStep {...props} />);
    });

    fireEvent.click(screen.getByText("Verify setup"));
    expect(screen.getByTestId("connext-spinner")).toBeInTheDocument();
  });
});
