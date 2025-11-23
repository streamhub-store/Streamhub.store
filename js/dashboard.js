// عرض الطلبات في لوحة التحكم
document.addEventListener('DOMContentLoaded', function() {
    renderOrders();
    
    // زر مسح الطلبات
    const clearBtn = document.getElementById('clear-orders');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearOrders);
    }
});

// عرض جميع الطلبات
function renderOrders() {
    const container = document.getElementById('orders-container');
    
    if (!container) return;
    
    const orders = JSON.parse(localStorage.getItem('StoreOrders')) || [];
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="order-card">
                <p>No Store orders found. Purchase a Store product to see your orders here.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    orders.forEach(order => {
        const orderCard = `
            <div class="order-card">
                <h4>${order.productName}</h4>
                <p class="order-date">${order.timestamp} — ${order.email}</p>
                <p><strong>Access code:</strong> <span class="access-code">${order.accessCode}</span></p>
            </div>
        `;
        container.innerHTML += orderCard;
    });
}

// مسح جميع الطلبات
function clearOrders() {
    if (confirm('Are you sure you want to clear all Store orders?')) {
        localStorage.removeItem('StoreOrders');
        renderOrders();
    }
}