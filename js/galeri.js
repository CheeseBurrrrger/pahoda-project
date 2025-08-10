const galleryData = [
    {
        title: "Tor-Tor Sipitu Cawan",
        description: "Tor-Tor Sipitu Cawan merupakan tarian sakral Batak Toba yang dibawakan tujuh penari wanita sambil menyeimbangkan cawan berisi air jeruk purut sebagai simbol penyucian dalam upacara adat penting.",
        size: "small",
        image: "./ASSETS/img/tor_tor.jpg"
    },
    {
        title: "Rumah Bolon",
        description: "Deretan rumah adat Batak Toba atau Rumah Bolon di Desa Buhit, Pulau Samosir. Arsitekturnya yang unik dengan atap menjulang melambangkan status sosial dan filosofi hidup masyarakat Batak, menjadi warisan budaya yang terus dijaga hingga kini.",
        size: "small",
        image: "./ASSETS/img/cover.jpg"
    },
    {
        title: "Danau Toba",
        description: "Danau Toba terletak di Sumatera Utara, yang tidak hanya memukau dengan keindahan alamnya, tetapi juga menyimpan sejarah geologi dan budaya mendalam bagi masyarakat Batak Toba.",
        size: "small",
        image: "./ASSETS/img/danau_toba.jpg"
    },
    {
        title: "Gorga ",
        description: "Gorga batak toba merupakan seni ukiran tradisional dengan morif khas berwarna merah, hitam, dan putih yang sarat makna filosofi tentang hubungan manusia denga alam, leluhur, dan Sang Pencipta.",
        size: "small",
        image: "./ASSETS/img/gorga_karo.jpg"
    },
    {
        title: "Masyarakat Batak Toba",
        description: "Masyarakat Batak Toba yang mengenakan pakaian adat khas, lengkap dengan ulos dan penutup kepala tradisional sebagai simbol identitas budaya dengan makna yang mendalam.",
        size: "small",
        image: "./ASSETS/img/masyarakat_toba.jpg"
    },
    {
        title: "Mie Gomak",
        description: "Spaghetti Batak alias Mie Gomak yang disajikan dengan kuah santan berbumbu andaliman dan rempah khas Sumatera utara.",
        size: "small",
        image: "./ASSETS/img/mie_gomak.jpg"
    },
    {
        title: "Karo Tempo Dulu",
        description: "Masyarakat Karo tempo dulu dengan busana yang mencerminkan keharmonisan pasangan suami istri. Potret ini merekam kehidupan tradisional yang erat dengan budaya kearifan lokal.",
        size: "small",
        image: "./ASSETS/img/aksara_pakpak.jpg"
    },
    {
        title: "Siwaluh Jabu",
        description: "Siwaluh Jabu yang artinya rumah delapan keluarga, bukan hanya sekadar tempat tinggal masyarakat tradisional Karo, tetapi juga ruang spiritual tempat tinggal roh leluhur dan simbol ikatan yang kuat antar keluarga. Ciri khas atapnya yang unik, desain tanpa paku, dan dinding yang tegak lurus dengan kemiringan sekitar 120 derajat.",
        size: "small",
        image: "./ASSETS/img/silawuh_jabu.webp"
    },
    {
        title: "Piso Surit",
        description: "Piso Surit merupakan tarian tradisional Batak Karo yang menggambarkan gadis menanti kekasihnya dan biasa dipentaskan untuk menyambut tamu kehormatan.",
        size: "small",
        image: "./ASSETS/img/tari_piso.jpg"
    },
    {
        title: "Gundala Seberaya",
        description: "Gundala atau dikenal juga Tembut-Tembut Seberaya adalah tarian ritual Batak Karo yang dilakukan untuk memanggil hujan saat kemarau panjang dengan iringan musik gendang, sarunai, serta gung, disertai lagu-lagu seperti persentabin.",
        size: "small",
        image: "./ASSETS/img/gundala.jpg"
    },
    {
        title: "Nurung Kerah",
        description: ".",
        size: "small",
        image: "./ASSETS/img/a.jpg"
    },
    {
        title: "a",
        description: ".",
        size: "small",
        image: "./ASSETS/img/a.jpg"
    },
    {
        title: "a",
        description: ".",
        size: "small",
        image: "./ASSETS/img/a.jpg"
    },
    {
        title: "a",
        description: ".",
        size: "small",
        image: "./ASSETS/img/a.jpg"
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
