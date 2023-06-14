import { Contract, providers } from "ethers";

import { MODULE_FROM_SAFE_ABI } from "~/config";
import { getConnextModule } from "./getConnextModule";

export const getModuleFromSafe = async (
  safeAddress: string,
  provider: providers.Provider,
  userAddress: string,
  origin: number,
  connext: string
): Promise<string> => {
  try {
    const addressOne = "0x0000000000000000000000000000000000000001";
    const contract = new Contract(safeAddress, MODULE_FROM_SAFE_ABI, provider);

    // this call returns an array of modules and a next address: [array: string[], next: string]
    const modules = await contract.getModulesPaginated(addressOne, 50);
    const listOfModules = modules[0];

    // get the first connext module address
    const connextModule = await getConnextModule(
      listOfModules,
      provider,
      safeAddress,
      userAddress,
      origin,
      connext
    );
    return connextModule;
  } catch (error) {
    console.log("Error getting module address", error);
    return "";
  }
};
