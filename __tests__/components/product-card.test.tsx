import { render, screen, fireEvent } from "@testing-library/react"
import ProductCard from "@/components/ui/product-card"

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}))

const mockProduct = {
  id: "1",
  name: "Test Watch",
  description: "A test watch description",
  price: 10000,
  image: "/test-image.jpg",
  category: "Test Category",
  rating: 4.5,
  reviews: 100,
}

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />)

    // Check for product name
    expect(screen.getByText("Test Watch")).toBeInTheDocument()

    // Check for product description
    expect(screen.getByText("A test watch description")).toBeInTheDocument()

    // Check for product price
    expect(screen.getByText("$10,000")).toBeInTheDocument()

    // Check for product category
    expect(screen.getByText("Test Category")).toBeInTheDocument()

    // Check for reviews
    expect(screen.getByText("(100 reviews)")).toBeInTheDocument()

    // Check for Add to Cart button
    expect(screen.getByText("Add to Cart")).toBeInTheDocument()
  })

  it("displays Quick View button on hover", () => {
    render(<ProductCard product={mockProduct} />)

    // Simulate hover
    fireEvent.mouseEnter(screen.getByTestId("product-card"))

    // Check for Quick View button
    expect(screen.getByText("Quick View")).toBeInTheDocument()
  })
})

