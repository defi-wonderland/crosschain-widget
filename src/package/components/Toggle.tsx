import styled from "styled-components";

import { Box } from "./Box";

const ToggleContainer = styled(Box)`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.buttonBackground};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.buttonBackground};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 17px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

interface ToggleProps {
  onClick: () => void;
  checked?: boolean;
}

export const Toggle = ({ onClick, checked }: ToggleProps) => {
  return (
    <ToggleContainer>
      <label className="switch">
        <input type="checkbox" onClick={onClick} checked={checked} readOnly />
        <span className="slider round"></span>
      </label>
    </ToggleContainer>
  );
};
