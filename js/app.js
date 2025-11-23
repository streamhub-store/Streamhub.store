// التطبيق الرئيسي - تهيئة عامة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة التنقل النشط
    initNavigation();
    
    // أي كود إضافي للتطبيق
    console.log('StreamHub Store initialized');
});

// تهيئة التنقل النشط
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}