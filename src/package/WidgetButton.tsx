import { useNavigationContext } from "./providers";
import { StepType } from "./types";

export const WidgetButton = ({ text }: { text?: string }) => {
  const { setType } = useNavigationContext();
  return (
    <button
      onClick={() => {
        setType(StepType.START);
      }}
    >
      {text && text}
      {!text && "Cross-Chain Widget"}
    </button>
  );
};
