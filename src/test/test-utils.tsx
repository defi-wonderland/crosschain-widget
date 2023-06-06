import React from "react";
import { afterEach, vi } from "vitest";
import { ethers } from "ethers";

// testing
import { cleanup, render } from "@testing-library/react";

import { DataProvider, NavigationProvider } from "~/providers";

const gasPrice = 100;

const mockResult = {
  toNumber: vi.fn(() => gasPrice),
};

vi.mock("ethers", async () => {
  const actual: any = await vi.importActual("ethers");
  return {
    ...actual,
    ethers: {
      providers: {
        JsonRpcProvider: vi.fn().mockImplementation(() => ({
          getGasPrice: vi.fn().mockResolvedValue(mockResult),
        })),
      },
    },
  };
});

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  // wrap provider(s) here if needed
  return (
    <NavigationProvider>
      <DataProvider
        originAddress={""}
        userChainId={0}
        setTx={function (tx: string): void {
          throw new Error("Function not implemented.");
        }}
        provider={new ethers.providers.JsonRpcProvider()}
      >
        {children}
      </DataProvider>
    </NavigationProvider>
  );
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
