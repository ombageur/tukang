import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FaqModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      question: 'Bagaimana cara memesan layanan?',
      answer: 'Anda dapat memilih layanan yang diinginkan pada halaman utama, kemudian ikuti langkah-langkah pemesanan yang tersedia.'
    },
    {
      question: 'Berapa lama waktu pengerjaan?',
      answer: 'Waktu pengerjaan bervariasi tergantung jenis dan skala proyek. Estimasi waktu akan diberikan setelah survei lokasi.'
    },
    {
      question: 'Apakah ada garansi pengerjaan?',
      answer: 'Ya, kami memberikan garansi untuk setiap pekerjaan sesuai dengan jenis layanan yang dipilih.'
    },
    {
      question: 'Bagaimana sistem pembayaran?',
      answer: 'Kami menerima pembayaran melalui transfer bank atau tunai dengan sistem termin sesuai progress pekerjaan.'
    },
    {
      question: 'Area mana saja yang dilayani?',
      answer: 'Saat ini kami melayani area JABODETABEK (Jakarta, Bogor, Depok, Tangerang, dan Bekasi).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">FAQ</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqModal; 