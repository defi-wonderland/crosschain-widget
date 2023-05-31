import { render, screen, act } from "../test-utils";

import { FinishStep } from "~/pages";

describe("FinishStep", () => {
  it("renders FinishStep component with initial state and props", async () => {
    const props = {};

    await act(async () => {
      render(<FinishStep {...props} />);
    });

    expect(screen.getByText("Transaction Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Origin Transaction")).toBeInTheDocument();
    expect(screen.getByText("Destination Transaction")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
