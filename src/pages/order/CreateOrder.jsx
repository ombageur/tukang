import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { 
  prices, 
  tools, 
  shifts, 
  materials, 
  promoList 
} from '../../constants/orderConstants';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [shift, setShift] = useState('pagi'); // Changed from 'seharian' to 'pagi'
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

  const provinces = [
    'Aceh',
    'Sumatera Utara',
    'Sumatera Barat',
    'Riau',
    'Jambi',
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'DI Yogyakarta',
    'Jawa Timur',
    'Bali'
  ];

  const calculateDays = () => {
    if (!dateRange.startDate || !dateRange.endDate) return 1;
    
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 karena termasuk hari pertama
    return diffDays;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const materialsTotal = selectedMaterials.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
    const serviceTotal = prices[shift] * quantity * days;
    const subtotal = materialsTotal + serviceTotal;
    
    // Kurangi dengan diskon jika ada promo
    const discount = selectedPromo ? calculateDiscount(selectedPromo) : 0;
    return subtotal - discount;
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  const MaterialSection = () => (
    <section className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Mohon Siapkan Material</h2>
      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg mb-4">
        <div className="flex items-center">
          <FaShoppingCart className="text-orange-500 mr-2" />
          <span className="text-sm">
            {selectedMaterials.length > 0 
              ? `${selectedMaterials.length} material dipilih` 
              : 'Pilih material yang dibutuhkan'}
          </span>
        </div>
        <button 
          onClick={() => setShowMaterials(!showMaterials)}
          className="text-primary text-sm font-medium"
        >
          {showMaterials ? '← Kembali' : 'Selengkapnya →'}
        </button>
      </div>

      {/* Material List Dropdown */}
      {showMaterials && (
        <div className="space-y-4">
          {materials.map((material) => (
            <div key={material.id} className="border rounded-lg p-4">
              <div className="flex gap-4">
                <img 
                  src={material.image} 
                  alt={material.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-gray-600">{material.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Vendor: {material.vendor}</p>
                    </div>
                    <span className="font-medium">
                      Rp{material.price.toLocaleString()}/{material.unit}
                    </span>
                  </div>
                  
                  {/* Quantity Control */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">{material.category}</span>
                    <div className="flex items-center gap-3">
                      {selectedMaterials.find(m => m.id === material.id) ? (
                        <>
                          <button 
                            onClick={() => {
                              const item = selectedMaterials.find(m => m.id === material.id);
                              if (item.quantity === 1) {
                                setSelectedMaterials(selectedMaterials.filter(m => m.id !== material.id));
                              } else {
                                setSelectedMaterials(selectedMaterials.map(m => 
                                  m.id === material.id 
                                    ? {...m, quantity: m.quantity - 1}
                                    : m
                                ));
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center border rounded-full"
                          >
                            <FaMinus />
                          </button>
                          <span className="w-8 text-center">
                            {selectedMaterials.find(m => m.id === material.id)?.quantity || 0}
                          </span>
                          <button 
                            onClick={() => {
                              const exists = selectedMaterials.find(m => m.id === material.id);
                              if (exists) {
                                setSelectedMaterials(selectedMaterials.map(m => 
                                  m.id === material.id 
                                    ? {...m, quantity: m.quantity + 1}
                                    : m
                                ));
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center border rounded-full"
                          >
                            <FaPlus />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setSelectedMaterials([...selectedMaterials, {...material, quantity: 1}])}
                          className="px-4 py-2 bg-primary text-white rounded-lg"
                        >
                          Tambah
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Materials Summary */}
      {!showMaterials && selectedMaterials.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedMaterials.map((material) => (
            <div key={material.id} className="flex justify-between items-center text-sm">
              <span>{material.name} x{material.quantity}</span>
              <span>Rp{(material.price * material.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  const ScheduleSection = () => (
    <section className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Jadwalkan</h2>
        {calculateDays() > 1 && (
          <span className="text-sm text-gray-600">
            Total: {calculateDays()} hari
          </span>
        )}
      </div>
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

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div className="mt-4 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Pilih Tanggal</h3>
            <button 
              onClick={() => setShowCalendar(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tanggal Mulai */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Tanggal Mulai
              </label>
              <input
                type="date"
                min={getMinDate()}
                value={dateRange.startDate}
                onChange={(e) => setDateRange({
                  ...dateRange,
                  startDate: e.target.value,
                  // Reset endDate jika startDate lebih besar
                  endDate: e.target.value > dateRange.endDate ? '' : dateRange.endDate
                })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Tanggal Selesai */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Tanggal Selesai
              </label>
              <input
                type="date"
                min={dateRange.startDate || getMinDate()}
                value={dateRange.endDate}
                onChange={(e) => setDateRange({
                  ...dateRange,
                  endDate: e.target.value
                })}
                disabled={!dateRange.startDate}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Konfirmasi Button */}
          <button
            onClick={() => setShowCalendar(false)}
            disabled={!dateRange.startDate}
            className="w-full mt-4 py-3 bg-primary text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Konfirmasi Tanggal
          </button>
        </div>
      )}
    </section>
  );

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
          <button 
            onClick={() => {
              if (validateForm()) {
                // Lanjut ke checkout
                console.log('Proceed to checkout');
              } else {
                // Scroll ke error pertama
                const firstError = Object.keys(formErrors)[0];
                const element = document.getElementById(firstError);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
            }}
            className={`px-4 py-2 rounded-lg flex items-center ${
              Object.keys(formErrors).length > 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary hover:bg-primary-dark'
            } text-white`}
          >
            <FaShoppingCart className="mr-2" />
            Checkout
          </button>
        </div>
      </div>
    </header>
  );

  const AddressSection = () => (
    <section id="address" className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h2 className="font-semibold text-lg mb-4">Alamat Pengerjaan</h2>
      
      {!showAddressForm ? (
        <button 
          onClick={() => setShowAddressForm(true)}
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
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Detail Alamat</h3>
            <button 
              onClick={() => setShowAddressForm(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            {/* Provinsi */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Provinsi <span className="text-red-500">*</span>
              </label>
              <select
                value={addressForm.provinsi}
                onChange={(e) => {
                  setAddressForm({
                    ...addressForm,
                    provinsi: e.target.value,
                    kotaKab: '', // Reset dependent fields
                    kecamatan: '',
                    kelurahan: ''
                  });
                  setFormErrors({ ...formErrors, address: null });
                }}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* Kota/Kabupaten - Akan diisi setelah provinsi dipilih */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Kota/Kabupaten <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressForm.kotaKab}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, kotaKab: e.target.value });
                  setFormErrors({ ...formErrors, address: null });
                }}
                placeholder="Masukkan nama kota/kabupaten"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Kecamatan */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Kecamatan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressForm.kecamatan}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, kecamatan: e.target.value });
                  setFormErrors({ ...formErrors, address: null });
                }}
                placeholder="Masukkan nama kecamatan"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Kelurahan */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Kelurahan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressForm.kelurahan}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, kelurahan: e.target.value });
                  setFormErrors({ ...formErrors, address: null });
                }}
                placeholder="Masukkan nama kelurahan"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Kode Pos */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Kode Pos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressForm.kodePos}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, kodePos: e.target.value });
                  setFormErrors({ ...formErrors, address: null });
                }}
                placeholder="Masukkan kode pos"
                maxLength="5"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Alamat Lengkap */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                value={addressForm.alamatLengkap}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, alamatLengkap: e.target.value });
                  setFormErrors({ ...formErrors, address: null });
                }}
                placeholder="Masukkan alamat lengkap (nama jalan, nomor rumah, RT/RW)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-24"
              />
            </div>

            {/* Catatan Alamat */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Catatan (Opsional)
              </label>
              <input
                type="text"
                value={addressForm.catatan}
                onChange={(e) => setAddressForm({ ...addressForm, catatan: e.target.value })}
                placeholder="Tambahkan catatan untuk alamat ini"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Simpan Alamat Button */}
            <button
              onClick={() => {
                if (validateAddress()) {
                  setSelectedAddress(true);
                  setShowAddressForm(false);
                }
              }}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Simpan Alamat
            </button>
          </div>
        </div>
      )}

      {formErrors.address && (
        <p className="text-red-500 text-sm mt-2">{formErrors.address}</p>
      )}
    </section>
  );

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

      {showPromo && (
        <div className="mt-4 border rounded-lg p-4">
          {/* Manual Input Promo */}
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Masukkan kode promo"
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button 
                className="px-4 py-2 bg-primary text-white rounded-lg"
                onClick={() => {
                  const promo = promoList.find(p => p.code === promoCode);
                  if (promo) {
                    setSelectedPromo(promo);
                    setShowPromo(false);
                    setPromoCode('');
                  }
                }}
              >
                Pakai
              </button>
            </div>
          </div>

          {/* Promo List */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-gray-600">Promo Tersedia</h3>
            {promoList.map((promo) => (
              <div 
                key={promo.id}
                className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedPromo(promo);
                  setShowPromo(false);
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{promo.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{promo.title}</h4>
                      <span className="text-primary text-sm">
                        {promo.type === 'fixed' 
                          ? `Rp${promo.discount.toLocaleString()}`
                          : `${promo.discount}%`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        Min. transaksi Rp{promo.minTransaction.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        Berlaku s/d {new Date(promo.validUntil).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPromo && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-600 font-medium">Promo berhasil dipakai!</p>
              <p className="text-sm text-green-500">
                Hemat Rp{calculateDiscount(selectedPromo).toLocaleString()}
              </p>
            </div>
            <button 
              onClick={() => setSelectedPromo(null)}
              className="text-red-500 hover:text-red-600"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </section>
  );

  const validateAddress = () => {
    const requiredFields = ['provinsi', 'kotaKab', 'kecamatan', 'kelurahan', 'kodePos', 'alamatLengkap'];
    const errors = {};

    requiredFields.forEach(field => {
      if (!addressForm[field].trim()) {
        errors.address = 'Lengkapi semua field alamat yang wajib diisi';
      }
    });

    if (addressForm.kodePos.length !== 5) {
      errors.address = 'Kode pos harus 5 digit';
    }

    setFormErrors({ ...formErrors, ...errors });
    return Object.keys(errors).length === 0;
  };

  const validateForm = () => {
    const errors = {};
    
    // Validasi Jenis Tukang
    if (quantity < 1) {
      errors.quantity = 'Pilih jumlah tukang';
    }

    // Validasi Jadwal
    if (!dateRange.startDate) {
      errors.schedule = 'Pilih tanggal pengerjaan';
    }

    // Validasi Sesi
    if (!shift) {
      errors.shift = 'Pilih sesi pengerjaan';
    }

    // Validasi Deskripsi
    if (!description.trim()) {
      errors.description = 'Deskripsikan masalah yang akan dikerjakan';
    }

    // Validasi Foto (asumsi state photos akan ditambahkan)
    if (!photos || photos.length === 0) {
      errors.photos = 'Tambahkan foto masalah';
    }

    // Validasi Alamat
    if (!selectedAddress) {
      errors.address = 'Pilih alamat pengerjaan';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HeaderSection />
      <main className="container mx-auto px-4 pt-20">
        <MaterialSection />

        {/* Service Type Section */}
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

          <button className="w-full mt-4 py-3 border border-primary text-primary rounded-lg flex items-center justify-center">
            <FaPlus className="mr-2" />
            Tambah Tukang Lain
          </button>
          {formErrors.quantity && (
            <p className="text-red-500 text-sm mt-2">{formErrors.quantity}</p>
          )}
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <ScheduleSection />
          {formErrors.schedule && (
            <p className="text-red-500 text-sm mt-2">{formErrors.schedule}</p>
          )}
        </section>

        {/* Shift Selection Section */}
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
          {formErrors.shift && (
            <p className="text-red-500 text-sm mt-2">{formErrors.shift}</p>
          )}
        </section>

        {/* Description Section */}
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

        {/* Upload Photo Section */}
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

        {/* Address Section */}
        <AddressSection />

        {/* Promo Section */}
        <PromoSection />
      </main>
    </div>
  );
};

export default CreateOrder; 