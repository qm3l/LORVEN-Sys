
// state.js
// الحالة العامة للتطبيق
let products = [];
let invoices = [];
let customersDB = [];
let invoiceItems = [];

let currentPage = 'dashboard';
let charts = {};
let selectionMode = false;
let selectedProducts = [];

let currentPageNum = 1;
let itemsPerPage = 20;
let filteredProducts = [];
let selectedCategory = 'الكل';

let settings = {
    countryCode: '967',
    codeBehavior: 'prepend',
    whatsappTemplate: `أهلاً جميلة لورڤين: {firstName} .. ✨\n\nتم تسجيل طلبكِ بنجاح، ونحنُ بكل حُب نجهز تفاصيله الآن 🌸\n\n🆔 *رقم الطلب :* #{orderId}\n📅 *تاريخ الجمال :* {formattedDate}\n🛍  *مقتنياتكِ :*\n{items}\n\n✨ *قيمة الجمال :* {total} ريال\n\nممتنين لاختياركِ لورڤين ليكون جزءاً من جمالك .. 🤍`,
    storeName: 'LORVEN',
    logo: '',
    darkMode: 'auto',
    language: 'ar',
    appLock: 'on',
    pinCode: '1234'
};
