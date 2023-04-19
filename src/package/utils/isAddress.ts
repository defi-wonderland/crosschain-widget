export const isAddress = (address: string) => {
  const direccionRegex = /^0x[a-fA-F0-9]{40}$/;
  return direccionRegex.test(address);
};
