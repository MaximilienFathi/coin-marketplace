import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Converter from "./components/coin/converter/converter";
import ConverterInput from "./components/coin/converter-input/converter-input";

test("test", () => {
  expect(true).toBe(true);
});

test("Should render warning when input is too high", async () => {
  // const user = userEvent.setup();
  render(<Converter />);
  expect(await screen.findByTestId("input1TestId")).toBeInTheDocument();
  const element1 = screen.getByTestId("input1TestId");
  // // const element2 = screen.getByTestId("input2TestId");
  // fireEvent.change(element1, { target: { value: "3" } });
  await userEvent.type(element1, "1");
  // screen.debug(element1);
  // expect(element1.value).toBe("1");

  // let element1 = screen.getByTestId("input1TestId").value;
  // const element2 = screen.getByTestId("input2TestId").value;
  //
  // expect(element1).toBe(undefined);
  // expect(element2).toBe(undefined);
  //
  // fireEvent.change(screen.getByTestId("input1TestId"), {
  //   target: { value: "1" },
  // });
  // element1 = 1;
  // expect(element2).toBe(0);

  ////////////////////////////////////////////////////////////////

  // const container = render(<ConverterInput />);

  // const input = container.getByDisplayValue("4711");
  // expect(input.value).toBe("4711");

  // const converterInput1 = screen
  //   .getByTestId("input1TestId")
  //   .querySelector("input");
  // expect(converterInput1).toBeInTheDocument();

  // const converterInput2 = getByTestId("input2TestId");

  // fireEvent.change(converterInput1, { target: { value: 0 } });
  // expect(screen.getByDisplayValue(converterInput1).toHaveValue(0));
});

// // setup function
// function setup(jsx) {
//   return {
//     user: userEvent.setup(),
//     ...render(jsx),
//   };
// }
//
// test("render with a setup function", async () => {
//   const { user } = setup(<MyComponent />);
//   // ...
// });
