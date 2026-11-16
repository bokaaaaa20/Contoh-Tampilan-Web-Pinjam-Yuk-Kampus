let currentUser = null;
        try {
            currentUser = JSON.parse(localStorage.getItem('pyk_unindra_user')) || null;
        } catch (e) {
            currentUser = null;
        }

        function getInitials(name) {
            return name
                .split(' ')
                .slice(0, 2)
                .map(w => w[0]?.toUpperCase() || '')
                .join('');
        }

        function renderAuthUI() {
            const container = document.getElementById('authHeaderContainer');
            if (!container) return;

            if (!currentUser) {
                // Tampilan jika BELUM login
                container.innerHTML = `
                    <button onclick="openLoginModal()" class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all">
                        <i data-lucide="log-in" class="w-4 h-4 text-gold-400"></i>
                        <span>Masuk KTM</span>
                    </button>
                `;
            } else {
                // Tampilan jika SUDAH login
                container.innerHTML = `
                    <div class="flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl px-2.5 sm:px-3 py-1.5">
                        <div class="w-8 h-8 rounded-xl bg-unindra-100 text-unindra-700 font-display font-extrabold text-xs flex items-center justify-center shrink-0">
                            ${getInitials(currentUser.name)}
                        </div>
                        <div class="hidden sm:block text-left">
                            <div class="flex items-center gap-1">
                                <span class="text-xs font-bold text-slate-900 leading-none">${currentUser.name}</span>
                                <i data-lucide="badge-check" class="w-3.5 h-3.5 text-unindra-600 fill-unindra-100" title="Terverifikasi KTM UNINDRA"></i>
                            </div>
                            <span class="text-[10px] text-slate-500 font-mono block mt-0.5">${currentUser.npm} • ${currentUser.prodi}</span>
                        </div>
                        <button onclick="handleLogout()" title="Keluar Akun" class="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
                            <i data-lucide="log-out" class="w-4 h-4"></i>
                        </button>
                    </div>
                `;
            }
            lucide.createIcons();
        }

        function openLoginModal() {
            document.getElementById('loginModal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeLoginModal() {
            document.getElementById('loginModal').classList.add('hidden');
        }

        function fillDemoAccount() {
            document.getElementById('loginNpmInput').value = '202443501146';
            document.getElementById('loginNameInput').value = 'Mundzir T. Tsaqif';
            document.getElementById('loginProdiInput').value = 'Teknik Informatika';
            document.getElementById('loginPassInput').value = 'unindra123';
        }

        function handleLoginSubmit(e) {
            e.preventDefault();
            const npm = document.getElementById('loginNpmInput').value.trim();
            const name = document.getElementById('loginNameInput').value.trim();
            const prodi = document.getElementById('loginProdiInput').value;

            currentUser = { npm, name, prodi };
            try {
                localStorage.setItem('pyk_unindra_user', JSON.stringify(currentUser));
            } catch (err) {}

            closeLoginModal();
            renderAuthUI();
            showToast(`Selamat datang, ${name} (${npm})!`);
        }

        function handleLogout() {
            currentUser = null;
            try {
                localStorage.removeItem('pyk_unindra_user');
            } catch (err) {}
            renderAuthUI();
            switchMainTab('katalog');
            showToast('Anda telah keluar dari akun mahasiswa.');
        }

        // Helper wajib login sebelum aksi transaksi / pasang barang
        function requireAuth(actionLabel = 'melanjutkan') {
            if (!currentUser) {
                showToast(`Silakan masuk dengan KTM UNINDRA untuk ${actionLabel}.`);
                openLoginModal();
                return false;
            }
            return true;
        }

        // ==================== DATA KATALOG & TRANSAKSI ====================
        let itemsData = [
            {
                id: 1,
                name: 'Kalkulator Ilmiah Casio fx-991EX',
                category: 'Akademik',
                type: 'gratis',
                price: 0,
                condition: 'Mulus 98%, tombol empuk, baterai baru diganti. Siap untuk ujian Kalkulus/Statistika.',
                owner: 'Rafa Aqila R.',
                prodi: 'Teknik Informatika',
                rating: '4.9',
                campus: 'Kampus B',
                codDefault: 'Kantin Utama Kampus B (Gedong)',
                available: true,
                featured: false,
                ownedByMe: false,
                icon: 'calculator',
                colorClass: 'bg-sky-100 text-sky-600'
            },
            {
                id: 2,
                name: 'Proyektor Epson EB-X500 + Kabel HDMI',
                category: 'Kegiatan Organisasi',
                type: 'berbayar',
                price: 30000,
                condition: 'Cahaya terang 3600 lumens, lengkap dengan tas, remote, dan kabel HDMI 3 meter.',
                owner: 'Adit Wijaya',
                prodi: 'Teknik Informatika',
                rating: '5.0',
                campus: 'Kampus B',
                codDefault: 'Sekretariat UKM / Lobi Gedung 3 Kampus B',
                available: true,
                featured: true,
                ownedByMe: false,
                icon: 'projector',
                colorClass: 'bg-amber-100 text-amber-600'
            },
            {
                id: 3,
                name: 'Kamera Canon EOS M50 + Lensa Kit',
                category: 'Elektronik',
                type: 'berbayar',
                price: 50000,
                condition: 'Hasil tajam 4K, termasuk 2 baterai, charger, tas kamera, dan SD Card 32GB.',
                owner: 'Mundzir T. Tsaqif',
                prodi: 'Teknik Informatika',
                rating: '5.0',
                campus: 'Kampus A',
                codDefault: 'Perpustakaan Kampus A (Tanjung Barat)',
                available: true,
                featured: true,
                ownedByMe: true,
                icon: 'camera',
                colorClass: 'bg-indigo-100 text-indigo-600'
            },
            {
                id: 4,
                name: 'Buku Referensi Kalkulus & Aljabar Linear',
                category: 'Akademik',
                type: 'gratis',
                price: 0,
                condition: 'Edisi lengkap dengan catatan rumus penting, halaman bersih tanpa sobekan.',
                owner: 'Naufal Agung P.',
                prodi: 'Teknik Informatika',
                rating: '4.9',
                campus: 'Kampus A',
                codDefault: 'Perpustakaan Kampus A (Tanjung Barat)',
                available: true,
                featured: false,
                ownedByMe: false,
                icon: 'book-open',
                colorClass: 'bg-emerald-100 text-emerald-600'
            },
            {
                id: 5,
                name: 'Tripod Takara ECO-193A (Tinggi 160cm)',
                category: 'Kegiatan Organisasi',
                type: 'berbayar',
                price: 15000,
                condition: 'Ringan dan kokoh, sudah termasuk holder HP dan tas sarung tripod.',
                owner: 'M. Fakhri F.',
                prodi: 'Teknik Informatika',
                rating: '4.8',
                campus: 'Kampus B',
                codDefault: 'Kantin Utama Kampus B (Gedong)',
                available: true,
                featured: false,
                ownedByMe: false,
                icon: 'video',
                colorClass: 'bg-purple-100 text-purple-600'
            },
            {
                id: 6,
                name: 'Jas Hujan Setelan & Payung Lipat',
                category: 'Kebutuhan Harian',
                type: 'gratis',
                price: 0,
                condition: 'Bersih & kering, sangat membantu saat hujan deras menjelang pulang kuliah malam.',
                owner: 'Siti Nurhaliza',
                prodi: 'Pendidikan Bahasa Inggris',
                rating: '4.9',
                campus: 'Kampus B',
                codDefault: 'Kantin Utama Kampus B (Gedong)',
                available: true,
                featured: false,
                ownedByMe: false,
                icon: 'umbrella',
                colorClass: 'bg-teal-100 text-teal-600'
            },
            {
                id: 7,
                name: 'Laptop Lenovo ThinkPad X280 (Core i5)',
                category: 'Elektronik',
                type: 'berbayar',
                price: 40000,
                condition: 'RAM 8GB, SSD 256GB, terinstal VS Code, Office, & Figma. Baterai awet 4 jam.',
                owner: 'Mundzir T. Tsaqif',
                prodi: 'Teknik Informatika',
                rating: '5.0',
                campus: 'Kampus B',
                codDefault: 'Lobi Gedung 3 Kampus B',
                available: true,
                featured: true,
                ownedByMe: true,
                icon: 'laptop',
                colorClass: 'bg-blue-100 text-blue-600'
            },
            {
                id: 8,
                name: 'Speaker Portable JBL Flip 5',
                category: 'Kegiatan Organisasi',
                type: 'berbayar',
                price: 25000,
                condition: 'Suara bass jernih untuk latihan teater, rapat himpunan, atau acara kelas.',
                owner: 'Dimas Pratama',
                prodi: 'Desain Komunikasi Visual',
                rating: '4.8',
                campus: 'Kampus A',
                codDefault: 'Lobi Gedung Utama Kampus A',
                available: true,
                featured: false,
                ownedByMe: false,
                icon: 'speaker',
                colorClass: 'bg-rose-100 text-rose-600'
            }
        ];

        let myTransactions = [
            {
                txId: 'PYK-2026-101',
                itemId: 1,
                itemName: 'Kalkulator Ilmiah Casio fx-991EX',
                category: 'Akademik',
                type: 'gratis',
                owner: 'Rafa Aqila R.',
                startDate: '2026-11-17',
                duration: 2,
                codPoint: 'Kantin Utama Kampus B (Gedong)',
                totalPrice: 0,
                ownerShare: 0,
                platformFee: 0,
                step: 3, // Sedang Dipinjam
                reviewed: false
            },
            {
                txId: 'PYK-2026-102',
                itemId: 2,
                itemName: 'Proyektor Epson EB-X500 + Kabel HDMI',
                category: 'Kegiatan Organisasi',
                type: 'berbayar',
                owner: 'Adit Wijaya',
                startDate: '2026-11-18',
                duration: 1,
                codPoint: 'Sekretariat UKM / Lobi Gedung 3 Kampus B',
                totalPrice: 30000,
                ownerShare: 27000,
                platformFee: 3000,
                step: 1, // Menunggu Persetujuan
                reviewed: false
            }
        ];

        let filters = {
            search: '',
            category: 'Semua',
            type: 'Semua',
            campus: 'Semua'
        };

        let activeDetailItem = null;
        let activeReviewTxId = null;
        let lenderEarnings = {
            net: 135000,
            fee: 15000
        };

        // ==================== HELPERS ====================
        function formatRp(num) {
            return 'Rp' + Number(num).toLocaleString('id-ID');
        }

        function showToast(msg) {
            const box = document.getElementById('toastBox');
            document.getElementById('toastText').textContent = msg;
            box.classList.remove('translate-y-24', 'opacity-0');
            setTimeout(() => {
                box.classList.add('translate-y-24', 'opacity-0');
            }, 3400);
        }

        // ==================== MAIN TAB NAVIGATION ====================
        function switchMainTab(tabName) {
            // Wajib login jika membuka Transaksi Saya atau Dompet Lender
            if ((tabName === 'transaksi' || tabName === 'lender') && !requireAuth('mengakses menu ini')) {
                return;
            }

            ['katalog', 'transaksi', 'lender'].forEach(t => {
                document.getElementById('view-' + t).classList.add('hidden');

                // Desktop tab style
                const dTab = document.getElementById('deskTab-' + t);
                if (t === tabName) {
                    dTab.classList.add('border-unindra-600', 'text-unindra-700', 'font-semibold');
                    dTab.classList.remove('border-transparent', 'text-slate-500', 'font-medium');
                } else {
                    dTab.classList.remove('border-unindra-600', 'text-unindra-700', 'font-semibold');
                    dTab.classList.add('border-transparent', 'text-slate-500', 'font-medium');
                }

                // Mobile tab style
                const mTab = document.getElementById('mobTab-' + t);
                if (t === tabName) {
                    mTab.classList.add('text-unindra-600', 'font-bold');
                    mTab.classList.remove('text-slate-400', 'font-medium');
                } else {
                    mTab.classList.remove('text-unindra-600', 'font-bold');
                    mTab.classList.add('text-slate-400', 'font-medium');
                }
            });

            document.getElementById('view-' + tabName).classList.remove('hidden');

            if (tabName === 'transaksi') renderTransactions();
            if (tabName === 'lender') renderLenderDashboard();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ==================== SEARCH & FILTERS ====================
        document.getElementById('desktopSearchInput').addEventListener('input', (e) => {
            filters.search = e.target.value.toLowerCase();
            document.getElementById('mobileSearchInput').value = e.target.value;
            renderCatalog();
        });

        document.getElementById('mobileSearchInput').addEventListener('input', (e) => {
            filters.search = e.target.value.toLowerCase();
            document.getElementById('desktopSearchInput').value = e.target.value;
            renderCatalog();
        });

        function setFilter(key, val) {
            filters[key] = val;

            if (key === 'category') {
                document.querySelectorAll('.cat-pill').forEach(btn => {
                    if (btn.textContent.trim() === val) {
                        btn.classList.add('bg-unindra-600', 'text-white');
                        btn.classList.remove('bg-slate-100', 'text-slate-600');
                    } else {
                        btn.classList.remove('bg-unindra-600', 'text-white');
                        btn.classList.add('bg-slate-100', 'text-slate-600');
                    }
                });
            }

            if (key === 'type') {
                document.querySelectorAll('.type-pill').forEach(btn => {
                    const txt = btn.textContent.toLowerCase();
                    const isMatch = (val === 'Semua' && txt === 'semua') ||
                                    (val === 'gratis' && txt.includes('gratis')) ||
                                    (val === 'berbayar' && txt.includes('berbayar'));
                    if (isMatch) {
                        btn.classList.add('bg-slate-900', 'text-white');
                        btn.classList.remove('bg-emerald-50', 'text-emerald-700', 'bg-amber-50', 'text-amber-800');
                    } else {
                        btn.classList.remove('bg-slate-900', 'text-white');
                        if (txt.includes('gratis')) btn.classList.add('bg-emerald-50', 'text-emerald-700');
                        if (txt.includes('berbayar')) btn.classList.add('bg-amber-50', 'text-amber-800');
                    }
                });
            }

            renderCatalog();
        }

        // ==================== RENDER CATALOG & FEATURED ====================
        function buildItemCard(item, isFeaturedCard = false) {
            const priceBadge = item.type === 'gratis'
                ? `<span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-xs">Gratis (Rp0)</span>`
                : `<span class="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-extrabold text-xs">${formatRp(item.price)}<span class="font-normal text-[10px]">/hari</span></span>`;

            const promoBadge = item.featured
                ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold-500 text-white font-bold text-[10px] uppercase tracking-wider shadow-2xs">
                       <i data-lucide="sparkles" class="w-2.5 h-2.5"></i> Promosi
                   </span>`
                : '';

            return `
                <div class="bg-white border ${isFeaturedCard ? 'border-gold-400/70 ring-1 ring-gold-400/30' : 'border-slate-200/90'} rounded-3xl p-5 flex flex-col justify-between hover:shadow-lg hover:border-unindra-300 transition-all group">
                    <div class="space-y-3.5">
                        <!-- Top Visual & Badges -->
                        <div class="flex items-start justify-between gap-2">
                            <div class="w-14 h-14 rounded-2xl ${item.colorClass} flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                                <i data-lucide="${item.icon}" class="w-7 h-7"></i>
                            </div>
                            <div class="flex flex-col items-end gap-1.5">
                                ${priceBadge}
                                ${promoBadge}
                            </div>
                        </div>

                        <!-- Category & Title -->
                        <div>
                            <div class="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                                <span>${item.category}</span>
                                <span class="text-emerald-600 flex items-center gap-1">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Tersedia
                                </span>
                            </div>
                            <h3 class="font-display font-bold text-base text-slate-900 mt-1 line-clamp-1 group-hover:text-unindra-600 transition-colors">
                                ${item.name}
                            </h3>
                            <p class="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                                ${item.condition}
                            </p>
                        </div>
                    </div>

                    <!-- Owner & Location Footer -->
                    <div class="pt-4 mt-4 border-t border-slate-100 space-y-3">
                        <div class="flex items-center justify-between text-xs">
                            <div class="flex items-center gap-1.5 min-w-0">
                                <i data-lucide="badge-check" class="w-4 h-4 text-unindra-600 shrink-0"></i>
                                <span class="font-semibold text-slate-800 truncate">${item.owner}</span>
                            </div>
                            <span class="font-bold text-gold-600 shrink-0">★ ${item.rating}</span>
                        </div>

                        <div class="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-unindra-600 shrink-0"></i>
                            <span class="truncate">${item.campus} • ${item.codDefault.split('(')[0]}</span>
                        </div>

                        <button onclick="openDetailModal(${item.id})" class="w-full py-2.5 rounded-xl ${item.type === 'gratis' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-unindra-600 hover:bg-unindra-700'} text-white font-semibold text-xs shadow-xs transition-colors">
                            ${item.type === 'gratis' ? 'Pinjam Gratis Sekarang' : 'Lihat Detail & Sewa'}
                        </button>
                    </div>
                </div>
            `;
        }

        function renderCatalog() {
            const featuredItems = itemsData.filter(i => i.featured);
            document.getElementById('featuredContainer').innerHTML = featuredItems.map(i => buildItemCard(i, true)).join('');

            const filtered = itemsData.filter(item => {
                const matchSearch = item.name.toLowerCase().includes(filters.search) ||
                                    item.condition.toLowerCase().includes(filters.search) ||
                                    item.owner.toLowerCase().includes(filters.search);
                const matchCat = filters.category === 'Semua' || item.category === filters.category;
                const matchType = filters.type === 'Semua' || item.type === filters.type;
                const matchCampus = filters.campus === 'Semua' || item.campus === filters.campus;
                return matchSearch && matchCat && matchType && matchCampus;
            });

            document.getElementById('catalogCountLabel').textContent = `Menampilkan ${filtered.length} barang`;

            const grid = document.getElementById('catalogGrid');
            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-2">
                        <p class="font-display font-bold text-slate-800">Barang belum ditemukan</p>
                        <p class="text-xs text-slate-500">Coba ubah kata kunci pencarian atau reset filter kategori/kampus.</p>
                    </div>
                `;
            } else {
                grid.innerHTML = filtered.map(i => buildItemCard(i, false)).join('');
            }

            lucide.createIcons();
        }

        // ==================== MODAL 1: DETAIL & BOOKING ====================
        function openDetailModal(itemId) {
            activeDetailItem = itemsData.find(i => i.id === itemId);
            if (!activeDetailItem) return;

            document.getElementById('detCatBadge').textContent = activeDetailItem.category;
            const typeBadge = document.getElementById('detTypeBadge');
            if (activeDetailItem.type === 'gratis') {
                typeBadge.textContent = 'Peminjaman Gratis (Rp0)';
                typeBadge.className = 'px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs';
            } else {
                typeBadge.textContent = 'Sewa ' + formatRp(activeDetailItem.price) + '/hari';
                typeBadge.className = 'px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs';
            }

            const iconBox = document.getElementById('detIconBox');
            iconBox.className = `w-20 h-20 rounded-2xl ${activeDetailItem.colorClass} flex items-center justify-center shrink-0`;
            iconBox.innerHTML = `<i data-lucide="${activeDetailItem.icon}" class="w-10 h-10"></i>`;

            document.getElementById('detTitle').textContent = activeDetailItem.name;
            document.getElementById('detCondition').textContent = activeDetailItem.condition;
            document.getElementById('detOwner').textContent = `${activeDetailItem.owner} (${activeDetailItem.prodi})`;
            document.getElementById('detRating').textContent = `★ ${activeDetailItem.rating}`;
            document.getElementById('detLocation').textContent = `• ${activeDetailItem.campus}`;
            document.getElementById('detCodPoint').value = activeDetailItem.codDefault;
            document.getElementById('detDuration').value = '1';
            document.getElementById('detNotes').value = '';

            updateDetailPricing();
            document.getElementById('detailModal').classList.remove('hidden');
            lucide.createIcons();
        }

        function closeDetailModal() {
            document.getElementById('detailModal').classList.add('hidden');
        }

        function updateDetailPricing() {
            if (!activeDetailItem) return;
            const days = parseInt(document.getElementById('detDuration').value, 10);
            const box = document.getElementById('detPricingBox');

            if (activeDetailItem.type === 'gratis') {
                box.className = 'rounded-2xl p-4 bg-emerald-50 border border-emerald-200 space-y-1.5 text-xs';
                box.innerHTML = `
                    <div class="flex justify-between font-bold text-emerald-900 text-sm">
                        <span>Total Biaya Peminjaman (${days} Hari)</span>
                        <span>Rp0 (Gratis)</span>
                    </div>
                    <p class="text-emerald-700 leading-relaxed">
                        Layanan berbagi sesama mahasiswa UNINDRA. Peminjam berkomitmen menjaga kondisi barang dan mengembalikan tepat waktu sesuai jadwal.
                    </p>
                `;
            } else {
                const total = activeDetailItem.price * days;

                box.className = 'rounded-2xl p-4 bg-unindra-50 border border-unindra-200 space-y-2 text-xs';
                box.innerHTML = `
                    <div class="flex justify-between text-slate-700">
                        <span>Tarif Sewa (${formatRp(activeDetailItem.price)} × ${days} hari)</span>
                        <span class="font-semibold text-slate-900">${formatRp(total)}</span>
                    </div>
                    <div class="flex justify-between font-display font-extrabold text-sm text-unindra-900 pt-2 border-t border-unindra-200">
                        <span>Total Dibayar Peminjam</span>
                        <span>${formatRp(total)}</span>
                    </div>
                `;
            }
        }

        function confirmBooking() {
            if (!requireAuth('mengajukan peminjaman/sewa')) return;
            if (!activeDetailItem) return;

            const days = parseInt(document.getElementById('detDuration').value, 10);
            const startDate = document.getElementById('detStartDate').value;
            const codPoint = document.getElementById('detCodPoint').value;

            const total = activeDetailItem.price * days;
            const fee = Math.round(total * 0.10);
            const ownerShare = total - fee;

            const newTx = {
                txId: 'PYK-2026-' + (101 + myTransactions.length),
                itemId: activeDetailItem.id,
                itemName: activeDetailItem.name,
                category: activeDetailItem.category,
                type: activeDetailItem.type,
                owner: activeDetailItem.owner,
                startDate: startDate,
                duration: days,
                codPoint: codPoint,
                totalPrice: total,
                ownerShare: ownerShare,
                platformFee: fee,
                step: 1,
                reviewed: false
            };

            myTransactions.unshift(newTx);
            updateTxBadges();
            closeDetailModal();
            switchMainTab('transaksi');
            showToast(`Pengajuan "${activeDetailItem.name}" berhasil dikirim ke pemilik!`);
        }

        // ==================== MODAL 2: + PASANG BARANG ====================
        function openAddItemModal(precheckPromo = false) {
            if (!requireAuth('memasang barang')) return;
            document.getElementById('addItemForm').reset();
            document.getElementById('newItemFeatured').checked = precheckPromo;
            toggleNewItemPrice();
            previewLenderCut();
            document.getElementById('addItemModal').classList.remove('hidden');
        }

        function closeAddItemModal() {
            document.getElementById('addItemModal').classList.add('hidden');
        }

        function toggleNewItemPrice() {
            const type = document.querySelector('input[name="serviceType"]:checked').value;
            const priceGroup = document.getElementById('newItemPriceGroup');
            if (type === 'gratis') {
                priceGroup.classList.add('hidden');
            } else {
                priceGroup.classList.remove('hidden');
            }
        }

        function previewLenderCut() {
            const price = parseInt(document.getElementById('newItemPrice').value || 0, 10);
            const net = Math.round(price * 0.90);
            const fee = price - net;
            document.getElementById('lenderCutPreview').innerHTML =
                `Estimasi bersih untuk Anda (90%): <strong>${formatRp(net)}</strong> / hari (Komisi platform 10%: ${formatRp(fee)})`;
        }

        function handleAddItemSubmit(e) {
            e.preventDefault();
            if (!requireAuth('mempublikasikan barang')) return;

            const name = document.getElementById('newItemName').value.trim();
            const cat = document.getElementById('newItemCat').value;
            const campus = document.getElementById('newItemCampus').value;
            const type = document.querySelector('input[name="serviceType"]:checked').value;
            const price = type === 'gratis' ? 0 : parseInt(document.getElementById('newItemPrice').value, 10);
            const desc = document.getElementById('newItemDesc').value.trim();
            const featured = document.getElementById('newItemFeatured').checked;

            const iconMap = {
                'Akademik': { icon: 'book-open', color: 'bg-sky-100 text-sky-600' },
                'Elektronik': { icon: 'laptop', color: 'bg-indigo-100 text-indigo-600' },
                'Kegiatan Organisasi': { icon: 'projector', color: 'bg-amber-100 text-amber-600' },
                'Kebutuhan Harian': { icon: 'umbrella', color: 'bg-teal-100 text-teal-600' }
            };

            const newItem = {
                id: itemsData.length + 1,
                name: name,
                category: cat,
                type: type,
                price: price,
                condition: desc,
                owner: currentUser.name,
                prodi: currentUser.prodi,
                rating: '5.0',
                campus: campus,
                codDefault: campus === 'Kampus A' ? 'Perpustakaan Kampus A (Tanjung Barat)' : 'Kantin Utama Kampus B (Gedong)',
                available: true,
                featured: featured,
                ownedByMe: true,
                icon: iconMap[cat].icon,
                colorClass: iconMap[cat].color
            };

            itemsData.unshift(newItem);
            closeAddItemModal();
            switchMainTab('katalog');
            renderCatalog();

            const msg = featured
                ? `"${name}" berhasil dipublikasikan & dipromosikan di beranda (+Rp5.000)!`
                : `"${name}" berhasil ditambahkan ke katalog UNINDRA!`;
            showToast(msg);
        }

        // ==================== TAB 2: TRANSAKSI SAYA ====================
        function updateTxBadges() {
            const activeCount = myTransactions.filter(t => t.step < 4 || !t.reviewed).length;
            document.getElementById('deskTxBadge').textContent = activeCount;
            document.getElementById('mobTxBadge').textContent = activeCount;
        }

        function renderTransactions() {
            const container = document.getElementById('myTransactionsList');
            updateTxBadges();

            container.innerHTML = myTransactions.map(tx => {
                const steps = [
                    { num: 1, label: 'Menunggu Persetujuan' },
                    { num: 2, label: 'Serah Terima & Foto Kondisi' },
                    { num: 3, label: 'Sedang Dipinjam' },
                    { num: 4, label: 'Selesai & Ulasan' }
                ];

                const stepperHtml = steps.map(s => {
                    const done = tx.step >= s.num;
                    return `
                        <div class="flex-1 flex flex-col items-center text-center">
                            <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-unindra-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'}">
                                ${done ? '✓' : s.num}
                            </div>
                            <span class="text-[10px] sm:text-xs font-semibold mt-1.5 ${done ? 'text-unindra-800' : 'text-slate-400'}">${s.label}</span>
                        </div>
                    `;
                }).join('');

                let actionButton = '';
                if (tx.step === 1) {
                    actionButton = `
                        <button onclick="advanceTxStep('${tx.txId}')" class="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors">
                            Simulasikan: Pemilik Setujui & Unggah Foto Serah Terima →
                        </button>
                    `;
                } else if (tx.step === 2) {
                    actionButton = `
                        <button onclick="advanceTxStep('${tx.txId}')" class="px-4 py-2.5 rounded-xl bg-unindra-600 hover:bg-unindra-700 text-white font-bold text-xs shadow-xs transition-colors">
                            Konfirmasi Barang Sudah Diterima (Mulai Pinjam) →
                        </button>
                    `;
                } else if (tx.step === 3) {
                    actionButton = `
                        <button onclick="advanceTxStep('${tx.txId}')" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors">
                            Konfirmasi Pengembalian Barang & Cek Kondisi →
                        </button>
                    `;
                } else if (tx.step === 4 && !tx.reviewed) {
                    actionButton = `
                        <button onclick="openReviewModal('${tx.txId}')" class="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-bold text-xs shadow-xs transition-colors">
                            ★ Beri Penilaian & Rating Pemilik
                        </button>
                    `;
                } else {
                    actionButton = `
                        <span class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                            <i data-lucide="check-circle-2" class="w-4 h-4"></i> Transaksi Selesai & Terulas
                        </span>
                    `;
                }

                return `
                    <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-5">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="font-mono text-xs font-bold text-unindra-600">${tx.txId}</span>
                                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${tx.type === 'gratis' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}">
                                        ${tx.type === 'gratis' ? 'Gratis (Rp0)' : 'Sewa Berbayar'}
                                    </span>
                                </div>
                                <h3 class="font-display font-bold text-lg text-slate-900 mt-1">${tx.itemName}</h3>
                                <p class="text-xs text-slate-500">Pemilik: <strong>${tx.owner}</strong> • Mulai: ${tx.startDate} (${tx.duration} Hari)</p>
                            </div>

                            <div class="text-left sm:text-right">
                                <span class="text-[11px] text-slate-400 block">Total Biaya</span>
                                <strong class="font-display font-extrabold text-lg text-slate-900">
                                    ${tx.type === 'gratis' ? 'Rp0' : formatRp(tx.totalPrice)}
                                </strong>
                                ${tx.type === 'berbayar' ? `<span class="text-[10px] text-slate-500 block">Pemilik: ${formatRp(tx.ownerShare)} • Platform: ${formatRp(tx.platformFee)}</span>` : ''}
                            </div>
                        </div>

                        <div class="bg-slate-50 rounded-2xl p-4 border border-slate-200/70">
                            <div class="flex items-start justify-between gap-2">
                                ${stepperHtml}
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                            <div class="flex items-center gap-2 text-xs text-slate-600">
                                <i data-lucide="map-pin" class="w-4 h-4 text-unindra-600 shrink-0"></i>
                                <span>Titik COD: <strong>${tx.codPoint}</strong></span>
                            </div>
                            <div>${actionButton}</div>
                        </div>
                    </div>
                `;
            }).join('');

            lucide.createIcons();
        }

        function advanceTxStep(txId) {
            const tx = myTransactions.find(t => t.txId === txId);
            if (!tx) return;

            if (tx.step < 4) {
                tx.step += 1;
                if (tx.step === 2) showToast('Disetujui pemilik! Bukti foto kondisi awal barang tercatat.');
                if (tx.step === 3) showToast('Serah terima selesai. Status barang kini Sedang Dipinjam.');
                if (tx.step === 4) showToast('Barang telah dikembalikan dalam kondisi baik!');
                renderTransactions();
            }
        }

        // ==================== REVIEW MODAL ====================
        function openReviewModal(txId) {
            activeReviewTxId = txId;
            const tx = myTransactions.find(t => t.txId === txId);
            document.getElementById('reviewItemSubtitle').textContent = `Beri ulasan untuk "${tx.itemName}" milik ${tx.owner}`;
            document.getElementById('reviewTextInput').value = '';
            document.getElementById('reviewModal').classList.remove('hidden');
        }

        function closeReviewModal() {
            document.getElementById('reviewModal').classList.add('hidden');
        }

        function submitReview() {
            const tx = myTransactions.find(t => t.txId === activeReviewTxId);
            if (!tx) return;

            const stars = document.getElementById('reviewStarsInput').value;
            const text = document.getElementById('reviewTextInput').value.trim() || 'Barang berfungsi dengan baik, pemilik ramah dan tepat waktu di kampus.';
            const reviewerName = currentUser ? `${currentUser.name} (${currentUser.prodi})` : 'Mahasiswa UNINDRA';

            tx.reviewed = true;

            const revList = document.getElementById('lenderReviewsList');
            revList.insertAdjacentHTML('afterbegin', `
                <div class="p-4 rounded-2xl bg-unindra-50/70 border border-unindra-200 space-y-1.5">
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-xs text-slate-900">${reviewerName}</span>
                        <span class="text-xs font-bold text-gold-600">★★★★★ ${stars}</span>
                    </div>
                    <p class="text-xs text-slate-700 leading-relaxed">"${text}"</p>
                    <span class="text-[10px] text-unindra-600 font-semibold block">Baru saja • ${tx.itemName}</span>
                </div>
            `);

            closeReviewModal();
            renderTransactions();
            showToast('Terima kasih! Ulasan Anda telah dipublikasikan.');
        }

        // ==================== TAB 3: LENDER DASHBOARD ====================
        function renderLenderDashboard() {
            const ownedItems = itemsData.filter(i => i.ownedByMe);
            document.getElementById('lenderNetBalance').textContent = formatRp(lenderEarnings.net);
            document.getElementById('lenderPlatformFee').textContent = formatRp(lenderEarnings.fee);
            document.getElementById('lenderOwnedCount').textContent = `${ownedItems.length} Barang`;

            const listEl = document.getElementById('lenderOwnedList');
            listEl.innerHTML = ownedItems.map(item => {
                const netPerDay = Math.round(item.price * 0.90);
                return `
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div class="flex items-center gap-3">
                            <div class="w-11 h-11 rounded-xl ${item.colorClass} flex items-center justify-center shrink-0">
                                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <h4 class="font-display font-bold text-sm text-slate-900">${item.name}</h4>
                                    ${item.featured ? '<span class="px-1.5 py-0.5 rounded bg-gold-500 text-white text-[9px] font-bold">PROMOSI</span>' : ''}
                                </div>
                                <p class="text-xs text-slate-500">
                                    ${item.type === 'gratis'
                                        ? 'Peminjaman Gratis (Rp0)'
                                        : `Tarif: ${formatRp(item.price)}/hari • Hak Anda: <strong class="text-emerald-700">${formatRp(netPerDay)}</strong>`}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 self-end sm:self-center">
                            ${!item.featured ? `
                                <button onclick="promoteOwnedItem(${item.id})" class="px-3 py-1.5 rounded-xl bg-gold-100 hover:bg-gold-400/40 text-amber-900 font-bold text-[11px] transition-colors">
                                    Promosikan (Rp5rb)
                                </button>
                            ` : `
                                <span class="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-[11px]">Aktif di Beranda</span>
                            `}
                        </div>
                    </div>
                `;
            }).join('');

            lucide.createIcons();
        }

        function promoteOwnedItem(itemId) {
            const item = itemsData.find(i => i.id === itemId);
            if (!item) return;
            item.featured = true;
            renderLenderDashboard();
            renderCatalog();
            showToast(`"${item.name}" kini tampil di Barang Dipromosikan (Biaya Rp5.000)!`);
        }

        // ==================== INIT ====================
        window.addEventListener('DOMContentLoaded', () => {
            renderAuthUI();
            renderCatalog();
            updateTxBadges();
            lucide.createIcons();
        });