import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { 
  FaPaintRoller, 
  FaTools, 
  FaBolt, 
  FaToilet,
  FaHardHat,
  FaWrench,
  FaTint,
  FaUserTie,
  FaBuilding,
  FaMapMarkerAlt,
  FaArrowUp,
  FaWhatsapp,
  FaPhone,
  FaQuestionCircle,
  FaUserFriends,
  FaEllipsisH
} from 'react-icons/fa';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import FaqModal from '../../components/modals/FaqModal';

const UserDashboard = () => {
  const { user } = useAuth();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMoreSolutions, setShowMoreSolutions] = useState(false);
  const navigate = useNavigate();

  // Cek posisi scroll untuk menampilkan tombol scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data promo dengan gambar dari internet
  const promos = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg', // Renovasi
      title: 'Diskon 20% Renovasi',
      description: 'Berlaku sampai 30 Juni 2024'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg', // Painting
      title: 'Paket Hemat Cat',
      description: 'Mulai dari Rp 500.000'
    }
  ];

  const services = [
    {
      id: 'cat',
      icon: <FaPaintRoller className="w-8 h-8" />,
      name: 'Ahli Cat',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'keramik',
      icon: <FaTools className="w-8 h-8" />,
      name: 'Ahli Keramik',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'listrik',
      icon: <FaBolt className="w-8 h-8" />,
      name: 'Ahli Listrik',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'lainnya',
      icon: <FaWrench className="w-8 h-8" />,
      name: 'Lainnya',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const additionalServices = [
    {
      id: 'keramik',
      name: 'Ahli Tukang Keramik',
      description: 'Ahli bongkar pasang keramik dan porselen untuk lantai maupun dinding',
      icon: <FaTools className="w-5 h-5" />
    },
    {
      id: 'listrik',
      name: 'Ahli Tukang Listrik',
      description: 'Siap bantu instalasi listrik, memasang stop kontak, fitting lampu dan permasalahan listrik lainnya',
      icon: <FaBolt className="w-5 h-5" />
    },
    {
      id: 'kenek',
      name: 'Asisten Tukang',
      description: 'Asisten tukang agar pekerjaan lebih cepat selesai',
      icon: <FaUserFriends className="w-5 h-5" />
    },
    {
      id: 'aluminium',
      name: 'Ahli Tukang Aluminium',
      description: 'Tenaga ahli untuk berbagai pekerjaan seputar pintu dan jendela',
      icon: <FaTools className="w-5 h-5" />
    },
    {
      id: 'batu',
      name: 'Ahli Tukang Batu',
      description: 'Siap bereskan segala pekerjaan dinding, tembok, batu alam dan conblock',
      icon: <FaHardHat className="w-5 h-5" />
    },
    {
      id: 'pipa',
      name: 'Ahli Tukang Pipa',
      description: 'Perbaiki pipa bocor, saluran pipa macet, pipa air besih / kotor',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'waterproofing',
      name: 'Ahli Waterproofing',
      description: 'Betulkan genteng / atap atau bagian rumah lainnya yang rentan bocor',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'gali',
      name: 'Ahli Tukang Gali',
      description: 'Tukang untuk segala keperluan bergali',
      icon: <FaTools className="w-5 h-5" />
    },
    {
      id: 'las',
      name: 'Ahli Tukang Las',
      description: 'Ahlinya permasalahan ngelas besi untuk rumahmu',
      icon: <FaTools className="w-5 h-5" />
    },
    {
      id: 'genteng',
      name: 'Ahli Tukang Genteng',
      description: 'Tukang ahli masalah genteng dan atap',
      icon: <FaHardHat className="w-5 h-5" />
    },
    {
      id: 'plafon',
      name: 'Ahli Tukang Plafon',
      description: 'Bantu selesaikan masalah plafon rusak, berlumut, roboh dan lainnya',
      icon: <FaHardHat className="w-5 h-5" />
    },
    {
      id: 'konsultan',
      name: 'Konsultan',
      description: 'Bantu menentukan jumlah materi dan tukang yang cocok untuk proyekmu',
      icon: <FaUserTie className="w-5 h-5" />
    },
    {
      id: 'sanitair',
      name: 'Ahli Tukang Sanitair',
      description: 'Andalan pasang wastafel, kloset, keran air, shower dan permasalahan sanitair lain',
      icon: <FaToilet className="w-5 h-5" />
    },
    {
      id: 'angkat',
      name: 'Ahli Tukang Angkat',
      description: 'Untuk keperluan mengangkat barang-barang rumahmu',
      icon: <FaUserFriends className="w-5 h-5" />
    },
    {
      id: 'listrik-rapi',
      name: 'Ahli Tukang Listrik Perapihan',
      description: 'Bongkar, perbaiki kabel listrik dan rapikan',
      icon: <FaBolt className="w-5 h-5" />
    },
    {
      id: 'pipa-rapi',
      name: 'Ahli Tukang Pipa Perapihan',
      description: 'Bongkar, perbaiki pipa dan rapikan',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'cat',
      name: 'Ahli Tukang Cat',
      description: 'Bantu membuang cat lama, melakukan cat dasar, finishing dan segala permasalahan cat lainnya',
      icon: <FaPaintRoller className="w-5 h-5" />
    }
  ];

  const solutions = [
    {
      id: 'kebocoran',
      icon: <FaTint className="w-6 h-6" />,
      name: 'Kebocoran',
      description: 'Jaga Rumah Bebas Bocor',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'cat',
      icon: <FaPaintRoller className="w-6 h-6" />,
      name: 'Cat',
      description: 'Warnai Rumahmu',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'keramik',
      icon: <FaTools className="w-6 h-6" />,
      name: 'Keramik',
      description: 'Percantik Lantai dan Dindingmu',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'listrik',
      icon: <FaBolt className="w-6 h-6" />,
      name: 'Listrik',
      description: 'Rumah Terang, Hati Senang',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'pipa',
      icon: <FaTint className="w-6 h-6" />,
      name: 'Pipa',
      description: 'Air Mengalir Lancar',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      id: 'toilet',
      icon: <FaToilet className="w-6 h-6" />,
      name: 'Toilet',
      description: 'Kamar Mandi Bersih dan Nyaman',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'konsultan',
      icon: <FaUserTie className="w-6 h-6" />,
      name: 'Konsultan',
      description: 'Bantu Rencanakan Proyekmu',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'plafon',
      icon: <FaHardHat className="w-6 h-6" />,
      name: 'Plafon',
      description: 'Kebutuhan Langit-langit Rumahmu',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 'lainnya',
      icon: <FaEllipsisH className="w-6 h-6" />,
      name: 'Lainnya',
      description: 'Solusi Lainnya',
      color: 'bg-gray-100 text-gray-600'
    }
  ];

  const additionalSolutions = [
    {
      id: 'aluminium',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Aluminium Aksesoris',
      description: 'Percantik Interior Rumahmu'
    },
    {
      id: 'exhaust',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Exhaust Fan',
      description: 'Udara Ruangan Segar dan Bersih'
    },
    {
      id: 'kipas',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Kipas Angin',
      description: 'Biar Rumahmu Lebih Adem'
    },
    {
      id: 'batu-alam',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Batu Alam',
      description: 'Sentuhan Alam di Rumahmu'
    },
    {
      id: 'lemari',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Lemari',
      description: 'Jaga Barang-barang Pentingmu'
    },
    {
      id: 'tangki-atas',
      icon: <FaTint className="w-5 h-5" />,
      name: 'Tangki Air Toren (Lantai Dasar/Atas)',
      description: 'Pasang Tangki Air di Rumahmu'
    },
    {
      id: 'tangki-bawah',
      icon: <FaTint className="w-5 h-5" />,
      name: 'Tangki Air (Bawah Tanah)',
      description: 'Solusi Penampungan Air Bawah Tanah'
    },
    {
      id: 'water-heater',
      icon: <FaTint className="w-5 h-5" />,
      name: 'Water Heater',
      description: 'Air Mandi Hangat dan Nyaman'
    },
    {
      id: 'kanopi',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Kanopi',
      description: 'Lindungi Bagian Luar Rumahmu'
    },
    {
      id: 'lantai',
      icon: <FaTools className="w-5 h-5" />,
      name: 'Lantai',
      description: 'Agar Lantai Rumah Mulus'
    },
    {
      id: 'cuci-toren',
      icon: <FaTint className="w-5 h-5" />,
      name: 'Cuci Toren',
      description: 'Toren Kotor Jadi Bersih, Air Jadi Mengalir Lancar'
    },
    {
      id: 'kenek',
      icon: <FaUserFriends className="w-5 h-5" />,
      name: 'Kenek',
      description: 'Bantu Pekerjaan Cepat Selesai'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Selamat datang, {user?.full_name}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 pt-16">
        <div className="px-4 py-4">
          {/* Area Layanan */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="w-6 h-6 text-white mr-2" />
              <h2 className="text-white font-semibold">
                Layanan Kami Tersedia di JABODETABEK
              </h2>
            </div>
          </div>

          {/* Promo Slider */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Promo Spesial 🎉</h2>
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="rounded-lg overflow-hidden"
            >
              {promos.map((promo) => (
                <SwiperSlide key={promo.id}>
                  <div className="relative aspect-[16/9]">
                    <img 
                      src={promo.image} 
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold">{promo.title}</h3>
                      <p className="text-white/80 text-sm">{promo.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* Pesan Tukang Langsung */}
          <section className="mb-8 relative">
            <h2 className="text-lg font-semibold mb-3">Pesan Tukang Langsung 👨‍🔧</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <button 
                  key={service.id}
                  className="flex flex-col items-center transition-transform hover:scale-105"
                  onClick={() => {
                    if (service.id === 'lainnya') {
                      setShowDropdown(!showDropdown);
                    } else {
                      navigate(`/user/order/create/service/${service.id}`);
                    }
                  }}
                >
                  <div className={`rounded-full p-3 mb-2 ${service.color} transition-colors hover:bg-opacity-80`}>
                    {service.icon}
                  </div>
                  <span className="text-xs text-center">{service.name}</span>
                </button>
              ))}
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-20 max-h-[60vh] overflow-y-auto">
                {additionalServices.map((service) => (
                  <button
                    key={service.id}
                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/user/order/create/service/${service.id}`);
                    }}
                  >
                    <div className="text-primary mt-1 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Aneka Solusi */}
          <section className="mb-4 relative">
            <h2 className="text-lg font-semibold mb-3">Aneka Solusi untuk Masalah Rumah 🏠</h2>
            <div className="grid grid-cols-3 gap-3">
              {solutions.map((solution) => (
                <button 
                  key={solution.id}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    if (solution.id === 'lainnya') {
                      setShowMoreSolutions(!showMoreSolutions);
                    } else {
                      navigate(`/user/order/create/solution/${solution.id}`);
                    }
                  }}
                >
                  <div className={`rounded-full p-3 mb-2 ${solution.color}`}>
                    {solution.icon}
                  </div>
                  <span className="text-sm font-medium text-center">
                    {solution.name}
                  </span>
                  <span className="text-xs text-gray-500 text-center mt-1">
                    {solution.description}
                  </span>
                </button>
              ))}
            </div>

            {/* Dropdown untuk solusi tambahan */}
            {showMoreSolutions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-20 max-h-[70vh] overflow-y-auto">
                <div className="sticky top-0 bg-gray-50 p-4 border-b">
                  <h3 className="font-medium text-gray-900">Layanan Lainnya</h3>
                  <p className="text-sm text-gray-500">Temukan solusi untuk setiap masalah rumahmu</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {additionalSolutions.map((solution) => (
                    <button
                      key={solution.id}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setShowMoreSolutions(false);
                        navigate(`/user/order/create/solution/${solution.id}`);
                      }}
                    >
                      <div className="text-primary mt-1 flex-shrink-0">
                        {solution.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-medium text-gray-900">{solution.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{solution.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Overlay */}
            {showMoreSolutions && (
              <div 
                className="fixed inset-0 bg-black/20 z-10"
                onClick={() => setShowMoreSolutions(false)}
              />
            )}
          </section>

          {/* Bantuan Section */}
          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-3">Butuh Bantuan? 🤝</h2>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://wa.me/6281234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat WhatsApp</span>
              </a>
              <button 
                onClick={() => setIsFaqOpen(true)}
                className="flex items-center justify-center gap-2 bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <FaQuestionCircle className="text-xl" />
                <span>FAQ</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors z-10"
        >
          <FaArrowUp />
        </button>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* FAQ Modal */}
      <FaqModal 
        isOpen={isFaqOpen} 
        onClose={() => setIsFaqOpen(false)} 
      />

      {/* Click outside handler */}
      {showDropdown && (
        <div 
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard; 