import styled from "styled-components";
import { PropTheme } from "~/types";
import { Box } from "./Box";

const SLoader = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 22px;

  .spinner {
    height: 60px;
    width: 60px;
    background: hsla(333, 100%, 53%, 1);
    background: linear-gradient(
      124.9deg,
      #29c1fc 12.79%,
      #587bfd 31.48%,
      #ab00ff 50.16%,
      #d86292 68.85%,
      #fbb03b 87.53%
    );
    border-radius: 50%;
    position: relative;
    animation: spin 1.4s linear infinite;
  }

  .spinner::before {
    position: absolute;
    content: "";
    height: 90%;
    width: 90%;
    background-color: ${({ theme }: PropTheme) => theme.background};
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Spinner = () => {
  return (
    <SLoader>
      <Box className="spinner" data-testid="connext-spinner"></Box>
    </SLoader>
  );
};
