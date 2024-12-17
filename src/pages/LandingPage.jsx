import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

// Import Swiper dan komponennya
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import icons
import { 
  FaTools, FaHardHat, FaStore, FaHome, FaWhatsapp, 
  FaStar, FaShoppingCart, FaUserClock, FaMapMarkerAlt,
  FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaClock, FaUserTie, FaArrowRight
} from 'react-icons/fa';

// Import gambar default
// import heroImage from '../assets/hero.jpg';
// import portfolio1 from '../assets/portfolio-1.jpg';
// import portfolio2 from '../assets/portfolio-2.jpg';
// import portfolio3 from '../assets/portfolio-3.jpg';
// import client1 from '../assets/client-1.jpg';
// import client2 from '../assets/client-2.jpg';
// import client3 from '../assets/client-3.jpg';

// Ganti dengan URL gambar online
const heroImage = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e';
const portfolio1 = 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5';
const portfolio2 = 'https://images.unsplash.com/photo-1484154218962-a197022b5858';
const portfolio3 = 'https://images.unsplash.com/photo-1505691938895-1758d7feb511';
const client1 = 'https://randomuser.me/api/portraits/men/1.jpg';
const client2 = 'https://randomuser.me/api/portraits/women/2.jpg';
const client3 = 'https://randomuser.me/api/portraits/men/3.jpg';

// Tambahkan data portofolio
const portfolioData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    title: 'Renovasi Rumah Modern',
    category: 'Renovasi Total',
    description: 'Renovasi rumah dari konsep klasik menjadi modern minimalis',
    location: 'Jakarta Selatan',
    duration: '3 bulan',
    partner: 'Tim Arsitek Muda'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
    title: 'Perbaikan Kamar Mandi',
    category: 'Renovasi Parsial',
    description: 'Upgrade kamar mandi dengan konsep modern industrial',
    location: 'Jakarta Barat',
    duration: '2 minggu',
    partner: 'Ahli Sanitair Pro'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5',
    title: 'Instalasi Listrik Rumah',
    category: 'Instalasi',
    description: 'Pemasangan instalasi listrik baru untuk rumah 2 lantai',
    location: 'Tangerang',
    duration: '1 minggu',
    partner: 'Teknisi Listrik Handal'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
    title: 'Renovasi Dapur',
    category: 'Renovasi Parsial',
    description: 'Modernisasi dapur dengan kitchen set custom',
    location: 'Bekasi',
    duration: '3 minggu',
    partner: 'Kitchen Specialist'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5',
    title: 'Pemasangan Plafon',
    category: 'Instalasi',
    description: 'Perbaikan dan pemasangan plafon gypsum dengan lampu LED',
    location: 'Depok',
    duration: '1 minggu',
    partner: 'Ahli Plafon Pro'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6',
    title: 'Waterproofing Atap',
    category: 'Perbaikan',
    description: 'Treatment anti bocor untuk atap rumah',
    location: 'Jakarta Timur',
    duration: '4 hari',
    partner: 'Waterproofing Expert'
  }
];

const testimonialData = [
  {
    image: client1,
    name: "Budi Santoso",
    role: "Pemilik Rumah",
    testimonial: "Sangat puas dengan layanan TukangKu. Tukang sangat profesional dan hasil kerjanya memuaskan."
  },
  {
    image: client2,
    name: "Siti Rahayu",
    role: "Pengusaha",
    testimonial: "Proses renovasi jadi lebih mudah dengan TukangKu. Estimasi biaya yang diberikan sangat akurat."
  },
  {
    image: client3,
    name: "Ahmad Hidayat",
    role: "Arsitek",
    testimonial: "Platform yang sangat membantu untuk kolaborasi antara klien, tukang, dan arsitek."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigationLinks = [
    { title: 'Beranda', href: '#home' },
    { title: 'Layanan', href: '#layanan' },
    { title: 'Cara Kerja', href: '#cara-kerja' },
    { title: 'Portofolio', href: '#portofolio' },
    { title: 'FAQ', href: '#faq' },
  ];

  // Fungsi untuk handle navigasi ke dashboard sesuai tipe user
  const handleDashboardRedirect = () => {
    if (user) {
      switch(user.type) {
        case 'user':
          navigate('/user/dashboard');
          break;
        case 'partner':
          navigate('/partner/dashboard');
          break;
        case 'vendor':
          navigate('/vendor/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  };

  // Tambahkan fungsi scroll
  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Sesuaikan dengan tinggi navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL tanpa hash
      window.history.pushState({}, '', href);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">TukangKu</div>
            <div className="hidden md:flex items-center gap-8">
              {navigationLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-gray-600 hover:text-primary transition"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={handleDashboardRedirect}
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
                >
                  Dashboard
                </button>
              ) : (
                <>
                  <Link 
                    to="/login"
                    className="text-primary font-semibold hover:text-primary-dark transition"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Solusi Renovasi dan Perbaikan Rumah Anda
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Temukan tukang profesional dan bahan bangunan berkualitas untuk kebutuhan renovasi rumah Anda.
              </p>
              {!user && (
                <div className="flex gap-4">
                  <Link
                    to="/register"
                    className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition"
                  >
                    Mulai Sekarang
                  </Link>
                  <a
                    href="#cara-kerja"
                    className="border border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition"
                  >
                    Pelajari Lebih Lanjut
                  </a>
                </div>
              )}
            </div>
            <div className="flex-1">
              <img
                src={heroImage}
                alt="Hero"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-gray-600">
              Kami menyediakan berbagai layanan profesional untuk kebutuhan rumah Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<FaTools />}
              title="Konsultasi Tukang"
              description="Konsultasikan masalah rumah Anda dengan tukang profesional berpengalaman"
            />
            <ServiceCard 
              icon={<FaHardHat />}
              title="Konsultasi Arsitek"
              description="Dapatkan saran desain dan renovasi dari arsitek profesional"
            />
            <ServiceCard 
              icon={<FaStore />}
              title="Belanja Bahan"
              description="Temukan berbagai bahan bangunan berkualitas dengan harga terbaik"
            />
            <ServiceCard 
              icon={<FaHome />}
              title="Perbaikan Rumah"
              description="Layanan perbaikan rumah lengkap dengan garansi kepuasan"
            />
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Cara Kerja</h2>
            <p className="text-gray-600">
              Proses mudah untuk mendapatkan layanan renovasi dan perbaikan rumah
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard 
              number="1"
              title="Pilih Layanan"
              description="Pilih layanan yang Anda butuhkan dari berbagai kategori yang tersedia"
            />
            <StepCard 
              number="2"
              title="Konsultasi"
              description="Diskusikan kebutuhan Anda dengan tukang atau arsitek profesional"
            />
            <StepCard 
              number="3"
              title="Dapatkan Penawaran"
              description="Terima estimasi biaya dan waktu pengerjaan yang transparan"
            />
            <StepCard 
              number="4"
              title="Mulai Pengerjaan"
              description="Tim profesional kami akan mengerjakan proyek sesuai kesepakatan"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portofolio" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Portofolio Proyek</h2>
            <p className="text-gray-600">
              Hasil kerja terbaik dari tim profesional kami dalam menghadirkan solusi renovasi dan perbaikan rumah
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Semua', 'Renovasi Total', 'Renovasi Parsial', 'Instalasi', 'Perbaikan'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.map((item) => (
              <PortfolioCard key={item.id} {...item} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Mulai Proyek Anda
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimoni" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Testimoni Klien</h2>
            <p className="text-gray-600">
              Apa kata mereka tentang layanan kami
            </p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={30}
          >
            {testimonialData.map((item, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Keunggulan Kami</h2>
            <p className="text-gray-600">
              Mengapa harus memilih layanan TukangKu?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaUserClock />}
              title="Tukang Terverifikasi"
              description="Semua tukang telah melalui proses verifikasi ketat untuk menjamin kualitas"
            />
            <FeatureCard
              icon={<FaStar />}
              title="Harga Transparan"
              description="Dapatkan estimasi biaya yang jelas sebelum memulai pekerjaan"
            />
            <FeatureCard
              icon={<FaShoppingCart />}
              title="Garansi Pengerjaan"
              description="Setiap pekerjaan dilindungi garansi untuk kepuasan Anda"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Pertanyaan Umum</h2>
            <p className="text-gray-600">
              Temukan jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FaqItem 
              question="Bagaimana cara memesan layanan?"
              answer="Anda dapat memilih layanan yang dibutuhkan, kemudian mengisi form pemesanan atau menghubungi kami melalui WhatsApp untuk konsultasi lebih lanjut."
            />
            <FaqItem 
              question="Berapa lama waktu pengerjaan?"
              answer="Waktu pengerjaan bervariasi tergantung jenis dan skala proyek. Kami akan memberikan estimasi waktu yang akurat setelah melakukan survei."
            />
            <FaqItem 
              question="Apakah ada garansi untuk pekerjaan?"
              answer="Ya, kami memberikan garansi untuk setiap pekerjaan. Periode garansi bervariasi tergantung jenis pekerjaan."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Proyek Anda?</h2>
          <p className="text-xl mb-8">
            Hubungi kami sekarang untuk konsultasi gratis
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Pesan Sekarang
            </button>
            <button className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition">
              <FaWhatsapp className="text-xl" />
              Chat WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">TukangKu</h3>
              <p className="text-gray-400">
                Solusi terpercaya untuk renovasi dan perbaikan rumah Anda
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Konsultasi Tukang</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Konsultasi Arsitek</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Belanja Bahan</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <FaPhone className="text-primary" />
                  <span className="text-gray-400">+62 123 4567 890</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-primary" />
                  <span className="text-gray-400">info@tukangku.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="text-gray-400">Jakarta, Indonesia</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                  <FaFacebook />
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TukangKu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition group">
      <div className="text-4xl text-primary mb-4 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition">
      <div className="text-4xl text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const PortfolioCard = ({ image, title, category, description, location, duration, partner }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-primary bg-primary/10 rounded-full">
          {category}
        </span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>Durasi: {duration}</span>
          </div>
          <div className="flex items-center">
            <FaUserTie className="mr-2" />
            <span>{partner}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ image, name, role, testimonial }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-700">{testimonial}</p>
    </div>
  );
};

// Update bagian Hero Section dengan Slider
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white pt-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[600px]"
      >
        {[1, 2, 3].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img 
                src={heroImage} 
                alt="Hero" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                      Solusi Terpercaya untuk Renovasi & Perbaikan Rumah Anda
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 mb-8">
                      Layanan profesional dengan tukang berpengalaman, konsultasi arsitek, 
                      dan material berkualitas untuk mewujudkan rumah impian Anda.
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Mulai Sekarang
                      </button>
                      <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
                        Pelajari Lebih Lanjut
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// Update Portfolio Section dengan Slider
const PortfolioSection = () => {
  return (
    <section id="portofolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Portofolio Proyek</h2>
          <p className="text-gray-600">
            Hasil kerja terbaik dari tim profesional kami dalam menghadirkan solusi renovasi dan perbaikan rumah
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Semua', 'Renovasi Total', 'Renovasi Parsial', 'Instalasi', 'Perbaikan'].map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.map((item) => (
            <PortfolioCard key={item.id} {...item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary-dark transition-colors"
          >
            Mulai Proyek Anda
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Update Testimonial Section dengan Slider
const TestimonialSection = () => {
  return (
    <section id="testimoni" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Testimoni Klien</h2>
          <p className="text-gray-600">
            Apa kata mereka tentang layanan kami
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          spaceBetween={30}
        >
          {testimonialData.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Komponen baru
const StepCard = ({ number, title, description }) => {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        <p className="pb-4 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default LandingPage; 