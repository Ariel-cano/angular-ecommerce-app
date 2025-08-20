# 🛒 Angular E-commerce Platform

A full-featured e-commerce application built with Angular 19+ that provides separate interfaces for buyers and sellers. The application uses json-server as a mock backend, making it perfect for development, learning, and demonstration purposes.

## 📖 About This Project

This Angular e-commerce platform demonstrates modern web development practices with a focus on user experience and code quality. The application features a sophisticated shopping cart system that persists user data through localStorage, allowing seamless transitions between authenticated and non-authenticated states. Whether you're a buyer looking for products or a seller managing inventory, this platform provides intuitive interfaces for both user types.

## ✨ Key Features

### 🛍️ For Buyers
- **Product Browsing**: Comprehensive catalog with search and filtering capabilities
- **Smart Cart Management**: Advanced cart system that persists across sessions using localStorage
- **Seamless Authentication**: Cart data automatically transfers when users log in or register
- **Order Management**: Complete checkout process with order tracking
- **User Authentication**: Secure registration and login system

### 👩‍💼 For Sellers
- **Seller Dashboard**: Dedicated interface for inventory management
- **Product Management**: Add, edit, and remove products with full CRUD operations
- **Inventory Control**: Real-time product listing management
- **Seller Authentication**: Separate authentication system for sellers

## 🛠️ Technology Stack

- **Frontend**: Angular 19+, TypeScript, RxJS
- **Styling**: SCSS, FontAwesome icons
- **Backend**: json-server (API simulation)
- **Forms**: Template-driven forms with custom validation directives
- **Routing**: Angular Router with route guards
- **Storage**: localStorage for cart persistence
- **Architecture**: Modular component-based design

## 🔧 Technical Highlights

- **Custom Validation Directives**: `appColorValidation`, `appUrlValidation`
- **Advanced Cart Logic**: Complex localStorage integration for cart persistence
- **Route Protection**: Secure navigation with route guards
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Architecture**: Clean separation of concerns with reusable components
- **Service Layer**: Dedicated services for data management and API communication

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Angular CLI
- json-server (for mock backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ariel-cano/angular-ecommerce-app.git
   cd angular-ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install json-server globally**
   ```bash
   npm install -g json-server
   ```
   
   📚 [json-server documentation](https://github.com/typicode/json-server)

4. **Start the mock backend**
   ```bash
   json-server --watch db.json
   ```
   The API will be available at `http://localhost:3000`

5. **Start the Angular development server**
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`

## 📱 Usage

1. **Access the Application**: Navigate to `http://localhost:4200`
2. **Browse Products**: Explore the product catalog as a guest user
3. **Add to Cart**: Products added to cart persist even without authentication
4. **Register/Login**: Create an account or log in to access full features
5. **Seller Access**: Use seller credentials to access the management dashboard

## 🗂️ Project Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   ├── validators/         # custom validators
│   ├── services/           # Data services and API communication
│   ├── guards/             # Route protection
│   ├── directives/         # Custom validation directives
│   └── models/             # TypeScript interfaces and models
```

## 🔮 Future Enhancements

- [ ] **Unit Testing**: Comprehensive test coverage with Jasmine/Karma
- [ ] **E2E Testing**: End-to-end testing with Cypress or Protractor
- [ ] **Favorites System**: Wishlist functionality for registered users
- [ ] **Advanced Analytics**: Seller dashboard with sales analytics
- [ ] **Payment Integration**: Real payment gateway integration
- [ ] **Product Reviews**: User review and rating system

## 📞 Contact

**Ariel Cano** - [@Ariel-cano](https://github.com/Ariel-cano)

Project Link: [https://github.com/Ariel-cano/angular-ecommerce-app](https://github.com/Ariel-cano/angular-ecommerce-app)

---

⭐ **Star this repository if you found it helpful!**
