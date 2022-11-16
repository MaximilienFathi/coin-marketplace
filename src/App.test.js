import { render, fireEvent, screen, getByTestId } from "@testing-library/react";
import Converter from "./components/coin/converter/converter";
import ConverterInput from "./components/coin/converter-input/converter-input";

test("test", () => {
  expect(true).toBe(true);
});

it("should render converterInput component", () => {
  render(<Converter />);
  const { getByTestId } = render(<ConverterInput />);
  const converterInput1 = getByTestId("input1TestId");
  // const converterInput2 = getByTestId("input2TestId");

  fireEvent.change(converterInput1, { target: { value: 0 } });
  // expect(screen.getByDisplayValue(converterInput1).toHaveValue(0));
});
