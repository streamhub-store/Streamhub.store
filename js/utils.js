// توليد كود وصول عشوائي
function generateAccessCode(productType) {
    const prefixes = {
        'netflix': 'NET',
        'spotify': 'SPO', 
        'bundle': 'BUN'
    };
    
    const prefix = prefixes[productType] || 'DEM';
    const randomChars = Math.random().toString(36).substr(2, 8).toUpperCase();
    
    return `${prefix}-${randomChars}`;
}

// الحصول على منتج بالـ ID
function getProductById(id) {
    const products = [
        {
            id: 1,
            name: "Netflix Premium (Store) - 1 month",
            description: "HD + 4 screens. Store product only.",
            price: 17.99,
            type: "netflix",
            features: ["HD Streaming", "4 Screens Simultaneously", "Store Access Only"]
        },
        {
            id: 2,
            name: "Spotify Premium (Store) - 1 month",
            description: "Ad-free music. Store product only.",
            price: 9.99,
            type: "spotify",
            features: ["Ad-free Music", "Offline Listening", "Store Access Only"]
        },
        {
            id: 3,
            name: "Chill Pack: Netflix + Spotify (Store)",
            description: "Bundle Store: both services for one price.",
            price: 24.99,
            type: "bundle",
            features: ["Both Services", "Combined Discount", "Store Access Only"]
        }
    ];
    
    return products.find(product => product.id === id);
}