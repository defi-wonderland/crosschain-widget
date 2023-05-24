import { vi } from "vitest";
import { fireEvent, render, screen } from "../test-utils";

import { ZodiacConnextWidget } from "~/package";

const mockSetTx = vi.fn();
describe("Widget button", () => {
  it("renders open widget button correctly", () => {
    const originAddress = "0x1234567890";
    const userChainId = 1;
    const modal = true;
    const lightTheme = true;

    render(
      <div>
        <ZodiacConnextWidget
          originAddress={originAddress}
          userChainId={userChainId}
          setTx={mockSetTx}
          modal={modal}
          lightTheme={lightTheme}
        />
      </div>
    );

    expect(screen.getByText("Cross-Chain Widget")).toBeInTheDocument();
  });

  it("should navigate between the steps", () => {
    const originAddress = "0x1234567890";
    const userChainId = 1;
    const modal = false;
    const lightTheme = true;

    render(
      <div>
        <ZodiacConnextWidget
          originAddress={originAddress}
          userChainId={userChainId}
          setTx={mockSetTx}
          modal={modal}
          lightTheme={lightTheme}
        />
      </div>
    );
    // opens on Start Step
    expect(screen.getByText("Cross chain action")).toBeInTheDocument();

    // nagivates to SafeSettings Step
    fireEvent.click(screen.getByText("Create new Safe"));
    expect(screen.getByText("Safe Configuration")).toBeInTheDocument();
  });
});
