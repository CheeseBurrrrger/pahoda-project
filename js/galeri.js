       const galleryData = [
            {
                title: "Tari Piso Surit",
                description: "Tarian tradisional Batak yang menggambarkan keberanian dan kekuatan. Penari menggunakan pisau surit sebagai properti utama dalam gerakan yang dinamis dan penuh makna spiritual.",
                size: "large"
            },
            {
                title: "Penari Tradisional",
                description: "Seorang penari muda menampilkan gerakan tari tradisional Batak dengan kostum adat yang autentik dan penuh warna.",
                size: "medium"
            },
            {
                title: "Kuliner Batak",
                description: "Hidangan tradisional Batak yang kaya rempah dan cita rasa. Makanan ini merupakan bagian penting dari budaya dan tradisi masyarakat Batak.",
                size: "small"
            },
            {
                title: "Alat Musik Gondang",
                description: "Seperangkat alat musik tradisional Gondang Sabangunan yang digunakan dalam upacara adat dan ritual keagamaan masyarakat Batak.",
                size: "extra-large"
            },
            {
                title: "Rumah Bolon",
                description: "Arsitektur tradisional rumah adat Batak dengan atap yang khas dan ukiran yang penuh makna filosofis.",
                size: "medium"
            },
            {
                title: "Tenun Ulos",
                description: "Proses pembuatan kain ulos tradisional yang dilakukan dengan teknik tenun manual turun temurun dari generasi ke generasi.",
                size: "tall"
            },
            {
                title: "Danau Toba",
                description: "Keindahan alam Danau Toba, danau vulkanik terbesar di dunia yang menjadi jantung budaya dan sejarah masyarakat Batak.",
                size: "large"
            },
            {
                title: "Upacara Adat",
                description: "Pelaksanaan upacara adat Batak dengan berbagai ritual dan tradisi yang masih dilestarikan hingga saat ini.",
                size: "medium"
            },
            {
                title: "Seni Ukir Batak",
                description: "Keindahan seni ukir tradisional Batak yang menghiasi rumah adat dan berbagai peralatan upacara.",
                size: "small"
            },
            {
                title: "Festival Budaya",
                description: "Perayaan festival budaya Batak yang menampilkan berbagai pertunjukan seni dan tradisi lokal.",
                size: "extra-large"
            },
            {
                title: "Pakaian Adat",
                description: "Koleksi pakaian adat Batak dengan motif dan warna yang khas dari berbagai sub-suku.",
                size: "medium"
            },
            {
                title: "Ritual Tradisional",
                description: "Pelaksanaan ritual tradisional yang masih dipertahankan dalam kehidupan masyarakat Batak modern.",
                size: "tall"
            },
            {
                title: "Kerajinan Tangan",
                description: "Berbagai kerajinan tangan tradisional Batak yang menunjukkan keterampilan dan kreativitas masyarakat lokal.",
                size: "small"
            },
            {
                title: "Arsitektur Tradisional",
                description: "Detail arsitektur rumah adat Batak dengan ornamen dan filosofi yang mendalam.",
                size: "large"
            },
            {
                title: "Musik Tradisional",
                description: "Pertunjukan musik tradisional Batak dengan berbagai alat musik khas daerah.",
                size: "medium"
            }
        ];

        class PinterestCollage {
            constructor() {
                this.galleryGrid = document.getElementById('galleryGrid');
                this.modal = document.getElementById('imageModal');
                this.modalImage = document.getElementById('modalImage');
                this.modalClose = document.getElementById('modalClose');
                
                this.init();
            }

            init() {
                this.createGalleryItems();
                this.setupModalEvents();
            }

            createGalleryItems() {
                // Shuffle array for more natural distribution
                const shuffledData = [...galleryData].sort(() => Math.random() - 0.5);
                
                shuffledData.forEach((item, index) => {
                    const galleryItem = this.createGalleryItem(item, index);
                    this.galleryGrid.appendChild(galleryItem);
                });
            }

            createGalleryItem(data, index) {
                const item = document.createElement('div');
                item.className = `gallery-item ${data.size} loading`;
                item.dataset.title = data.title;
                item.dataset.description = data.description;

                item.innerHTML = `
                    <img src="./ASSETS/img/cover.jpg" alt="${data.title}">
                    <div class="gallery-overlay">
                        <h3 class="overlay-title">${data.title}</h3>
                        <p class="overlay-description">${data.description}</p>
                    </div>
                `;

                // Add click event listener
                item.addEventListener('click', () => {
                    this.openModal(item);
                });

                // Add loading effect
                const img = item.querySelector('img');
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                    item.classList.remove('loading');
                });

                return item;
            }

            setupModalEvents() {
                // Close modal events
                this.modalClose.addEventListener('click', () => {
                    this.closeModal();
                });

                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) {
                        this.closeModal();
                    }
                });

                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                        this.closeModal();
                    }
                });
            }

            openModal(item) {
                const img = item.querySelector('img');
                const title = item.dataset.title;
                
                this.modalImage.src = img.src;
                this.modalImage.alt = title;
                this.modal.classList.add('show');
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
            }

            closeModal() {
                this.modal.classList.remove('show');
                document.body.style.overflow = 'auto';
                
                // Clear image after animation
                setTimeout(() => {
                    if (!this.modal.classList.contains('show')) {
                        this.modalImage.src = '';
                    }
                }, 300);
            }
        }

        // Initialize gallery when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new PinterestCollage();
        });