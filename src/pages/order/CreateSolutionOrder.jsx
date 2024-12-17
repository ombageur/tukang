import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FaMinus, 
  FaPlus, 
  FaArrowLeft, 
  FaShoppingCart, 
  FaCamera, 
  FaImage,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTimes,
  FaTint,
  FaPaintRoller,
  FaTools,
  FaBolt,
  FaQuestionCircle,
  FaCheck,
  FaUserFriends
} from 'react-icons/fa';

// Import konstanta dan helper yang sama
import { 
  prices, 
  tools, 
  shifts, 
  materials, 
  promoList 
} from '../../constants/orderConstants';

const CreateSolutionOrder = () => {
  const navigate = useNavigate();
  const { solutionId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [shift, setShift] = useState('pagi');
  const [description, setDescription] = useState('');
  const [showTools, setShowTools] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    province_id: '',
    city_id: '',
    district_id: '',
    village_id: '',
    address_detail: '',
    postal_code: '',
    label: '',
    notes: ''
  });
  const [showPromo, setShowPromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [tukangList, setTukangList] = useState([
    { id: 1, type: 'Ahli Genteng', description: 'Spesialis perbaikan dan pemasangan genteng', quantity: 1 }
  ]);
  const [showTukangDropdown, setShowTukangDropdown] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [isLoadingVillages, setIsLoadingVillages] = useState(false);

  // Data solusi yang lebih lengkap
  const solutionTypes = {
    'kebocoran': {
      name: 'Kebocoran',
      description: 'Jaga Rumah Bebas Bocor',
      recommendedWorkers: 2,
      estimatedDuration: '3-5 jam',
      icon: <FaTint className="w-6 h-6" />
    },
    'cat': {
      name: 'Cat',
      description: 'Warnai Rumahmu',
      recommendedWorkers: 1,
      estimatedDuration: '4-6 jam',
      icon: <FaPaintRoller className="w-6 h-6" />
    },
    'keramik': {
      name: 'Keramik',
      description: 'Percantik Lantai dan Dindingmu',
      recommendedWorkers: 2,
      estimatedDuration: '6-8 jam',
      icon: <FaTools className="w-6 h-6" />
    },
    'listrik': {
      name: 'Listrik',
      description: 'Rumah Terang, Hati Senang',
      recommendedWorkers: 1,
      estimatedDuration: '2-4 jam',
      icon: <FaBolt className="w-6 h-6" />
    }
  };

  const currentSolution = solutionTypes[solutionId] || {
    name: 'Solusi tidak ditemukan',
    description: 'Silakan kembali ke halaman sebelumnya dan pilih solusi yang tersedia',
    recommendedWorkers: 1,
    estimatedDuration: '-',
    icon: <FaQuestionCircle className="w-6 h-6" />
  };

  // Tambahkan fungsi helper
  const calculateDays = () => {
    if (!dateRange.startDate || !dateRange.endDate) return 1;
    
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const calculateDiscount = (promo) => {
    const subtotal = calculateTotal();
    if (subtotal < promo.minTransaction) return 0;

    if (promo.type === 'fixed') {
      return promo.discount;
    } else {
      const discountAmount = subtotal * (promo.discount / 100);
      return promo.maxDiscount ? Math.min(discountAmount, promo.maxDiscount) : discountAmount;
    }
  };

  const calculateTotal = () => {
    const days = calculateDays();
    
    // Hitung total material
    const materialsTotal = selectedMaterials.reduce((total, material) => 
      total + (material.price * material.quantity), 0
    );
    
    // Hitung total biaya tukang
    const serviceTotalPerDay = tukangList.reduce((total, tukang) => {
      return total + (prices[shift] * tukang.quantity);
    }, 0);
    
    const serviceTotal = serviceTotalPerDay * days;
    const subtotal = materialsTotal + serviceTotal;
    
    const discount = selectedPromo ? calculateDiscount(selectedPromo) : 0;
    return subtotal - discount;
  };

  // Header Section
  const HeaderSection = () => (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="px-4 h-16 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600"
        >
          <FaArrowLeft className="mr-2" />
          Kembali
        </button>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <p className="text-sm text-gray-600">Total ({calculateDays()} hari)</p>
            <div className="flex flex-col items-end">
              {selectedPromo && (
                <p className="text-xs text-green-500">
                  Hemat Rp{calculateDiscount(selectedPromo).toLocaleString()}
                </p>
              )}
              <p className="font-semibold">Rp{calculateTotal().toLocaleString()}</p>
              {calculateDays() > 1 && (
                <p className="text-xs text-gray-500">
                  @Rp{(prices[shift] * quantity).toLocaleString()}/hari
                </p>
              )}
            </div>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
            <FaShoppingCart className="mr-2" />
            Checkout
          </button>
        </div>
      </div>
    </header>
  );

  // Data masalah kebocoran
  const leakProblems = [
    {
      id: 'plafon-dak',
      name: 'Plafon Bocor (Dak)',
      description: 'Kebocoran pada plafon yang berasal dari dak beton',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'pipa',
      name: 'Pipa Pecah / Bocor',
      description: 'Kebocoran pada pipa air atau saluran',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'rembes',
      name: 'Rembes dari Pipa',
      description: 'Air merembes dari sambungan atau retakan pipa',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'genteng',
      name: 'Perbaikan Genteng Bocor',
      description: 'Kebocoran yang berasal dari genteng rusak atau bergeser',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'dak',
      name: 'Perbaikan Dak Bocor',
      description: 'Perbaikan kebocoran pada dak beton',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'plafon-genteng',
      name: 'Plafon Bocor (Genteng)',
      description: 'Kebocoran pada plafon yang berasal dari genteng',
      icon: <FaTint className="w-5 h-5" />
    },
    {
      id: 'plafon-after',
      name: 'Perbaikan Plafon Setelah Bocor Teratasi',
      description: 'Perbaikan plafon yang rusak setelah masalah kebocoran selesai',
      icon: <FaTint className="w-5 h-5" />
    }
  ];

  // Problem Section dengan UI yang lebih baik
  const ProblemSection = () => (
    <section id="problem" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Solusi Kebocoran untuk Rumahmu</h2>
        <button 
          onClick={() => setShowHelpPopup(true)}
          className="text-sm text-primary hover:text-primary-dark"
        >
          Butuh Bantuan
        </button>
      </div>

      {/* Popup Bantuan */}
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-sm w-full mx-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <FaQuestionCircle className="text-green-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">Tidak menemukan solusi untuk masalahmu?</h3>
                <p className="text-gray-600 text-sm">Tanya langsung ke Kanapa</p>
              </div>
              <button 
                onClick={() => setShowHelpPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <a 
              href="https://wa.me/your_number" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg"
            >
              Konsultasi Melalui WA <FaArrowLeft className="transform rotate-180" />
            </a>
          </div>
        </div>
      )}
      
      <p className="text-gray-600 mb-4">
        Mohon isi masalah yang butuh perbaikan secara detail
      </p>

      <div className="grid grid-cols-1 gap-3">
        {leakProblems.map((problem) => (
          <button
            key={problem.id}
            onClick={() => {
              if (selectedProblems.includes(problem.id)) {
                setSelectedProblems(selectedProblems.filter(id => id !== problem.id));
              } else {
                setSelectedProblems([...selectedProblems, problem.id]);
              }
            }}
            className={`p-4 border rounded-lg flex items-start gap-3 transition-colors ${
              selectedProblems.includes(problem.id) 
                ? 'border-primary bg-primary/5' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className={`p-2 rounded-full ${
              selectedProblems.includes(problem.id)
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {problem.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className={`font-medium ${
                selectedProblems.includes(problem.id)
                  ? 'text-primary'
                  : 'text-gray-900'
              }`}>
                {problem.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {problem.description}
              </p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedProblems.includes(problem.id)
                ? 'border-primary bg-primary text-white'
                : 'border-gray-300'
            }`}>
              {selectedProblems.includes(problem.id) && (
                <FaCheck className="w-3 h-3" />
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedProblems.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-primary" />
            <div>
              <h3 className="font-medium">Rekomendasi Tukang</h3>
              <p className="text-sm text-gray-600">
                {Math.max(2, selectedProblems.length)} orang tukang
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <div>
              <h3 className="font-medium">Estimasi Pengerjaan</h3>
              <p className="text-sm text-gray-600">
                {currentSolution.estimatedDuration}
              </p>
            </div>
          </div>
        </div>
      )}

      {formErrors.problems && (
        <p className="text-red-500 text-sm mt-2">{formErrors.problems}</p>
      )}
    </section>
  );

  // Tambahkan data tukang ahli
  const expertTypes = [
    {
      id: 'genteng',
      name: 'Ahli Genteng',
      description: 'Spesialis perbaikan dan pemasangan genteng',
      iconType: FaTools,
      iconColor: 'text-red-500'
    },
    {
      id: 'waterproofing',
      name: 'Ahli Waterproofing', 
      description: 'Spesialis pelapisan anti bocor',
      iconType: FaTint,
      iconColor: 'text-red-500'
    }
  ];

  // Data tukang ahli yang tersedia
  const availableTukangList = [
    { 
      id: 1, 
      type: 'Ahli Genteng', 
      description: 'Spesialis perbaikan dan pemasangan genteng',
      forProblems: ['genteng', 'plafon-genteng']
    },
    { 
      id: 2, 
      type: 'Ahli Waterproofing', 
      description: 'Spesialis pelapisan anti bocor',
      forProblems: ['dak', 'plafon-dak', 'rembes']
    },
    { 
      id: 3, 
      type: 'Ahli Pipa', 
      description: 'Spesialis perbaikan pipa dan saluran',
      forProblems: ['pipa', 'rembes']
    }
  ];

  // Modifikasi ServiceTypeSection
  const ServiceTypeSection = () => (
    <section id="quantity" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Jenis Tukang</h2>
        <button className="text-sm text-red-500">ⓘ</button>
      </div>

      {/* Daftar tukang yang dipilih */}
      {tukangList.map((tukang, index) => (
        <div key={tukang.id} className="mb-4 last:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaTools className="text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{tukang.type}</h3>
              <p className="text-sm text-gray-600">{tukang.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  const newList = [...tukangList];
                  if (index === 0) {
                    // Tukang pertama tidak bisa kurang dari 1
                    if (newList[index].quantity > 1) {
                      newList[index].quantity--;
                      setTukangList(newList);
                    }
                  } else {
                    // Tukang tambahan bisa dihapus jika quantity 1
                    if (newList[index].quantity > 1) {
                      newList[index].quantity--;
                      setTukangList(newList);
                    } else {
                      // Hapus tukang dari list jika quantity akan jadi 0
                      setTukangList(tukangList.filter((_, i) => i !== index));
                    }
                  }
                }}
                className={`w-8 h-8 flex items-center justify-center border rounded-full 
                  ${index === 0 && tukang.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                disabled={index === 0 && tukang.quantity === 1}
              >
                {index === 0 ? <FaMinus /> : <FaTimes />}
              </button>
              <span className="w-8 text-center">{tukang.quantity}</span>
              <button 
                onClick={() => {
                  const newList = [...tukangList];
                  if (newList[index].quantity < 3) {
                    newList[index].quantity++;
                    setTukangList(newList);
                  }
                }}
                className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-50"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Tombol tambah tukang */}
      <button
        onClick={() => setShowTukangDropdown(!showTukangDropdown)}
        className="w-full mt-4 p-3 border border-dashed border-primary rounded-lg text-primary flex items-center justify-center gap-2"
      >
        <FaPlus /> Tambah Ahli Tukang Lain
      </button>

      {/* Dropdown untuk memilih tukang tambahan */}
      {showTukangDropdown && (
        <div className="mt-4 border rounded-lg divide-y">
          {availableTukangList
            .filter(tukang => !tukangList.some(selected => selected.id === tukang.id))
            .filter(tukang => 
              selectedProblems.length === 0 || 
              selectedProblems.some(problem => tukang.forProblems.includes(problem))
            )
            .map(tukang => (
              <button
                key={tukang.id}
                onClick={() => {
                  setTukangList([...tukangList, { ...tukang, quantity: 1 }]);
                  setShowTukangDropdown(false);
                }}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 text-left"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FaTools className="text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium">{tukang.type}</h3>
                  <p className="text-sm text-gray-600">{tukang.description}</p>
                </div>
              </button>
            ))}
        </div>
      )}

      {/* Peralatan section */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Peralatan dari tukang:</h3>
          <button 
            onClick={() => setShowTools(!showTools)}
            className="text-primary text-sm"
          >
            {showTools ? 'Sembunyikan' : 'Selengkapnya'}
          </button>
        </div>
        {showTools && (
          <ul className="space-y-2">
            {tools.map((tool, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                {tool}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

  // Material Section
  const MaterialSection = () => (
    <section className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Material (Opsional)</h2>
        <button 
          onClick={() => setShowMaterials(!showMaterials)}
          className="text-primary text-sm"
        >
          {showMaterials ? 'Tutup' : 'Tambah Material'}
        </button>
      </div>

      {/* Tampilkan material yang sudah dipilih */}
      {selectedMaterials.length > 0 && (
        <div className="mb-4 space-y-4">
          <h3 className="font-medium text-sm text-gray-600">Material yang dipilih:</h3>
          {selectedMaterials.map((material) => (
            <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img 
                  src={material.image} 
                  alt={material.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium">{material.name}</h4>
                  <p className="text-sm text-gray-600">
                    Rp{material.price.toLocaleString()}/{material.unit}
                  </p>
                  <p className="text-xs text-gray-500">{material.vendor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    // Langsung hapus material saat tombol X diklik
                    setSelectedMaterials(
                      selectedMaterials.filter(m => m.id !== material.id)
                    );
                  }}
                  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-red-50"
                >
                  <FaTimes className="text-red-500" />
                </button>
                <span className="w-8 text-center">{material.quantity}</span>
                <button 
                  onClick={() => {
                    setSelectedMaterials(selectedMaterials.map(m => 
                      m.id === material.id 
                        ? { ...m, quantity: m.quantity + 1 }
                        : m
                    ));
                  }}
                  className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-50"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Daftar material yang bisa dipilih */}
      {showMaterials && (
        <div className="space-y-4">
          {materials
            .filter(material => !selectedMaterials.some(selected => selected.id === material.id))
            .map((material) => (
              <div key={material.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <img 
                  src={material.image} 
                  alt={material.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{material.name}</h3>
                  <p className="text-sm text-gray-600">{material.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-primary font-medium">
                        Rp{material.price.toLocaleString()}/{material.unit}
                      </p>
                      <p className="text-xs text-gray-500">{material.vendor}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedMaterials([
                          ...selectedMaterials,
                          { ...material, quantity: 1 }
                        ]);
                      }}
                      className="text-primary hover:text-primary-dark"
                    >
                      + Tambah
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );

  // Schedule Section
  const ScheduleSection = () => (
    <section id="schedule" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Jadwalkan</h2>
      <button 
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full p-4 border rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-primary" />
          <span className="text-gray-600">
            {dateRange.startDate 
              ? `${dateRange.startDate}${dateRange.endDate ? ` - ${dateRange.endDate}` : ''}`
              : 'Pilih tanggal dan waktu'
            }
          </span>
        </div>
        <FaArrowLeft className="transform rotate-180" />
      </button>
    </section>
  );

  // Shift Section
  const ShiftSection = () => (
    <section id="shift" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Pilih Sesi</h2>
      <div className="grid grid-cols-3 gap-4">
        {shifts.map(shiftOption => (
          <button 
            key={shiftOption.id}
            onClick={() => setShift(shiftOption.id)}
            className={`p-3 rounded-lg text-center ${
              shift === shiftOption.id 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <div className="font-medium">{shiftOption.label}</div>
            <div className="text-sm">{shiftOption.time}</div>
            <div className="text-sm mt-1">
              Rp{shiftOption.price.toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    </section>
  );

  // Modifikasi DescriptionSection
  const DescriptionSection = () => (
    <section id="description" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Deskripsikan masalah</h2>
      <textarea
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (e.target.value.trim()) {
            setFormErrors({ ...formErrors, description: null });
          }
        }}
        placeholder="Jelaskan kebutuhan perbaikan rumahmu dengan detail agar pengerjaan maksimal"
        className="w-full p-3 border border-gray-300 rounded-lg"
        rows={6}
      />
      {formErrors.description && (
        <p className="text-red-500 text-sm mt-2">{formErrors.description}</p>
      )}
    </section>
  );

  // Photo Section
  const PhotoSection = () => (
    <section id="photos" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Masukkan Foto Masalah</h2>
      <div className="grid grid-cols-2 gap-4">
        <button className="p-3 border rounded-lg flex items-center justify-center gap-2 text-gray-600">
          <FaImage className="text-primary" />
          <span>Pilih dari galeri</span>
        </button>
        <button className="p-3 border rounded-lg flex items-center justify-center gap-2 text-gray-600">
          <FaCamera className="text-primary" />
          <span>Buka kamera</span>
        </button>
      </div>
      {formErrors.photos && (
        <p className="text-red-500 text-sm mt-2">{formErrors.photos}</p>
      )}
    </section>
  );

  // Fungsi untuk mengambil data provinsi
  const fetchProvinces = async () => {
    try {
      setIsLoadingProvinces(true);
      // Untuk testing, gunakan data statis dulu
      const dummyProvinces = [
        { id: 1, name: 'DKI Jakarta' },
        { id: 2, name: 'Jawa Barat' },
        { id: 3, name: 'Jawa Tengah' },
        { id: 4, name: 'Jawa Timur' },
        { id: 5, name: 'Banten' }
      ];
      setProvinces(dummyProvinces);
      
      // Uncomment ini jika API sudah siap
      // const response = await fetch('/api/provinces');
      // const data = await response.json();
      // setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
      setIsLoadingProvinces(false);
    }
  };

  // Tambahkan fungsi fetchCities dengan data dummy
  const fetchCities = async (provinceId) => {
    try {
      // Data dummy untuk testing
      const dummyCities = {
        1: [ // DKI Jakarta
          { id: 1, name: 'Jakarta Pusat', type: 'Kota' },
          { id: 2, name: 'Jakarta Utara', type: 'Kota' },
          { id: 3, name: 'Jakarta Barat', type: 'Kota' },
          { id: 4, name: 'Jakarta Selatan', type: 'Kota' },
          { id: 5, name: 'Jakarta Timur', type: 'Kota' }
        ],
        2: [ // Jawa Barat
          { id: 6, name: 'Bandung', type: 'Kota' },
          { id: 7, name: 'Bekasi', type: 'Kota' },
          { id: 8, name: 'Depok', type: 'Kota' },
          { id: 9, name: 'Bogor', type: 'Kota' },
          { id: 10, name: 'Sukabumi', type: 'Kota' }
        ],
        3: [ // Jawa Tengah
          { id: 11, name: 'Semarang', type: 'Kota' },
          { id: 12, name: 'Solo', type: 'Kota' },
          { id: 13, name: 'Magelang', type: 'Kota' },
          { id: 14, name: 'Pekalongan', type: 'Kota' },
          { id: 15, name: 'Tegal', type: 'Kota' }
        ],
        4: [ // Jawa Timur
          { id: 16, name: 'Surabaya', type: 'Kota' },
          { id: 17, name: 'Malang', type: 'Kota' },
          { id: 18, name: 'Madiun', type: 'Kota' },
          { id: 19, name: 'Kediri', type: 'Kota' },
          { id: 20, name: 'Mojokerto', type: 'Kota' }
        ],
        5: [ // Banten
          { id: 21, name: 'Tangerang', type: 'Kota' },
          { id: 22, name: 'Serang', type: 'Kota' },
          { id: 23, name: 'Cilegon', type: 'Kota' },
          { id: 24, name: 'Tangerang Selatan', type: 'Kota' }
        ]
      };

      // Simulasi loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set cities berdasarkan provinsi yang dipilih
      setCities(dummyCities[provinceId] || []);

      // Uncomment ini jika API sudah siap
      // const response = await fetch(`/api/cities/${provinceId}`);
      // const data = await response.json();
      // setCities(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]); // Reset cities jika terjadi error
    }
  };

  // Tambahkan fungsi fetchDistricts dengan data dummy
  const fetchDistricts = async (cityId) => {
    try {
      // Data dummy untuk kecamatan
      const dummyDistricts = {
        // Jakarta Pusat
        1: [
          { id: 1, name: 'Gambir' },
          { id: 2, name: 'Tanah Abang' },
          { id: 3, name: 'Menteng' },
          { id: 4, name: 'Senen' },
          { id: 5, name: 'Kemayoran' }
        ],
        // Jakarta Selatan
        4: [
          { id: 6, name: 'Kebayoran Baru' },
          { id: 7, name: 'Pancoran' },
          { id: 8, name: 'Setiabudi' },
          { id: 9, name: 'Tebet' },
          { id: 10, name: 'Mampang Prapatan' }
        ],
        // Bandung
        6: [
          { id: 11, name: 'Cicendo' },
          { id: 12, name: 'Coblong' },
          { id: 13, name: 'Bandung Wetan' },
          { id: 14, name: 'Sumur Bandung' },
          { id: 15, name: 'Cibeunying Kaler' }
        ]
        // Tambahkan data kecamatan untuk kota lainnya
      };

      // Simulasi loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set districts berdasarkan kota yang dipilih
      setDistricts(dummyDistricts[cityId] || []);

    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]); // Reset districts jika terjadi error
    }
  };

  // Tambahkan fungsi fetchVillages dengan data dummy
  const fetchVillages = async (districtId) => {
    try {
      // Data dummy untuk kelurahan
      const dummyVillages = {
        // Gambir
        1: [
          { id: 1, name: 'Gambir', postal_code: '10110' },
          { id: 2, name: 'Cideng', postal_code: '10150' },
          { id: 3, name: 'Petojo Utara', postal_code: '10130' }
        ],
        // Tanah Abang
        2: [
          { id: 4, name: 'Kebon Melati', postal_code: '10230' },
          { id: 5, name: 'Kebon Kacang', postal_code: '10240' },
          { id: 6, name: 'Petamburan', postal_code: '10260' }
        ],
        // Kebayoran Baru
        6: [
          { id: 7, name: 'Senayan', postal_code: '12190' },
          { id: 8, name: 'Pulo', postal_code: '12170' },
          { id: 9, name: 'Melawai', postal_code: '12160' }
        ]
        // Tambahkan data kelurahan untuk kecamatan lainnya
      };

      // Simulasi loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set villages berdasarkan kecamatan yang dipilih
      setVillages(dummyVillages[districtId] || []);

    } catch (error) {
      console.error('Error fetching villages:', error);
      setVillages([]); // Reset villages jika terjadi error
    }
  };

  // Load provinsi saat komponen mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Modifikasi AddressSection
  const AddressSection = () => (
    <section id="address" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Alamat Pengerjaan</h2>
      </div>

      {!showAddressForm && !selectedAddress && (
        <button 
          onClick={() => setShowAddressForm(true)}
          className="w-full p-4 border border-dashed rounded-lg flex items-center justify-center gap-2 text-gray-600"
        >
          <FaMapMarkerAlt className="text-primary" />
          <span>Pilih alamat pengerjaan</span>
        </button>
      )}

      {showAddressForm && (
        <div className="space-y-4 mb-4 p-4 border rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provinsi
            </label>
            <select
              value={addressForm.province_id}
              onChange={(e) => {
                setAddressForm({
                  ...addressForm,
                  province_id: e.target.value,
                  city_id: '',
                  district_id: '',
                  village_id: ''
                });
                if (e.target.value) {
                  fetchCities(e.target.value);
                }
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="">Pilih Provinsi</option>
              {isLoadingProvinces ? (
                <option disabled>Loading...</option>
              ) : (
                provinces.map(province => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {addressForm.province_id && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kota/Kabupaten
              </label>
              <select
                value={addressForm.city_id}
                onChange={(e) => {
                  setAddressForm({
                    ...addressForm,
                    city_id: e.target.value,
                    district_id: '',
                    village_id: ''
                  });
                  if (e.target.value) {
                    fetchDistricts(e.target.value);
                  }
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.type} {city.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {addressForm.city_id && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kecamatan
              </label>
              <select
                value={addressForm.district_id}
                onChange={(e) => {
                  setAddressForm({
                    ...addressForm,
                    district_id: e.target.value,
                    village_id: ''
                  });
                  if (e.target.value) {
                    fetchVillages(e.target.value);
                  }
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Pilih Kecamatan</option>
                {isLoadingDistricts ? (
                  <option disabled>Loading...</option>
                ) : (
                  districts.map(district => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}

          {addressForm.district_id && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kelurahan/Desa
              </label>
              <select
                value={addressForm.village_id}
                onChange={(e) => {
                  const village = villages.find(v => v.id === parseInt(e.target.value));
                  setAddressForm({
                    ...addressForm,
                    village_id: e.target.value,
                    postal_code: village?.postal_code || ''
                  });
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Pilih Kelurahan/Desa</option>
                {isLoadingVillages ? (
                  <option disabled>Loading...</option>
                ) : (
                  villages.map(village => (
                    <option key={village.id} value={village.id}>
                      {village.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detail Alamat
            </label>
            <textarea
              value={addressForm.address_detail}
              onChange={(e) => {
                setAddressForm({
                  ...addressForm,
                  address_detail: e.target.value
                });
              }}
              placeholder="Nama jalan, nomor rumah, RT/RW, patokan"
              className="w-full p-2 border rounded-lg"
              rows={3}
              inputMode="text"
              autoComplete="street-address"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input
              type="text"
              value={addressForm.label}
              onChange={(e) => setAddressForm({
                ...addressForm,
                label: e.target.value
              })}
              placeholder="Rumah, Kantor, dll"
              className="w-full p-2 border rounded-lg"
              inputMode="text"
              autoComplete="off"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan
            </label>
            <textarea
              value={addressForm.notes}
              onChange={(e) => {
                setAddressForm({
                  ...addressForm,
                  notes: e.target.value
                });
              }}
              placeholder="Catatan tambahan untuk tukang"
              className="w-full p-2 border rounded-lg"
              rows={2}
              inputMode="text"
              autoComplete="off"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowAddressForm(false);
                setAddressForm({
                  province_id: '',
                  city_id: '',
                  district_id: '',
                  village_id: '',
                  address_detail: '',
                  postal_code: '',
                  label: '',
                  notes: ''
                });
              }}
              className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={() => {
                // Pastikan semua id dikonversi ke number untuk perbandingan
                const selectedProvince = provinces.find(p => p.id === Number(addressForm.province_id));
                const selectedCity = cities.find(c => c.id === Number(addressForm.city_id));
                const selectedDistrict = districts.find(d => d.id === Number(addressForm.district_id));
                const selectedVillage = villages.find(v => v.id === Number(addressForm.village_id));

                if (selectedProvince && selectedCity && selectedDistrict && selectedVillage) {
                  setSelectedAddress({
                    ...addressForm,
                    province_name: selectedProvince.name,
                    city_name: `${selectedCity.type} ${selectedCity.name}`,
                    district_name: selectedDistrict.name,
                    village_name: selectedVillage.name
                  });
                  setShowAddressForm(false);
                } else {
                  // Tampilkan pesan error jika ada data yang belum dipilih
                  setFormErrors({
                    ...formErrors,
                    address: 'Mohon lengkapi semua data alamat'
                  });
                }
              }}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark"
            >
              Simpan Alamat
            </button>
          </div>
        </div>
      )}

      {/* Tampilkan alamat yang dipilih */}
      {selectedAddress && !showAddressForm && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
              {selectedAddress.label || 'Alamat'}
            </span>
            <button
              onClick={() => setShowAddressForm(true)}
              className="text-primary text-sm"
            >
              Ubah
            </button>
          </div>
          <p className="font-medium">{selectedAddress.address_detail}</p>
          {selectedAddress.village_name && selectedAddress.district_name && (
            <p className="text-sm text-gray-600 mt-1">
              {selectedAddress.village_name}, {selectedAddress.district_name}
            </p>
          )}
          {selectedAddress.city_name && selectedAddress.province_name && (
            <p className="text-sm text-gray-600">
              {selectedAddress.city_name}, {selectedAddress.province_name}{' '}
              {selectedAddress.postal_code && selectedAddress.postal_code}
            </p>
          )}
          {selectedAddress.notes && (
            <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded">
              Catatan: {selectedAddress.notes}
            </p>
          )}
        </div>
      )}

      {formErrors.address && (
        <p className="text-red-500 text-sm mt-2">{formErrors.address}</p>
      )}
    </section>
  );

  // Promo Section
  const PromoSection = () => (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Makin Hemat Dengan Promo</h2>
        {selectedPromo && (
          <span className="text-primary text-sm">
            Hemat Rp{calculateDiscount(selectedPromo).toLocaleString()}
          </span>
        )}
      </div>

      <button 
        onClick={() => setShowPromo(!showPromo)}
        className="w-full p-4 border rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏷️</span>
          <span className="text-gray-600">
            {selectedPromo ? selectedPromo.code : 'Pilih atau masukkan kode promo'}
          </span>
        </div>
        <FaArrowLeft className="transform rotate-180" />
      </button>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeaderSection />
      <main className="container mx-auto px-4 pt-20">
        <ProblemSection />
        <ServiceTypeSection />
        <MaterialSection />
        <ScheduleSection />
        <ShiftSection />
        <DescriptionSection />
        <PhotoSection />
        <AddressSection />
        <PromoSection />
      </main>
    </div>
  );
};

export default CreateSolutionOrder;