import { useEffect } from "react";
import { useDataContext, useNavigationContext } from "./providers";
import { StepType } from "./types";

interface WidgetButtonProps {
  text?: string;
  className?: string;
}

export const WidgetButton = ({ text, className }: WidgetButtonProps) => {
  const { setType } = useNavigationContext();
  const { modal } = useDataContext();

  useEffect(() => {
    setType(StepType.None);
    if (!modal) setType(StepType.START);
  }, [modal]);

  return (
    <>
      {modal && (
        <button
          onClick={() => setType(StepType.START)}
          className={className || "crosschain-widget-button"}
        >
          {text && text}
          {!text && "Cross-Chain Widget"}
        </button>
      )}
    </>
  );
};
