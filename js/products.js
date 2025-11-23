// بيانات المنتجات مع الفئات
const products = [
    {
        id: 1,
        name: "Netflix Premium (Store) - 1 month",
        description: "HD + 4 screens. Store product only.",
        price: 17.99,
        type: "netflix",
        category: "streaming",
        features: ["HD Streaming", "4 Screens Simultaneously", "Store Access Only"],
        popular: true
    },
    {
        id: 2,
        name: "Spotify Premium (Store) - 1 month",
        description: "Ad-free music. Store product only.",
        price: 9.99,
        type: "spotify",
        category: "streaming", 
        features: ["Ad-free Music", "Offline Listening", "Store Access Only"],
        popular: true
    },
    {
        id: 3,
        name: "Disney+ Premium (Store) - 1 month",
        description: "All Disney content. Store product only.",
        price: 11.99,
        type: "disney",
        category: "streaming",
        features: ["All Disney Content", "4K Streaming", "Store Access Only"]
    },
    {
        id: 4,
        name: "Chill Pack: Netflix + Spotify (Store)",
        description: "Bundle Store: both services for one price.",
        price: 24.99,
        type: "bundle",
        category: "bundle",
        features: ["Both Services", "Combined Discount", "Store Access Only"]
    },
    {
        id: 5,
        name: "Entertainment Bundle (Store)",
        description: "Netflix, Spotify, Disney+ bundle.",
        price: 35.99,
        type: "bundle",
        category: "bundle",
        features: ["All Three Services", "Maximum Discount", "Store Access Only"]
    }
];

// عرض المنتجات في الصفحة الرئيسية (منتجين فقط)
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    
    if (!container) return;
    
    // أخذ أول منتجين فقط
    const featuredProducts = products.filter(product => product.popular).slice(0, 2);
    
    container.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price}</p>
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary">View Details</a>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// عرض جميع المنتجات في صفحة المنتجات
function renderAllProducts() {
    const container = document.getElementById('all-products-container');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = `
            <div class="product-card" data-category="${product.category}">
                <div class="product-badge">${product.category.toUpperCase()}</div>
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price}</p>
                <a href="product-detail.html?id=${product.id}" class="btn btn-primary">View Details</a>
            </div>
        `;
        container.innerHTML += productCard;
    });
    
    // إضافة event listeners للفلاتر
    setupCategoryFilters();
}

// إعداد فلاتر الفئات
function setupCategoryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

// تصفية المنتجات حسب الفئة
function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product-card');
    
    allProducts.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else {
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });
}

// عرض تفاصيل المنتج (كما هو)
function renderProductDetail() {
    const container = document.getElementById('product-detail');
    
    if (!container) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        container.innerHTML = '<p>Product not found</p>';
        return;
    }
    
    const featuresHTML = product.features.map(feature => 
        `<li>${feature}</li>`
    ).join('');
    
    container.innerHTML = `
        <div class="product-header">
            <span class="product-category">${product.category.toUpperCase()}</span>
            <h2>${product.name}</h2>
        </div>
        <p class="description">${product.description}</p>
        <p class="price">Price: $${product.price}</p>
        
        <div class="features-section">
            <h3>Features:</h3>
            <ul class="features-list">
                ${featuresHTML}
            </ul>
        </div>
        
        <a href="checkout.html?product=${product.id}" class="btn btn-primary btn-large">
            Proceed to Checkout (Store)
        </a>
    `;
}

// الحصول على منتج بالـ ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedProducts();    // للمنتجات المميزة في الرئيسية
    renderAllProducts();         // لجميع المنتجات في صفحة المنتجات
    renderProductDetail();       // لتفاصيل المنتج
});