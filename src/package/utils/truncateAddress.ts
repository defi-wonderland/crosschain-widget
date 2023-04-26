export const truncatedAddress = (address: string) => {
  const truncated = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  return truncated;
};
