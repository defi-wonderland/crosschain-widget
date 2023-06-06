import { utils } from "ethers";

export const getSaltNonce = () => {
  const saltNonce = utils.randomBytes(32);
  return utils.hexlify(saltNonce);
};
