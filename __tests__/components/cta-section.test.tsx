import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import CtaSection from "@/components/cta-section"
import { toast } from "sonner"


// Mock toast
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}))

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  useInView: () => true,
}))

describe("CtaSection", () => {
  it("renders the CTA section with form", () => {
    render(<CtaSection />)

    // Check for title
    expect(screen.getByText("Join Our")).toBeInTheDocument()
    expect(screen.getByText("Exclusive Circle")).toBeInTheDocument()

    // Check for description
    expect(screen.getByText(/Subscribe to our newsletter/)).toBeInTheDocument()

    // Check for form elements
    expect(screen.getByTestId("email-input")).toBeInTheDocument()
    expect(screen.getByTestId("subscribe-button")).toBeInTheDocument()
  })

  it("shows error message for invalid email", async () => {
    render(<CtaSection />)

    // Enter invalid email
    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "invalid-email" } })

    // Submit form
    fireEvent.click(screen.getByTestId("subscribe-button"))

    // Check for error message
    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toBeInTheDocument()
    })
  })

  it("submits form with valid email", async () => {
    render(<CtaSection />)

    // Enter valid email
    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@example.com" } })

    // Submit form
    fireEvent.click(screen.getByTestId("subscribe-button"))

    // Check for loading state
    expect(screen.getByText("Subscribing...")).toBeInTheDocument()

    // Check for success toast
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter.",
      })
    })

    // Check form is reset
    await waitFor(() => {
      expect(screen.getByTestId("email-input")).toHaveValue("")
    })
  })
})

