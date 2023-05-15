export const truncatedAddress = (address: string) => {
  const truncated = `${address?.slice(0, 10)}...${address?.slice(-10)}`;
  return truncated;
};
