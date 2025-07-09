# 🛒 Grocery Management System - Frontend

A modern, responsive web application for managing grocery inventory, sales, and product categories. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 📊 Dashboard
- **Overview Statistics**: Total products, today's sales, and low stock alerts
- **Interactive Charts**: Visual representation of inventory and sales data
- **Real-time Updates**: Live data from the backend API

### 📦 Product Management
- **Inventory Tracking**: Monitor product quantities and stock levels
- **Expiry Date Management**: Track product expiration dates with color-coded badges
- **Stock Entry**: Add new products with supplier information
- **Product Categories**: Organize products by categories
- **Status Indicators**: Visual badges for product status (fresh, expiring soon, expired, etc.)

### 🏷️ Category Management
- **Category CRUD**: Create, read, update, and delete product categories
- **Status Management**: Enable/disable categories as needed

### 💰 Sales Management
- **Sales Tracking**: Monitor daily and historical sales data
- **Revenue Analytics**: Track revenue and sales performance

### 🔐 Authentication
- **User Registration**: Secure user account creation
- **Login System**: JWT-based authentication
- **Protected Routes**: Secure access to application features
- **Auto-logout**: Automatic logout on token expiration

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.0** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.6.3** - Client-side routing

### UI Components & Libraries
- **Radix UI** - Accessible UI primitives
- **Tabler Icons** - Beautiful icon library
- **React Table** - Powerful table component
- **ApexCharts** - Interactive charts and graphs
- **React Select** - Enhanced select components
- **Lottie React** - Animation support
- **Motion** - Animation library

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   ├── Models/         # Modal components
│   │   ├── Pages/          # Page components
│   │   │   ├── DashBoard/  # Dashboard page
│   │   │   ├── Products/   # Product management
│   │   │   ├── Category/   # Category management
│   │   │   └── Sales/      # Sales management
│   │   ├── ui/             # Reusable UI components
│   │   ├── Chart.tsx       # Chart component
│   │   ├── ProductTable.tsx # Product table
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── StockEntryProductList.tsx
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── router/             # Routing configuration
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── animations/         # Animation configurations
├── assets/                 # Static assets
├── App.tsx                 # Main app component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd grocery-management-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3002`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Configuration

### Vite Configuration
The project uses Vite with the following configuration:
- React plugin for Fast Refresh
- Path aliases for cleaner imports (`@` points to `src/app/components`)
- Development server on port 3002
- Auto-open browser on start

### Tailwind CSS
- Custom color scheme and design system
- Responsive design utilities
- Custom component classes

### TypeScript
- Strict type checking enabled
- Path mapping for better import experience
- Separate configs for app and node environments

## 📱 Features in Detail

### Product Status System
The application uses a sophisticated status system for products:

- **Fresh** (Green): Products with good shelf life
- **Expiring Soon** (Pink): Products approaching expiration
- **Expires Today** (Yellow): Products expiring today
- **Expired** (Red): Products past expiration date
- **Out of Stock** (Gray): Products with zero quantity
- **Invalid** (Indigo): Products with invalid data

### Responsive Design
- Mobile-first approach
- Responsive tables and components
- Touch-friendly interface
- Adaptive layouts for different screen sizes

### Real-time Features
- Live data updates from API
- Automatic token refresh
- Error handling with user feedback
- Loading states and skeleton screens

## 🔒 Security Features

- JWT-based authentication
- Protected routes with automatic redirect
- Token expiration handling
- Secure API communication
- Input validation and sanitization

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Theme support (if implemented)
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant components
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error messages

## 📊 API Integration

The application integrates with a backend API through:
- Axios HTTP client
- Automatic token injection
- Request/response interceptors
- Error handling and retry logic

## 🧪 Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Component-based architecture

### Best Practices
- Custom hooks for reusable logic
- Context for state management
- Lazy loading for better performance
- Error boundaries for error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v0.0.0** - Initial release with core features
  - Dashboard with statistics
  - Product management
  - Category management
  - Sales tracking
  - Authentication system

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
