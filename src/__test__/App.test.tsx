import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("Main page tests", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<App />);
  });

  it("should display buttons section", () => {
    expect(screen.getByText("Sort")).toBeInTheDocument();
    expect(screen.getByText("Randomize")).toBeInTheDocument();
  });

  it("should display main table (input tray)", async () => {
    const mainTable = await screen.findByTestId("app-main-table");

    expect(mainTable).toBeInTheDocument();
    expect(within(mainTable).getByText("Sample")).toBeInTheDocument();
    expect(within(mainTable).getByText("Age")).toBeInTheDocument();
    expect(within(mainTable).getByText("Company")).toBeInTheDocument();
    expect(within(mainTable).getByText("District")).toBeInTheDocument();
    expect(within(mainTable).getByText("Vision defect")).toBeInTheDocument();
  });

  it("should not display sorted samples section", async () => {
    expect(screen.queryByText("Sorted Samples")).toBeNull();
  });

  describe("and user interacts with interface", () =>
    describe("by clicking 'Sort' button", () => {
      beforeEach(async () => await user.click(screen.getByText("Sort")));

      it("should render 'Sorted Samples' section", async () => {
        expect(screen.getByText("Sorted Samples")).toBeInTheDocument();
      });

      it("should render 10 rack sections", async () => {
        expect(screen.getAllByText("Rack", { exact: false })).toHaveLength(10)
      });
    }));
});
