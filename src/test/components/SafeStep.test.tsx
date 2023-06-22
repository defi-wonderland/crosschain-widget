import { WethAddress } from "../__mocks__/abi";
import { render, screen, fireEvent, act } from "../test-utils";
import { SafeSettingsStep } from "~/pages";

describe("SafeSettingsStep", () => {
  it("renders SafeSettingsStep component with initial state and props", async () => {
    const props = {};

    await act(async () => {
      render(<SafeSettingsStep {...props} />);
    });

    expect(screen.getByText("Safe Configuration")).toBeInTheDocument();
    expect(screen.getByText("Owner address")).toBeInTheDocument();

    // Simulate an invalid address
    fireEvent.change(screen.getByTestId("Owner address"), {
      target: { value: "newOwner" },
    });
    expect(screen.getByTestId("add-owner-button")).toBeDisabled();
    expect(screen.getByText("Continue")).toBeDisabled();

    // Simulate a valid address
    fireEvent.change(screen.getByTestId("Owner address"), {
      target: { value: WethAddress },
    });
    expect(screen.getByTestId("add-owner-button")).not.toBeDisabled();
    expect(screen.getByText("Continue")).not.toBeDisabled();

    // Add a new owner
    fireEvent.click(screen.getByTestId("add-owner-button"));

    // Now we can coninue to the next step
    expect(screen.getByTestId("add-owner-button")).toBeDisabled();
    expect(screen.getByText("Continue")).toBeDisabled();
  });
});
