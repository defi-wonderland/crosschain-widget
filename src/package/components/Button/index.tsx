import "./Button.css";

interface ButtonProps {
  children: any;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="widget-button" onClick={onClick}>
      {children}
    </button>
  );
};
