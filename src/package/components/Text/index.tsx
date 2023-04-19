import "./Text.css";

interface TextProps {
  children: any;
}
export const Text = ({ children }: TextProps) => {
  return <p className="widget-text">{children}</p>;
};
