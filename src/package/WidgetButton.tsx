import { useEffect } from "react";
import { useNavigationContext } from "./providers";
import { StepType } from "./types";

interface WidgetButtonProps {
  text?: string;
  modal?: boolean;
}

export const WidgetButton = ({ text, modal }: WidgetButtonProps) => {
  const { setType } = useNavigationContext();

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
