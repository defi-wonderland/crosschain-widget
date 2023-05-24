import { render, screen, fireEvent } from "../test-utils";

import { ModuleStep } from "~/pages";

describe("ModuleStep", () => {
  it("renders ModuleStep component correctly", () => {
    const props = {};
    render(<ModuleStep {...props} />);

    expect(screen.getByText("Safe module setup")).toBeInTheDocument();
    expect(screen.getByText("Verify setup")).toBeInTheDocument();
  });

  it("clicking on 'Verify setup' redirects to loading screen", () => {
    const props = {};
    render(<ModuleStep {...props} />);

    fireEvent.click(screen.getByText("Verify setup"));
    expect(screen.getByText("Verifying your setup...")).toBeInTheDocument();
  });
});
