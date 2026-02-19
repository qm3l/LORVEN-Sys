// main.js
document.addEventListener('DOMContentLoaded', () => {
    // تحميل البيانات من التخزين المحلي
    loadData(); // من data.js

    // تهيئة الذكاء الاصطناعي إذا كان موجوداً
    if (window.ai && window.ai.init) {
        window.ai.init(); // يضيف إحصاءات المنتجات للسياق
    }

    // تطبيق الإعدادات المحفوظة (اللغة، الوضع الليلي، إلخ)
    applySettings(); // من i18n.js

    // عرض الصفحة الرئيسية
    switchPage('dashboard'); // من ui.js

    // تهيئة واجهة المستخدم (مثل إغلاق الدردشة بالنقر خارجها)
    if (window.initUI) {
        window.initUI();
    }

    // ربط الدوال العامة التي تُستخدم في onclick داخل HTML
    window.clearAllData = clearAllData;
    window.saveGeneral = saveGeneral;
    window.saveCountryCode = saveCountryCode;
    window.saveTemplate = saveTemplate;
    window.saveCustomization = saveCustomization;
    window.saveSecurity = saveSecurity;
    window.sendAds = sendAds;
    window.exportBackup = exportBackup;
    window.importBackup = importBackup;
    // يمكن إضافة المزيد حسب الحاجة
});
