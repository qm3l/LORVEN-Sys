// importExport.js
// ---------- استيراد الملفات ----------
let importFileData = null;

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = e.target.result;
            // قراءة الملف بصيغة binary للحفاظ على الترميز الأصلي
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheet = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheet];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            
            // إصلاح ترميز النصوص العربية المشوهة
            importFileData = json.map(row => 
                row.map(cell => {
                    if (typeof cell === 'string' && /[Ø-Þ]/g.test(cell)) {
                        // تحويل من Latin1 إلى UTF-8
                        try {
                            const buf = new Uint8Array(cell.length);
                            for (let i = 0; i < cell.length; i++) {
                                buf[i] = cell.charCodeAt(i);
                            }
                            return new TextDecoder('utf-8').decode(buf);
                        } catch (e) {
                            return cell;
                        }
                    }
                    return cell;
                })
            );
            document.getElementById('importPreview').innerHTML = `<p style="font-weight:600; font-size:10px;">✔️ تم تحميل ${importFileData.length} صف</p>`;
        } catch (error) {
            console.error(error);
            document.getElementById('importPreview').innerHTML = '<p style="color:red; font-size:10px;">❌ فشل قراءة الملف</p>';
        }
    };
    reader.readAsBinaryString(file);
}

function confirmImport() {
    if (!importFileData || importFileData.length < 2) { alert(i18n[settings.language].emptyFile || 'الملف فارغ أو غير صحيح'); return; }
    const type = document.getElementById('importType').value;
    const rows = importFileData.slice(1).filter(r => r.length > 0 && r.some(c => c));
    if (type === 'products') {
        let added = 0;
        rows.forEach(row => {
            const barcode = row[0] ? row[0].toString() : generateBarcode();
            let name = row[1] || i18n[settings.language].productName;
            const stock = parseInt(row[2]) || 0;
            const price = parseFloat(row[3]) || 0;
            const cost = 0;
            const image = row[4] ? row[4].toString() : '';
            
            const category = guessCategory(name);
            
            const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 + added : 1 + added;
            products.push({ id: newId, name, barcode, price, cost, stock, category, icon: 'fa-box', image });
            added++;
        });
        saveProducts();
        showToast(settings.language === 'en' ? `${added} products imported` : `تم استيراد ${added} منتج`, '📦');
    } else if (type === 'invoices') {
        let added = 0;
        rows.forEach(row => {
            if (row.length < 4) return;
            const number = row[0] || `IMP-${Date.now()}-${added}`;
            const date = row[1] ? new Date(row[1]).toISOString() : new Date().toISOString();
            const customerName = row[2] || i18n[settings.language].customer;
            const customerPhone = row[3] ? row[3].toString() : '';
            const total = parseFloat(row[4]) || 0;
            const invoice = { number, date, customerName, customerPhone, items: [], subtotal: total, delivery: 0, profit: 0, total };
            invoices.push(invoice);
            added++;
        });
        saveInvoices();
        updateCustomersDB();
        showToast(settings.language === 'en' ? `${added} invoices imported` : `تم استيراد ${added} فاتورة`, '📄');
    }
    closeModal('importModal');
    importFileData = null;
    document.getElementById('importPreview').innerHTML = '';
    if (currentPage === 'products') renderProductsPage(document.getElementById('mainContent'));
    else if (currentPage === 'history') renderHistoryPage(document.getElementById('mainContent'));
}