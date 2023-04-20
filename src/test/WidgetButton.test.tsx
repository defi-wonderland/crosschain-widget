import App from "~/App";
import { render } from "./test-utils";

describe("Test Aplicaction", () => {
  it("Should render the button to open the modal", () => {
    const { getByText } = render(<App />);

    expect(getByText(/open modal/i)).toBeInTheDocument();
  });
});
