import { render, screen, fireEvent, act } from "../test-utils";

import { TransactionStep } from "~/pages";

describe("TransactionStep", () => {
  it("renders TransactionStep component with initial state and props", async () => {
    const props = {};

    await act(async () => {
      render(<TransactionStep {...props} />);
    });

    expect(screen.getByText("Transaction Builder")).toBeInTheDocument();
    expect(screen.getByTestId("Contract address")).toBeInTheDocument();
    expect(screen.getByTestId("Input ABI")).toBeInTheDocument();

    // Simulate user interactions and state changes
    fireEvent.change(screen.getByTestId("Contract address"), {
      target: { value: "0x1234567890" },
    });
    fireEvent.change(screen.getByTestId("Input ABI"), {
      target: { value: "someAbi" },
    });

    expect(screen.getByTestId("Contract address")).toHaveValue("0x1234567890");
    expect(screen.getByTestId("Input ABI")).toHaveValue("someAbi");
  });

  it("should handle invalid inputs", async () => {
    const props = {};

    await act(async () => {
      render(<TransactionStep {...props} />);
    });

    expect(screen.getByText("Transaction Builder")).toBeInTheDocument();
    expect(screen.getByTestId("Contract address")).toBeInTheDocument();
    expect(screen.getByTestId("Input ABI")).toBeInTheDocument();

    // Simulate user interactions and state changes
    fireEvent.change(screen.getByTestId("Contract address"), {
      target: { value: "0x1234567890" },
    });
    fireEvent.change(screen.getByTestId("Input ABI"), {
      target: { value: "someAbi" },
    });

    // invalid contract and abi inputs
    expect(screen.getAllByText(/invalid/i).length).toEqual(2);

    fireEvent.change(screen.getByTestId("Contract address"), {
      target: { value: "0x8454e4afcdbfae230b90756c3e57811ee14f517a" },
    });

    // invalid abi input
    expect(screen.getAllByText(/invalid/i).length).toEqual(1);
  });
});
