import { vi } from "vitest";
import { render, screen, act } from "../test-utils";

import { ZodiacConnextWidget } from "~/package";

const mockSetTx = vi.fn();
describe("ZodiacConnextWidget", () => {
  it("renders ZodiacConnextWidget component correctly", async () => {
    const originAddress = "0x1234567890";
    const userChainId = 1;
    const text = "Cross chain action";
    const modal = false;
    const lightTheme = true;

    await act(async () => {
      render(
        <ZodiacConnextWidget
          originAddress={originAddress}
          userChainId={userChainId}
          setTx={mockSetTx}
          text={text}
          modal={modal}
          lightTheme={lightTheme}
        />
      );
    });

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("ZodiacConnextWidget component uses default props correctly", async () => {
    const originAddress = "0x1234567890";
    const userChainId = 1;

    await act(async () => {
      render(
        <ZodiacConnextWidget
          originAddress={originAddress}
          userChainId={userChainId}
          setTx={mockSetTx}
        />
      );
    });

    expect(screen.getByText("Cross chain action")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
  });

  it("should handle invalid chainId", async () => {
    const originAddress = "0x1234567890";
    const invalidChainId = 11111;

    await act(async () => {
      render(
        <ZodiacConnextWidget
          originAddress={originAddress}
          userChainId={invalidChainId}
          setTx={mockSetTx}
        />
      );
    });

    expect(screen.getByText("Cross chain action")).toBeInTheDocument();
    expect(screen.getByText("Usupported Chain")).toBeInTheDocument();
  });
});
