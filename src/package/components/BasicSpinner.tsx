import styled from "styled-components";

import { PropTheme } from "~/types";
import { Box } from "./Box";

const SLoader = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;
  height: 100%;

  .basic-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid ${({ theme }: PropTheme) => theme.actionDisabled};
    border-top: 3px solid ${({ theme }: PropTheme) => theme.background};
    border-radius: 50%;
    position: absolute;
    opacity: 0.5;
  }

  .basic-spinner {
    -webkit-transition-property: -webkit-transform;
    transition-duration: 1.2s;
    -webkit-transition-duration: 1.2s;
    -webkit-animation-name: rotate;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;

    -moz-transition-property: -moz-transform;
    -moz-animation-name: rotate;
    -moz-animation-duration: 1.2s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;

    transition-property: transform;
    animation-name: rotate;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-moz-keyframes rotate {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const BasicSpinner = () => {
  return (
    <SLoader>
      <Box className="basic-spinner"></Box>
    </SLoader>
  );
};
