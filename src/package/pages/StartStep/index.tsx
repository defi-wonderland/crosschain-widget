import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, Text, Dropdown, SInput } from "~/components";
import { fetchData, getSafeAddressUrl, getChainKey } from "~/utils";
import { ModalProps, StepType } from "~/types";
import { getConstants } from "~/config";

export const StartStep = ({ ...props }: ModalProps) => {
  const { Chains } = getConstants();
  const { setType } = useNavigationContext();
  const {
    userAddress,
    setDestinyChain,
    destinyChain,
    originChainId: chainId,
  } = useDataContext();

  const [safeList, setSafeList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const hasModule = true;

  // find origin chain name
  const chainKey = getChainKey(chainId!);
  const originChainName = Chains[chainKey].name;

  const getSafe = async () => {
    setLoading(true);
    try {
      const url = getSafeAddressUrl(destinyChain, userAddress);
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
    <BaseModal {...props} header="Cross chain action">
      <div>
        <SInput title="From" disabled={true} value={originChainName} />
      </div>

      <div>
        <Dropdown title="To" onChange={(e) => setDestinyChain(e.target.value)}>
          {Object.entries(Chains).map(([key, value], index) => (
            <>
              {value.name !== originChainName && (
                <option key={value.id + index} value={key}>
                  {value.name}
                </option>
              )}
            </>
          ))}
        </Dropdown>
      </div>

      <div style={{ width: "100%" }}>
        {loading && <Text>Fetching safe...</Text>}
        {!loading && (
          <Dropdown title="Input safe address">
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
        Use existing
      </Button>

      <Button
        onClick={async () => {
          setType(StepType.SAFE_MODULE_CREATION);
        }}
      >
        Create new Safe
      </Button>
    </BaseModal>
  );
};
