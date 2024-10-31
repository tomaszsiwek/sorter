import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Rack from "../../components/Rack";
import { Sample } from "../../types";

const rows: Sample[] = [
  {
    id: "sample-1",
    patient: {
      id: "sample-1",
      age: 29,
      company: "BrightEyes",
      district: "West",
      visionDefect: "astigmatism",
    },
  },
];

describe("Rack component tests", () => {
  it("should render empty table with header only", () => {
    render(<Rack rows={[]} />);

    expect(screen.getByText("Sample")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("District")).toBeInTheDocument();
    expect(screen.getByText("Vision defect")).toBeInTheDocument();

    expect(screen.getAllByRole("rowgroup")).toHaveLength(1)
  });

  it("should render table with specific data", () => {
    render(<Rack rows={rows} />);

    expect(screen.getByText("Sample")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("District")).toBeInTheDocument();
    expect(screen.getByText("Vision defect")).toBeInTheDocument();

    expect(screen.getByText("sample-1")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("BrightEyes")).toBeInTheDocument();
    expect(screen.getByText("West")).toBeInTheDocument();
    expect(screen.getByText("astigmatism")).toBeInTheDocument();

    expect(screen.getAllByRole("rowgroup")).toHaveLength(2)
  });
});
