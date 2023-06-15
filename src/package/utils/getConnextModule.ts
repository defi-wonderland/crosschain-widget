import { providers } from "ethers";
import { Contract as MulticallContract, Provider } from "ethers-multicall";

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
    const multicallProvider = new Provider(provider);
    await multicallProvider.init(); // Only required when `chainId` is not provided in the `Provider` constructor

    const moduleContract = new MulticallContract(
      moduleAddress,
      CONNEXT_MODULE_ABI
    );

    const [owner, avatar, target, originSender, origin, connextAddress] =
      await multicallProvider.all([
        moduleContract.owner(),
        moduleContract.avatar(),
        moduleContract.target(),
        moduleContract.originSender(),
        moduleContract.origin(),
        moduleContract.connext(),
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
