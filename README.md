
# ShopSmart E-Commerce Platform

A modern e-commerce platform built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Product browsing and searching
- 🛒 Shopping cart functionality
- 💳 Secure checkout process
- 🌙 Dark mode support
- 📱 Responsive design
- 🔐 User authentication
- 🔍 Advanced product filtering
- ⚡ Real-time cart updates

## Tech Stack

- **Frontend:** React with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Authentication:** Clerk
- **UI Components:** shadcn/ui
- **Server:** Express.js
- **Database:** PostgreSQL with Drizzle ORM

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shopsmart.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React Context providers
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Application pages
├── server/               # Backend API
├── shared/              # Shared types and schemas
└── public/              # Static assets
```

## Key Components

- **Product Grid:** Responsive product display with filtering
- **Shopping Cart:** Real-time cart management
- **User Authentication:** Secure login/signup flow
- **Checkout Process:** Streamlined purchasing experience

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
CLERK_PUBLISHABLE_KEY=your_clerk_key
```

## API Routes

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/:id` - Remove from cart

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Create Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details.
