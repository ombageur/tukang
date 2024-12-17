import React, { useState } from 'react';
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
  FaTimes 
} from 'react-icons/fa';

const CreateServiceOrder = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
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
    provinsi: '',
    kotaKab: '',
    kecamatan: '',
    kelurahan: '',
    kodePos: '',
    alamatLengkap: '',
    catatan: ''
  });
  const [showPromo, setShowPromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [promoCode, setPromoCode] = useState('');

  // Tambahkan konstanta yang diperlukan
  const prices = {
    seharian: 259000,
    pagi: 199000,
    sore: 199000
  };

  const tools = [
    'Roller Cat (Bulu Roller Cat Disediakan Customer)',
    'Bak Cat',
    'Kuas',
    'Skrap Plamir',
    'Kape Stainless'
  ];

  const shifts = [
    {
      id: 'seharian',
      label: 'Seharian',
      time: '(08:00 - 17:00)',
      price: 259000
    },
    {
      id: 'pagi',
      label: 'Pagi',
      time: '(08:00 - 12:00)',
      price: 199000
    },
    {
      id: 'sore',
      label: 'Sore',
      time: '(13:00 - 17:00)',
      price: 199000
    }
  ];

  const materials = [
    {
      id: 1,
      name: 'Cat Dulux Weathershield',
      description: 'Cat eksterior premium tahan cuaca',
      price: 385000,
      unit: '2.5L',
      image: 'https://images.tokopedia.net/img/cache/700/product-1/2020/8/5/107607003/107607003_a7821bf6-2ed5-4a66-9b6b-6b9e0c71a339_700_700',
      vendor: 'Toko Bangunan Jaya',
      category: 'Cat Tembok Eksterior'
    },
    // ... material lainnya
  ];

  const promoList = [
    {
      id: 'NEW_USER',
      code: 'NEWUSER50',
      title: 'Diskon 50rb Pengguna Baru',
      description: 'Potongan Rp 50.000 untuk pengguna baru',
      discount: 50000,
      minTransaction: 200000,
      validUntil: '2024-06-30',
      type: 'fixed',
      icon: '🎉'
    },
    // ... promo lainnya
  ];

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
    const materialsTotal = selectedMaterials.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    const serviceTotal = prices[shift] * quantity * days;
    const subtotal = materialsTotal + serviceTotal;
    
    const discount = selectedPromo ? calculateDiscount(selectedPromo) : 0;
    return subtotal - discount;
  };

  // Tambahkan komponen-komponen yang diperlukan
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

      {showMaterials && (
        <div className="space-y-4">
          {materials.map((material) => (
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
                  <button className="text-primary">+ Tambah</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const ServiceTypeSection = () => (
    <section id="quantity" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Jenis Tukang</h2>
        <button className="text-sm text-red-500">ⓘ</button>
      </div>
      
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <FaShoppingCart className="text-red-500" />
          </div>
          <div>
            <h3 className="font-medium">Ahli Cat</h3>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border rounded-full"
          >
            <FaMinus />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded-full"
          >
            <FaPlus />
          </button>
        </div>
      </div>

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
              ? `${formatDate(dateRange.startDate)}${dateRange.endDate ? ` - ${formatDate(dateRange.endDate)}` : ''}`
              : 'Pilih tanggal dan waktu'
            }
          </span>
        </div>
        <FaArrowLeft className="transform rotate-180" />
      </button>

      {showCalendar && (
        <div className="mt-4 border rounded-lg p-4">
          {/* ... calendar content ... */}
        </div>
      )}
    </section>
  );

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

  // Tambahkan section untuk deskripsi masalah
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
        className={`w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
          formErrors.description ? 'border-red-500' : ''
        }`}
      />
      {formErrors.description && (
        <p className="text-red-500 text-sm mt-2">{formErrors.description}</p>
      )}
    </section>
  );

  // Section untuk upload foto
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

  // Section untuk alamat
  const AddressSection = () => (
    <section id="address" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Alamat Pengerjaan</h2>
      <button 
        onClick={() => setShowAddressForm(!showAddressForm)}
        className="w-full p-4 border rounded-lg flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary" />
          <span className="text-gray-600">
            {selectedAddress ? (
              <div className="text-left">
                <p className="font-medium text-gray-900">{addressForm.alamatLengkap}</p>
                <p className="text-sm text-gray-500">
                  {`${addressForm.kelurahan}, ${addressForm.kecamatan}, ${addressForm.kotaKab}`}
                </p>
                <p className="text-sm text-gray-500">
                  {`${addressForm.provinsi} ${addressForm.kodePos}`}
                </p>
              </div>
            ) : (
              'Pilih alamat pengerjaan'
            )}
          </span>
        </div>
        <FaArrowLeft className="transform rotate-180" />
      </button>
      {formErrors.address && (
        <p className="text-red-500 text-sm mt-2">{formErrors.address}</p>
      )}
    </section>
  );

  // Section untuk promo
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
        <MaterialSection />
        <ServiceTypeSection />
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

export default CreateServiceOrder;