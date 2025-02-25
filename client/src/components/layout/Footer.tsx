import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              ShopSmart is your destination for quality home products at great prices.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products">
                  <a className="text-sm hover:underline">All Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-sm hover:underline">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-sm hover:underline">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:underline">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 ShopSmart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
