import { Contract, providers } from "ethers";

import { IS_MODULE_ENABLED_ABI } from "~/config";

export const getIsModuleEnabled = async (
  safeAddress: string,
  moduleAddress: string,
  provider: providers.Provider
): Promise<boolean> => {
  try {
    const contract = new Contract(safeAddress, IS_MODULE_ENABLED_ABI, provider);
    return await contract.isModuleEnabled(moduleAddress);
  } catch (error) {
    return false;
  }
};
