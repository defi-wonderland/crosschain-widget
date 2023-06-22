import { useEffect, useState } from "react";

import { useDataContext, useNavigationContext } from "~/providers";
import { BaseModal, Button, ModalProps } from "~/components";
import { fetchData, getSafeAddressUrl } from "~/utils";
import { ChainSection } from "./ChainSection";
import { SafeSection } from "./SafeSection";
import { SText } from "./StartStep.styles";
import { StepType } from "~/types";

export const StartStep = ({ ...props }: ModalProps) => {
  const { setType } = useNavigationContext();
  const { userAddress, destinyChain, setSafeAddress, setCreateSafe } =
    useDataContext();

  const [safeList, setSafeList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSafe = async () => {
    setLoading(true);
    const url = getSafeAddressUrl(destinyChain, userAddress);
    const jsonData = await fetchData(url);
    setSafeList(jsonData.safes);
    setSafeAddress(jsonData.safes[0]);
    setLoading(false);
  };

  useEffect(() => {
    setCreateSafe(false);
    getSafe();
  }, [destinyChain]);

  return (
    <BaseModal {...props} header="Cross chain action">
      <ChainSection setError={setError} error={error} />

      <SafeSection
        loading={loading}
        setLoading={setLoading}
        setSafeList={setSafeList}
        safeList={safeList}
        setError={setError}
        error={error}
      />

      <SText>Or</SText>

      <Button
        disabled={error}
        onClick={() => setType(StepType.SAFE_MODULE_CREATION)}
      >
        Create new Safe
      </Button>
    </BaseModal>
  );
};
