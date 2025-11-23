// معالجة نموذج الدفع
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    const orderSummary = document.getElementById('order-summary');
    
    if (!checkoutForm || !orderSummary) return;
    
    // عرض ملخص الطلب
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('product'));
    const product = getProductById(productId);
    
    if (product) {
        orderSummary.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Price:</strong> $${product.price} (Store)</p>
        `;
        
        // تخزين المنتج في localStorage للاستخدام لاحقاً
        localStorage.setItem('currentProduct', JSON.stringify(product));
    }
    
    // معالجة إرسال النموذج
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(checkoutForm);
        const userData = {
            fullname: formData.get('fullname'),
            email: formData.get('email')
        };
        
        // محاكاة عملية الدفع
        simulatePayment(userData);
    });
});

// محاكاة الدفع
function simulatePayment(userData) {
    const product = JSON.parse(localStorage.getItem('currentProduct'));
    
    if (!product) {
        alert('Product not found!');
        return;
    }
    
    // إنشاء طلب
    const order = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        price: product.price,
        accessCode: generateAccessCode(product.type),
        timestamp: new Date().toLocaleString(),
        email: userData.email,
        fullname: userData.fullname
    };
    
    // حفظ الطلب
    saveOrder(order);
    
    // التوجيه إلى لوحة التحكم
    window.location.href = 'dashboard.html';
}

// حفظ الطلب في localStorage
function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('StoreOrders')) || [];
    orders.push(order);
    localStorage.setItem('StoreOrders', JSON.stringify(orders));
}