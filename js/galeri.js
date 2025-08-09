const galleryData = [
    {
        title: "Judul 1",
        description: "Masyarakat Karo tempo dulu dengan busana yang mencerminkan keharmonisan pasangan suami istri. Potret ini merekam kehidupan tradisional yang erat dengan budaya kearifan lokal.",
        size: "large",
        image: "./ASSETS/img/aksara_pakpak.jpg"
    },
    {
        title: "Judul 2",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Judul 3",
        description: "Deretan rumah adat Batak Toba atau Rumah Bolon di Desa Buhit, Pulau Samosir. Arsitekturnya yang unik dengan atap menjulang melambangkan status sosial dan filosofi hidup masyarakat Batak, menjadi warisan budaya yang terus dijaga hingga kini.",
        size: "small",
        image: "./ASSETS/img/cover.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    {
        title: "Penari Tradisional",
        description: "Tari Manortor adat Batak Toba yang ditarikan dalam berbagai pesta kebudayaan seperti pernikahan dan pemakaman. Gerakannya sarat makna, menjadi wujud penghormatan kepada leluhur sekaligus mempererat ikatan kekeluargaan dalam masyarakat.",
        size: "medium",
        image: "./ASSETS/img/batak dancer.jpg"
    },
    
    // ... add `image` property for all items
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
            <img src="${data.image}" alt="${data.title}">
            <div class="gallery-overlay">
                <h3 class="overlay-title">${data.title}</h3>
                <p class="overlay-description">${data.description}</p>
            </div>
        `;

        item.addEventListener('click', () => {
            this.openModal(item);
        });

        const img = item.querySelector('img');
        img.addEventListener('load', () => {
            img.classList.add('loaded');
            item.classList.remove('loading');
        });

        return item;
    }

    setupModalEvents() {
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
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';

        setTimeout(() => {
            if (!this.modal.classList.contains('show')) {
                this.modalImage.src = '';
            }
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PinterestCollage();
});
