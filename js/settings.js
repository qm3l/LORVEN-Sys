// ==================== settings.js ===================
// إعدادات التطبيق مع دعم الذكاء الاصطناعي

function renderSettingsPage(container) {
    // بناء قائمة الإعدادات الأساسية
    let itemsHtml = `
        <div class="settings-item" onclick="openModal('settingsGeneral')">
            <div class="settings-icon"><i class="fas fa-sliders-h"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].general}</div><div class="settings-subtitle">${i18n[settings.language].darkModeLabel}</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
        <div class="settings-item" onclick="openModal('settingsCountryCode')">
            <div class="settings-icon"><i class="fas fa-globe"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].countryCodeLabel}</div><div class="settings-subtitle" id="countryCodeDisplay">${settings.countryCode} (${settings.codeBehavior === 'prepend' ? i18n[settings.language].autoAdd : i18n[settings.language].asIs})</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
        <div class="settings-item" onclick="openModal('settingsTemplates')">
            <div class="settings-icon"><i class="fas fa-file-alt"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].messageTemplate}</div><div class="settings-subtitle">${i18n[settings.language].editWhatsApp}</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
        <div class="settings-item" onclick="openModal('settingsBackup')">
            <div class="settings-icon"><i class="fas fa-cloud-upload-alt"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].backup}</div><div class="settings-subtitle">${i18n[settings.language].exportImport}</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
        <div class="settings-item" onclick="openModal('settingsAds')">
            <div class="settings-icon"><i class="fas fa-bullhorn"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].adsSystem}</div><div class="settings-subtitle">${i18n[settings.language].sendOffers}</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
        <div class="settings-item" onclick="openModal('settingsCustomize')">
            <div class="settings-icon"><i class="fas fa-paint-brush"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].customize}</div><div class="settings-subtitle">${i18n[settings.language].storeLogo}</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
        <div class="settings-item" onclick="openModal('settingsSecurity')">
            <div class="settings-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="settings-content"><div class="settings-title">${i18n[settings.language].security}</div><div class="settings-subtitle">${i18n[settings.language].appLock}</div></div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
    `;

    // إضافة عنصر الذكاء الاصطناعي (مع تعديل اسم الدالة)
    itemsHtml += `
        <div class="settings-item" onclick="openGeminiSettings()">
            <div class="settings-icon"><i class="fas fa-brain"></i></div>
            <div class="settings-content">
                <div class="settings-title">${i18n[settings.language].aiSettings || 'إعدادات الذكاء'}</div>
                <div class="settings-subtitle">${i18n[settings.language].aiApiKey || 'تعيين مفتاح Gemini'}</div>
            </div>
            <div class="settings-arrow"><i class="fas fa-chevron-right"></i></div>
        </div>
    `;

    // تجميع الصفحة كاملة
    container.innerHTML = `
        <div style="margin-bottom:16px;">
            <h3 style="font-size:18px; font-weight:700; margin-bottom:4px;">⚙️ ${i18n[settings.language].settingsTitle}</h3>
            <p style="color:var(--gray-500); font-size:11px;">${i18n[settings.language].customizeHint}</p>
        </div>
        <div class="settings-list">
            ${itemsHtml}
        </div>
    `;
}

// دالة فتح نافذة إعدادات الذكاء الاصطناعي (Gemini)
window.openGeminiSettings = function() {
    const currentModel = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
    const currentTemp = localStorage.getItem('gemini_temperature') || 0.7;
    const lang = settings.language; // اللغة الحالية

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title"><i class="fas fa-brain"></i> ${i18n[lang].aiSettingsTitle || 'إعدادات الذكاء الاصطناعي (Gemini)'}</div>
                <div class="modal-close" onclick="this.closest('.modal').remove()">&times;</div>
            </div>
            <div class="modal-body">
                <p>${i18n[lang].aiApiKeyDesc || 'أدخل مفتاح API الخاص بـ Google Gemini. يمكنك الحصول عليه من <a href="https://aistudio.google.com/app/apikey" target="_blank">هنا</a>.'}</p>
                <div class="form-group">
                    <label class="form-label">${i18n[lang].geminiApiKey || 'مفتاح Gemini API'}</label>
                    <input type="password" class="form-control" id="geminiApiKey" value="${localStorage.getItem('gemini_api_key') || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">${i18n[lang].model || 'النموذج'}</label>
                    <select class="form-control" id="geminiModel">
                        <option value="gemini-2.5-flash" ${currentModel === 'gemini-2.5-flash' ? 'selected' : ''}>✨ Gemini 2.5 Flash (${i18n[lang].recommended || 'مُوصى به'})</option>
                        <option value="gemini-2.5-pro" ${currentModel === 'gemini-2.5-pro' ? 'selected' : ''}>🚀 Gemini 2.5 Pro</option>
                        <option value="gemini-2.0-flash" ${currentModel === 'gemini-2.0-flash' ? 'selected' : ''}>⚡ Gemini 2.0 Flash</option>
                        <option value="gemini-pro-latest" ${currentModel === 'gemini-pro-latest' ? 'selected' : ''}>🔮 Gemini Pro (${i18n[lang].latest || 'أحدث إصدار'})</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">${i18n[lang].temperature || 'درجة الحرارة (الإبداع)'} ${currentTemp}</label>
                    <input type="range" min="0" max="1" step="0.1" value="${currentTemp}" class="form-control" id="geminiTemperature" oninput="this.previousElementSibling.innerText = '${i18n[lang].temperature || 'درجة الحرارة (الإبداع)'} ' + this.value">
                </div>
                <button class="btn btn-primary" style="width:100%; margin-top: 10px;" onclick="saveGeminiSettings()">${i18n[lang].save || 'حفظ'}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

// دالة حفظ الإعدادات
window.saveGeminiSettings = function() {
    const key = document.getElementById('geminiApiKey').value.trim();
    const model = document.getElementById('geminiModel').value;
    const temp = parseFloat(document.getElementById('geminiTemperature').value);

    if (key) {
        localStorage.setItem('gemini_api_key', key);
        if (window.ai && window.ai.setApiKey) window.ai.setApiKey(key);
    } else {
        localStorage.removeItem('gemini_api_key');
    }

    localStorage.setItem('gemini_model', model);
    localStorage.setItem('gemini_temperature', temp);

    if (window.ai && window.ai.setModel) window.ai.setModel(model);
    // يمكن أيضاً تحديث AI_CONFIG.temperature

    alert('تم حفظ إعدادات الذكاء الاصطناعي');
    document.querySelector('.modal').remove();
};
// هذه الدالة تُستدعى فقط عند الحاجة
function loadCustomersIntoMonthlyModal() {
    const select = document.getElementById('monthlyCustomerSelect');
    if (!select) return; // إذا المودال مش مفتوح، لا تفعل شيء
    
    // نمنع تكرار التحميل (لو تم التحميل مرة واحدة)
    if (select.getAttribute('data-loaded') === 'true') return;
    
    // نحمل العملاء
    if (typeof customersDB !== 'undefined' && customersDB.length > 0) {
        select.innerHTML = customersDB.map(c => 
            `<option value="${c.phone}">${c.name} - ${c.phone}</option>`
        ).join('');
    } else {
        select.innerHTML = '<option value="">لا يوجد عملاء</option>';
    }
    
    // نضع علامة أنه تم التحميل
    select.setAttribute('data-loaded', 'true');
}
// دالة فتح مودال الفواتير الشهرية مع التحميل البطيء
window.openMonthlyInvoiceModal = function() {
    const select = document.getElementById('monthlyCustomerSelect');
    if (select) {
        if (!select.hasAttribute('data-loaded')) {
            if (typeof customersDB !== 'undefined' && customersDB.length > 0) {
                select.innerHTML = customersDB.map(c => `<option value="${c.phone}">${c.name} - ${c.phone}</option>`).join('');
            } else {
                select.innerHTML = '<option value="">لا يوجد عملاء</option>';
            }
            select.setAttribute('data-loaded', 'true');
        }
    }
    openModal('monthlyInvoiceModal');
};
