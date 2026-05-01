/**
 * Bites & Sips — QR Code Generator
 * Generates table-specific QR codes using qrcode.js
 */
document.addEventListener('DOMContentLoaded', () => {
    // ─── Theme Toggle ────────────────────────────────────────
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        icon.classList.toggle('fa-moon', theme === 'light');
        icon.classList.toggle('fa-sun', theme === 'dark');
    }

    // ─── Auto-fill base URL ──────────────────────────────────
    const baseUrlInput = document.getElementById('base-url');
    const currentUrl = window.location.href.replace(/qr-generator\.html.*$/, 'index.html');
    baseUrlInput.value = currentUrl;

    // ─── Elements ────────────────────────────────────────────
    const generateBtn = document.getElementById('generate-btn');
    const printAllBtn = document.getElementById('print-all-btn');
    const qrOutput = document.getElementById('qr-output');
    const qrGrid = document.getElementById('qr-grid');
    const numTablesInput = document.getElementById('num-tables');
    const prefixInput = document.getElementById('table-prefix');

    // ─── Generate QR Codes ───────────────────────────────────
    generateBtn.addEventListener('click', () => {
        const baseUrl = baseUrlInput.value.trim();
        const prefix = prefixInput.value.trim() || 'T';
        let numTables = parseInt(numTablesInput.value);

        if (!baseUrl) {
            alert('Please enter a base URL.');
            return;
        }

        if (isNaN(numTables) || numTables < 1) numTables = 1;
        if (numTables > 50) numTables = 50;

        // Clear previous
        qrGrid.innerHTML = '';
        qrOutput.classList.remove('hidden');
        printAllBtn.classList.remove('hidden');

        for (let i = 1; i <= numTables; i++) {
            const tableId = prefix + i;
            const separator = baseUrl.includes('?') ? '&' : '?';
            const fullUrl = baseUrl + separator + 'table=' + tableId;

            // Create card
            const card = document.createElement('div');
            card.className = 'qr-card';
            card.setAttribute('data-table', tableId);

            card.innerHTML = `
                <div class="qr-card-label">Table ${tableId}</div>
                <div class="qr-card-url">${fullUrl}</div>
                <div class="qr-code-wrapper" id="qr-${tableId}"></div>
                <button class="btn btn-outline print-single-btn" data-table="${tableId}">
                    <i class="fas fa-print"></i> Print
                </button>
            `;

            qrGrid.appendChild(card);

            // Generate QR code
            new QRCode(document.getElementById('qr-' + tableId), {
                text: fullUrl,
                width: 180,
                height: 180,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }

        // Attach single print handlers
        document.querySelectorAll('.print-single-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                printSingleCard(btn.dataset.table);
            });
        });

        // Smooth scroll to output
        setTimeout(() => {
            qrOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    });

    // ─── Print All ───────────────────────────────────────────
    printAllBtn.addEventListener('click', () => {
        window.print();
    });

    // ─── Print Single Card ───────────────────────────────────
    function printSingleCard(tableId) {
        const allCards = document.querySelectorAll('.qr-card');
        const targetCard = document.querySelector(`.qr-card[data-table="${tableId}"]`);
        if (!targetCard) return;

        // Hide all except target
        allCards.forEach(card => {
            if (card !== targetCard) {
                card.style.display = 'none';
            }
        });

        window.print();

        // Restore all
        allCards.forEach(card => {
            card.style.display = '';
        });
    }
});
