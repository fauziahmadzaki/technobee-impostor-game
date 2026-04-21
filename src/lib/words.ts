export const CATEGORIES = {
  hewan: [
    "Kucing", "Anjing", "Gajah", "Harimau", "Singa", "Jerapah", "Monyet", "Kelinci",
    "Ular", "Buaya", "Burung Elang", "Ikan Hiu", "Paus", "Kuda", "Sapi", "Kambing",
    "Ayam", "Bebek", "Katak", "Kupu-kupu"
  ],
  makanan: [
    "Nasi Goreng", "Sate", "Rendang", "Bakso", "Soto", "Mie Ayam", "Gado-gado",
    "Pempek", "Ayam Penyet", "Martabak", "Nasi Padang", "Ketoprak", "Nasi Uduk",
    "Gudeg", "Rawon", "Sop Buntut", "Sate Padang", "Opor Ayam", "Ikan Bakar",
    "Ayam Geprek"
  ],
  pekerjaan: [
    "Dokter", "Guru", "Polisi", "Tentara", "Perawat", "Pilot", "Pramugari",
    "Astronot", "Programmer", "Desainer", "Arsitek", "Koki", "Sopir", "Tukang Cukur",
    "Penulis", "Penyanyi", "Aktor", "Atlet", "Petani", "Nelayan"
  ],
  tempat: [
    "Rumah Sakit", "Sekolah", "Kantor Polisi", "Bandara", "Stasiun Kereta",
    "Terminal Bus", "Pasar", "Supermarket", "Mall", "Taman", "Pantai", "Gunung",
    "Hutan", "Kebun Binatang", "Museum", "Perpustakaan", "Restoran", "Kafe",
    "Hotel", "Bank"
  ],
  benda: [
    "Mobil", "Motor", "Sepeda", "Pesawat", "Kereta Api", "Kapal", "Laptop",
    "Handphone", "Televisi", "Kulkas", "Mesin Cuci", "Kipas Angin", "AC",
    "Meja", "Kursi", "Lemari", "Kasur", "Bantal", "Selimut", "Jam Dinding"
  ]
};

export const getAllWords = () => {
  return Object.values(CATEGORIES).flat();
};

export const getRandomWord = () => {
  const allWords = getAllWords();
  const randomIndex = Math.floor(Math.random() * allWords.length);
  return allWords[randomIndex];
};
