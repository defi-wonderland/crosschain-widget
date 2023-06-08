import { Contract, providers } from "ethers";
import { CONNEXT_MODULE_ABI } from "~/config";

// Returns the first Connext Module address
export const getConnextModule = async (
  listOfModules: string[],
  provider: providers.Provider
) => {
  const connextModuleAddress: string[] = [];
  for (let i = 0; i < listOfModules.length; i++) {
    const isConnext = await isConnextModule(listOfModules[i], provider);
    if (isConnext) {
      connextModuleAddress.push(listOfModules[i]);
    }
  }
  return connextModuleAddress[0];
};

// Returns true if the address is a Connext Module (calls the 'connext()' method)
export const isConnextModule = async (
  moduleAddress: string,
  provider: providers.Provider
) => {
  try {
    const contract = new Contract(moduleAddress, CONNEXT_MODULE_ABI, provider);
    await contract.connext();
    return true;
  } catch (error) {
    return false;
  }
};
