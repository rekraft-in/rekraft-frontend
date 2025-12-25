#!/bin/bash

# Find the fetchFeaturedProducts function and update it
sed -i '' '570,590 {
  s/try {/try {\
    console.log(\"🔄 Fetching featured products...\");\
    const response = await apiService.getProducts();\
    console.log(\"📦 API Response:\", response);\
    \
    # Extract products from different response formats\
    let products = [];\
    if (Array.isArray(response)) {\
      products = response;\
    } else if (response && Array.isArray(response.data)) {\
      products = response.data;\
    } else if (response && response.success && Array.isArray(response.data)) {\
      products = response.data;\
    } else if (response && response.products) {\
      products = response.products;\
    }\
    \
    console.log(\`✅ Extracted \${products.length} products\`);\
    setFeaturedProducts(products);\
  } catch (error) {\
    console.error(\"❌ Error fetching featured products:\", error);\
    setFeaturedProducts([]);\
  } finally {\
    setLoading(false);\
  }/g
}' src/pages/HomePage.jsx
