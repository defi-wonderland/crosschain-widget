import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text, Dropdown } from "~/components";
import { ModalProps, StepType } from "~/types";

export const StartStep = ({ onClose, ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const [selectedChain, setSelectedChain] = useState("mainnet");
  const [safeList, setSafeList] = useState<string[]>([]);
  const { address, chainId } = useDataContext();

  const [loading, setLoading] = useState(false);
  const hasModule = true;

  const getSafe = async () => {
    setLoading(true);
    const endpoint = `api/v1/owners/${address}/safes/`;
    try {
      const response = await fetch(
        `https://safe-transaction-${selectedChain}.safe.global/${endpoint}`
      );
      const jsonData = await response.json();
      setSafeList(jsonData.safes);
    } catch (error) {
      console.log("error getting safes");
    }
    setLoading(false);
  };

  useEffect(() => {
    getSafe();
  }, [selectedChain]);

  return (
    <BaseModal {...props} onClose={onClose} header="Cross chain action">
      <Text>Sending as: {address}</Text>
      <Text>Origin chain: {chainId}</Text>

      <div>
        <Text>Select destination chain:</Text>
        <Dropdown
          name="Chains"
          onChange={(e) => setSelectedChain(e.target.value)}
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
