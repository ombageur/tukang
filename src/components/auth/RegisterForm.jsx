import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';

const RegisterForm = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: '',
    // Fields khusus partner
    partnerType: 'tukang',
    skills: '',
    experienceYears: '',
    // Fields khusus vendor
    companyName: '',
    ownerName: '',
    businessLicenseNumber: '',
  });

  // Pisahkan keahlian berdasarkan tipe
  const skillOptions = {
    tukang: [
      {
        id: 'keramik',
        label: 'Ahli Tukang Keramik',
        description: 'Ahli bongkar pasang keramik dan porselen untuk lantai maupun dinding'
      },
      {
        id: 'listrik',
        label: 'Ahli Tukang Listrik',
        description: 'Siap bantu instalasi listrik, memasang stop kontak, fitting lampu dan permasalahan listrik lainnya'
      },
      {
        id: 'kenek',
        label: 'Kenek (Ast. Jagoan)',
        description: 'Asisten tukang agar pekerjaan lebih cepat selesai'
      },
      {
        id: 'aluminium',
        label: 'Ahli Tukang Aluminium Aksesoris',
        description: 'Tenaga ahli untuk berbagai pekerjaan seputar pintu dan jendela'
      },
      {
        id: 'batu',
        label: 'Ahli Tukang Batu',
        description: 'Siap bereskan segala pekerjaan dinding, tembok, batu alam dan conblock'
      },
      {
        id: 'pipa',
        label: 'Ahli Tukang Pipa',
        description: 'Perbaiki pipa bocor, saluran pipa macet, pipa air besih / kotor'
      },
      {
        id: 'waterproofing',
        label: 'Ahli Tukang Waterproofing',
        description: 'Betulkan genteng / atap atau bagian rumah lainnya yang rentan bocor'
      },
      {
        id: 'gali',
        label: 'Ahli Tukang Gali',
        description: 'Tukang untuk segala keperluan bergali'
      },
      {
        id: 'las',
        label: 'Ahli Tukang Besi (Las)',
        description: 'Ahlinya permasalahan ngelas besi untuk rumahmu'
      },
      {
        id: 'genteng',
        label: 'Ahli Tukang Genteng',
        description: 'Tukang ahli masalah genteng dan atap'
      },
      {
        id: 'plafon',
        label: 'Ahli Tukang Plafon',
        description: 'Bantu selesaikan masalah plafon rusak, berlumut, roboh dan lainnya'
      },
      {
        id: 'sanitair',
        label: 'Ahli Tukang Sanitair',
        description: 'Andalan pasang wastafel, kloset, keran air, shower dan permasalahan sanitair lain'
      },
      {
        id: 'angkat',
        label: 'Ahli Tukang Angkat',
        description: 'Untuk keperluan mengangkat barang-barang rumahmu'
      },
      {
        id: 'listrik_rapih',
        label: 'Ahli Tukang Listrik Perapihan',
        description: 'Bongkar, perbaiki kabel listrik dan rapikan'
      },
      {
        id: 'pipa_rapih',
        label: 'Ahli Tukang Pipa Perapihan',
        description: 'Bongkar, perbaiki pipa dan rapikan'
      },
      {
        id: 'cat',
        label: 'Ahli Tukang Cat',
        description: 'Bantu membuang cat lama, melakukan cat dasar, finishing dan segala permasalahan cat lainnya'
      }
    ],
    arsitek: [
      {
        id: 'konsultan',
        label: 'Konsultan',
        description: 'Bantu menentukan jumlah materi dan tukang yang cocok untuk proyekmu'
      }
    ]
  };

  // Tambahkan state untuk keahlian yang dipilih
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Handle perubahan keahlian
  const handleSkillChange = (skillId) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillId)) {
        return prev.filter(id => id !== skillId);
      } else {
        return [...prev, skillId];
      }
    });
  };

  // Update tampilan form untuk menampilkan keahlian berdasarkan tipe mitra
  const renderSkillOptions = () => {
    const options = formData.partnerType === 'arsitek' ? skillOptions.arsitek : skillOptions.tukang;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg">
        {options.map((skill) => (
          <div 
            key={skill.id}
            className="relative flex items-start p-4 border rounded-lg hover:bg-white transition-colors"
          >
            <div className="flex items-center h-5">
              <input
                id={skill.id}
                type="checkbox"
                checked={selectedSkills.includes(skill.id)}
                onChange={() => handleSkillChange(skill.id)}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
            </div>
            <div className="ml-3">
              <label htmlFor={skill.id} className="font-medium text-gray-700">
                {skill.label}
              </label>
              <p className="text-sm text-gray-500">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validasi dasar
      if (!formData.email || !formData.password) {
        alert('Email dan password harus diisi!');
        return;
      }

      // Validasi password
      if (formData.password !== formData.confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }

      // Validasi keahlian untuk partner
      if (userType === 'partner' && selectedSkills.length === 0) {
        alert('Pilih minimal satu keahlian!');
        return;
      }

      // Siapkan data untuk dikirim
      const dataToSend = {
        ...formData,
        userType,
        skills: selectedSkills
      };

      // Hapus confirmPassword dari data yang dikirim
      delete dataToSend.confirmPassword;

      console.log('Sending registration data:', dataToSend); // Untuk debugging

      const response = await fetch('/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log('Registration response:', data); // Untuk debugging
      
      if (data.success) {
        alert('Registrasi berhasil! Silakan login.');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Registrasi gagal!');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Daftar Akun Baru
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex justify-center space-x-4">
              {/* User Type Selection Buttons */}
              <button
                className={`px-4 py-2 rounded-full ${
                  userType === 'user' ? 'bg-primary text-white' : 'bg-gray-100'
                }`}
                onClick={() => setUserType('user')}
              >
                Pengguna
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  userType === 'partner' ? 'bg-primary text-white' : 'bg-gray-100'
                }`}
                onClick={() => setUserType('partner')}
              >
                Mitra
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  userType === 'vendor' ? 'bg-primary text-white' : 'bg-gray-100'
                }`}
                onClick={() => setUserType('vendor')}
              >
                Vendor
              </button>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Konfirmasi Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {/* Conditional Fields based on userType */}
            {userType === 'partner' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipe Mitra
                  </label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.partnerType}
                    onChange={(e) => {
                      setFormData({ ...formData, partnerType: e.target.value });
                      setSelectedSkills([]); // Reset selected skills when changing partner type
                    }}
                  >
                    <option value="tukang">Tukang</option>
                    <option value="arsitek">Arsitek</option>
                  </select>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Keahlian
                  </label>
                  {renderSkillOptions()}
                  {selectedSkills.length === 0 && (
                    <p className="mt-2 text-sm text-red-600">
                      Pilih minimal satu keahlian
                    </p>
                  )}
                </div>
              </>
            )}

            {userType === 'vendor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nomor SIUP
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                    value={formData.businessLicenseNumber}
                    onChange={(e) => setFormData({ ...formData, businessLicenseNumber: e.target.value })}
                  />
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Daftar
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <a href="/login" className="font-medium text-primary hover:text-primary-dark">
                Masuk di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 