import { render, fireEvent, screen } from "@testing-library/react";
import Converter from "./components/coin/converter/converter";
import ConverterInput from "./components/coin/converter-input/converter-input";

test("test", () => {
  expect(true).toBe(true);
});

test("should render converterInput component", () => {
  render(<ConverterInput />);
  const converterInput1 = screen.getByTestId("input1TestId");
  // const converterInput2 = screen.getByTestId("input2TestId");
  expect(converterInput1).toBeInTheDocument();
});
