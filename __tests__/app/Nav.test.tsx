import { screen } from "@testing-library/react";
import NavBar from "@/components/NavBar";
import { render } from "../../src/test-utils/render";

describe("NavBar", () => {
    it("renders the NavBar component", () => {
        render(<NavBar />);
        expect(screen.getByText("Posts Page")).toBeInTheDocument();
    });
});