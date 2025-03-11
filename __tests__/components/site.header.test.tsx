import { render, screen, fireEvent } from "@testing-library/react"
import SiteHeader from "@/components/site-header"
import "@testing-library/jest-dom";


// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))

describe("SiteHeader", () => {
  it("renders the header with logo and navigation", () => {
    render(<SiteHeader />)

    // Check for logo
    expect(screen.getByText("CHRONO")).toBeInTheDocument()

    // Check for mobile menu button
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument()

    // Check for action buttons
    expect(screen.getByLabelText("Search")).toBeInTheDocument()
    expect(screen.getByLabelText("Account")).toBeInTheDocument()
    expect(screen.getByLabelText("Cart")).toBeInTheDocument()
  })

  it("shows cart item count", () => {
    render(<SiteHeader />)
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("toggles mobile menu when button is clicked", () => {
    render(<SiteHeader />)

    // Click the menu button
    fireEvent.click(screen.getByLabelText("Toggle menu"))

    // Check if the mobile menu is opened
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Collections")).toBeInTheDocument()
    expect(screen.getByText("Our Story")).toBeInTheDocument()
    expect(screen.getByText("Journal")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })
})


