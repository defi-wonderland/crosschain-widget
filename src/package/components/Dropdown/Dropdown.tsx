import { createContext, useContext, useRef, useState } from "react";
import styled from "styled-components";

import { useOnClickOutside } from "~/hooks";
import { withComponents } from "~/utils";
import { DropdownButton } from "./DropdownButton";
import { DropdownModal } from "./DropdownModal";

export interface IDropdownContext {
  show: boolean;
  setShow: (show: boolean) => void;
}

export type IDropdown = {
  children: any;
  className?: string;
} & IDropdownContext;

const Container = styled.section`
  background-color: ${(props) => props.theme.background};
  position: relative;
`;

const DropdownContext = createContext<IDropdownContext>({
  show: false,
  setShow: () => null,
});

export const useDropdownContext = () => {
  return useContext(DropdownContext);
};

const useDropdownProps = () => {
  const [show, setShow] = useState(false);

  return { show, setShow };
};

const Dropdown = ({ children, className, show, setShow }: IDropdown) => {
  const ref = useRef<any>();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Container className={className} ref={ref}>
      <DropdownContext.Provider
        value={{
          setShow,
          show,
        }}
      >
        {children}
      </DropdownContext.Provider>
    </Container>
  );
};

export default withComponents(Dropdown, {
  Button: DropdownButton,
  Modal: DropdownModal,
  useProps: useDropdownProps,
});
