// معالجة صفحة تفاصيل المنتج
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على بيانات المنتج من الـ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // بيانات المنتجات (نفس البيانات السابقة)
    const products = [
        {
            id: 1,
            name: "Netflix Premium (Store) - 1 month",
            description: "HD + 4 screens. Store product only.",
            price: 17.99,
            type: "streaming",
            category: "streaming"
        },
        {
            id: 2,
            name: "Spotify Premium (Store) - 1 month",
            description: "Ad-free music. Store product only.",
            price: 9.99,
            type: "streaming",
            category: "streaming"
        },
        {
            id: 3,
            name: "Chill Pack: Netflix + Spotify (Store)",
            description: "Bundle Store: both services for one price.",
            price: 24.99,
            type: "bundle",
            category: "bundle"
        }
    ];
    
    // العثور على المنتج
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // تحديث واجهة المستخدم ببيانات المنتج
        updateProductDetails(product);
    } else {
        // إذا لم يتم العثور على المنتج
        document.getElementById('product-title').textContent = 'Product Not Found';
    }
});

function updateProductDetails(product) {
    // تحديث العنوان والوصف
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `$${product.price}`;
    document.getElementById('product-type').textContent = product.category === 'streaming' ? 'Streaming Service' : 'Bundle Package';
    
    // تحديث رابط الشراء
    const purchaseBtn = document.getElementById('purchase-btn');
    purchaseBtn.href = `checkout.html?product=${product.id}`;
    
    // تحديث الشارة
    const badge = document.querySelector('.product-badge');
    badge.textContent = product.category === 'streaming' ? 'Streaming Service' : 'Bundle Package';
    
    if (product.category === 'bundle') {
        badge.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
    }
}