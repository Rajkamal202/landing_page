import { render, screen, fireEvent } from "@testing-library/react"
import HeroSection from "@/components/hero-section"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 0,
}))

describe("HeroSection", () => {
  it("renders the hero section with title and buttons", () => {
    render(<HeroSection />)

    // Check for title
    expect(screen.getByText("Where Time Meets")).toBeInTheDocument()
    expect(screen.getByText("Excellence")).toBeInTheDocument()

    // Check for description
    expect(screen.getByText(/Discover our collection/)).toBeInTheDocument()

    // Check for buttons
    expect(screen.getByText("Explore Collection")).toBeInTheDocument()
    expect(screen.getByText("Book Consultation")).toBeInTheDocument()

    // Check for scroll button
    expect(screen.getByLabelText("Scroll down")).toBeInTheDocument()
  })

  it("scrolls to next section when scroll button is clicked", () => {
    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock

    // Mock nextElementSibling
    Object.defineProperty(HTMLElement.prototype, "nextElementSibling", {
      writable: true,
      value: document.createElement("div"),
    })

    render(<HeroSection />)

    // Click the scroll button
    fireEvent.click(screen.getByLabelText("Scroll down"))

    // Check if scrollIntoView was called
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" })
  })
})

