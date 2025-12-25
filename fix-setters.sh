#!/bin/bash

echo "🔧 Fixing state setter issues..."

# Fix HomePage.jsx - change setProducts to setFeaturedProducts
echo "Fixing HomePage.jsx..."
sed -i '' "s/setProducts(products)/setFeaturedProducts(products)/g" src/pages/HomePage.jsx
sed -i '' "s/setProducts(\[\])/setFeaturedProducts([])/g" src/pages/HomePage.jsx

# Fix ShopPage.jsx - change setAllProducts to setProducts
echo "Fixing ShopPage.jsx..."
sed -i '' "s/setAllProducts(products)/setProducts(products)/g" src/pages/ShopPage.jsx
sed -i '' "s/setAllProducts(\[\])/setProducts([])/g" src/pages/ShopPage.jsx

echo "✅ State setters fixed!"
