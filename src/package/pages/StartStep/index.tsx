import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text, Dropdown } from "~/components";
import { ModalProps, StepType } from "~/types";
import { fetchData, getSafeAddressUrl } from "~/utils";

export const StartStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { address, chainId, setDestinyChain, destinyChain } = useDataContext();

  const [safeList, setSafeList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const hasModule = true;

  const getSafe = async () => {
    setLoading(true);
    try {
      const url = getSafeAddressUrl(destinyChain, address!);
      const jsonData = await fetchData(url);
      setSafeList(jsonData.safes);
    } catch (error) {
      console.log("error getting safes");
    }
    setLoading(false);
  };

  useEffect(() => {
    getSafe();
  }, [destinyChain]);

  return (
    <BaseModal {...props} onClose={onClose} header="Cross chain action">
      <Text>Sending as: {address}</Text>
      <Text>Origin chain: {chainId}</Text>

      <div>
        <Text>Select destination chain:</Text>
        <Dropdown
          name="Chains"
          onChange={(e) => setDestinyChain(e.target.value)}
        >
          <option value="mainnet">Ethereum</option>
          <option value="optimism">Optimism</option>
          <option value="arbitrum">Arbitrum</option>
          <option value="goerli">Goerli</option>
        </Dropdown>
      </div>

      <div style={{ width: "100%" }}>
        <Text>Select destination safe:</Text>
        {loading && <Text>Fetching safe...</Text>}
        {!loading && (
          <Dropdown name="SafeAlias">
            {safeList?.map((safeAddress) => (
              <option key={safeAddress} value={safeAddress}>
                {safeAddress}
              </option>
            ))}
          </Dropdown>
        )}
      </div>

      <Button
        onClick={async () => {
          if (hasModule) {
            setType(StepType.TRANSACTION);
          } else {
            setType(StepType.MODULE_SETUP);
          }
        }}
      >
        Use existent Safe
      </Button>

      <Button
        onClick={async () => {
          setType(StepType.SAFE_MODULE_CREATION);
        }}
      >
        Create a new Safe
      </Button>
    </BaseModal>
  );
};
