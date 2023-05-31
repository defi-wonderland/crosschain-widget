import { useEffect } from "react";
import { useDataContext, useNavigationContext } from "./providers";
import { StepType } from "./types";

interface WidgetButtonProps {
  text?: string;
}

export const WidgetButton = ({ text }: WidgetButtonProps) => {
  const { setType } = useNavigationContext();
  const { modal } = useDataContext();

  useEffect(() => {
    setType(StepType.None);
    if (!modal) setType(StepType.START);
  }, [modal]);

  return (
    <>
      {modal && (
        <button onClick={() => setType(StepType.START)}>
          {text && text}
          {!text && "Cross-Chain Widget"}
        </button>
      )}
    </>
  );
};
