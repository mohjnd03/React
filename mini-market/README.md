1)the any thing that have to do with the API is in the api folder from data to category and fetching 
2)context file for the Cart detils and the author detils about the product 
3)language have ar and en
4)Pages all in the same file
5)User have the User.json a small server that have email password and the wishlast and favirte items for the user
#####How to run 
1)npx json-server --watch src\Users\Users.json --port 3001
2)npm start

src/
├── api/                  # API-related files: endpoints, data fetching, product cards
│   ├── api.js            # API endpoints configuration
│   ├── DataFetcher.js    # Reusable fetch component with loading/error states
│   └── ProductCard.js    # Product card UI with cart/wishlist/favorites actions
├── context/              # Context providers for global state
│   ├── AuthContext.js    # Authentication, wishlist, favorites management
│   └── CartContext.js    # Cart items, add/remove/clear logic
├── language/             # i18n translation files
│   ├── ar.json           # Arabic translations
│   └── en.json           # English translations
├── Pages/                # All page components
│   ├── Cart.js           # Cart page
│   ├── Favorites.js      # Favorites list page
│   ├── Home.js           # Product catalog home page
│   ├── Login.js          # Login form
│   ├── NotFound.js       # 404 page
│   ├── ProductDetails.js # Single product details
│   ├── Register.js       # Registration form
│   └── Wishlist.js       # Wishlist page
├── Users/                # Local user data for JSON server
│   └── Users.json        # JSON file with user data (email, password, wishlist, favorites)
├── App.js                # Main app with routing and providers
├── i18n.js               # i18next configuration
├── index.js              # Entry point with ReactDOM and Suspense
├── Navbar.js             # Navigation bar with search, theme/language toggles, badges
└── ...                   # Other files (e.g., index.css, reportWebVitals.js)