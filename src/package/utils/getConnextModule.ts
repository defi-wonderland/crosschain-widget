import { Contract, providers } from "ethers";

import { CONNEXT_MODULE_ABI } from "~/config";

// Returns the first Connext Module address
export const getConnextModule = async (
  listOfModules: string[],
  provider: providers.Provider,
  safeAddress: string,
  userAddress: string,
  domainId: number,
  connext: string
) => {
  const connextModuleAddress: string[] = [];
  for (let i = 0; i < listOfModules.length; i++) {
    const isConnext = await isConnextModule(
      listOfModules[i],
      provider,
      safeAddress,
      userAddress,
      domainId,
      connext
    );
    if (isConnext) {
      connextModuleAddress.push(listOfModules[i]);
    }
  }
  return connextModuleAddress[0];
};

// Returns true if the address is a Connext Module (calls the 'connext()' method)
export const isConnextModule = async (
  moduleAddress: string,
  provider: providers.Provider,
  safeAddress: string,
  userAddress: string,
  domainId: number,
  connext: string
) => {
  try {
    const contract = new Contract(moduleAddress, CONNEXT_MODULE_ABI, provider);
    const [owner, avatar, target, originSender, origin, connextAddress] =
      await Promise.all([
        contract.owner(),
        contract.avatar(),
        contract.target(),
        contract.originSender(),
        contract.origin(),
        contract.connext(),
      ]);

    // Check if the module is configured with the correct values
    const isConfiguredConnext =
      // Owner must be the Safe address
      owner === safeAddress &&
      // Avatar must be the Safe address
      avatar === safeAddress &&
      // Target must be the Safe address
      target === safeAddress &&
      // Origin must be the origin chain domainId
      origin === domainId &&
      // OriginSender must be the user address
      originSender === userAddress &&
      // Connext must be the destiny chain Connext address
      connextAddress === connext;

    return isConfiguredConnext;
  } catch (error) {
    return false;
  }
};
