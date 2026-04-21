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

export const getRandomWordAndCategory = (selectedCategory: string) => {
  let categoryKey = selectedCategory.toLowerCase();
  
  if (selectedCategory === "Acak" || !CATEGORIES[categoryKey as keyof typeof CATEGORIES]) {
    const keys = Object.keys(CATEGORIES);
    categoryKey = keys[Math.floor(Math.random() * keys.length)];
  }

  const words = CATEGORIES[categoryKey as keyof typeof CATEGORIES];
  const word = words[Math.floor(Math.random() * words.length)];
  
  // Format category to title case for display (e.g., "hewan" -> "Hewan")
  const categoryName = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
  
  return { word, categoryName };
};
