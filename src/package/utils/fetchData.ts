export const getSafeAddressUrl = (chainName: string, address: string) => {
  return `https://safe-transaction-${chainName}.safe.global/api/v1/owners/${address}/safes/`;
};

export const getContractAbiUrl = (chainName: string, address: string) => {
  return `https://safe-transaction-${chainName}.safe.global/api/v1/contracts/${address}/`;
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log("error getting safes");
    return { safes: [] };
  }
};
