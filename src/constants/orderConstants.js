import { FaTools, FaTint } from 'react-icons/fa';

export const prices = {
  seharian: 259000,
  pagi: 199000,
  sore: 199000
};

export const tools = [
  'Roller Cat (Bulu Roller Cat Disediakan Customer)',
  'Bak Cat',
  'Kuas',
  'Skrap Plamir',
  'Kape Stainless'
];

export const shifts = [
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

export const materials = [
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
  {
    id: 2,
    name: 'Cat Nippon Paint Vinilex',
    description: 'Cat interior berkualitas',
    price: 195000,
    unit: '2.5L',
    image: 'https://images.tokopedia.net/img/cache/700/product-1/2020/3/14/8685867/8685867_d11d0c6c-5c87-418d-b5e9-3e11c12d6d75_700_700',
    vendor: 'Material Center',
    category: 'Cat Tembok Interior'
  },
  {
    id: 3,
    name: 'Cat Mowilex Emulsion',
    description: 'Cat tembok interior premium low VOC',
    price: 425000,
    unit: '2.5L',
    image: 'https://images.tokopedia.net/img/cache/700/product-1/2019/12/5/5865512/5865512_b6501f89-3eb4-48d0-8e57-86f1c6efc910_700_700',
    vendor: 'Supplier Cat Berkah',
    category: 'Cat Tembok Interior'
  },
  {
    id: 4,
    name: 'Plamir Tembok Dulux',
    description: 'Plamir untuk meratakan dinding',
    price: 85000,
    unit: '1kg',
    image: 'https://images.tokopedia.net/img/cache/700/product-1/2020/5/15/batch-upload/batch-upload_9f4c4c9c-8a8a-4a8c-8856-643f3b2d2d6c',
    vendor: 'Toko Bangunan Jaya',
    category: 'Plamir'
  }
];

export const promoList = [
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
  {
    id: 'WEEKEND',
    code: 'WEEKEND20',
    title: 'Diskon Akhir Pekan 20%',
    description: 'Potongan 20% maksimal Rp 100.000',
    discount: 20,
    maxDiscount: 100000,
    minTransaction: 300000,
    validUntil: '2024-06-30',
    type: 'percentage',
    icon: '🌟'
  },
  {
    id: 'BULANAN',
    code: 'HEMAT100',
    title: 'Promo Bulanan',
    description: 'Potongan Rp 100.000 minimal transaksi Rp 500.000',
    discount: 100000,
    minTransaction: 500000,
    validUntil: '2024-06-30',
    type: 'fixed',
    icon: '💎'
  }
];

export const expertTypes = [
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