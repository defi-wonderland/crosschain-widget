export const truncatedAddress = (address: string) => {
  const truncated = `${address?.slice(0, 9)}...${address?.slice(-9)}`;
  return truncated;
};
