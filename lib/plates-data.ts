export type Emirate =
  | "dubai"
  | "abudhabi"
  | "sharjah"
  | "ajman"
  | "uaq"
  | "rak"
  | "fujairah"

export type PlateCategory = "vip" | "special" | "regular"

export interface Plate {
  id: string
  number: string
  code: string
  emirate: Emirate
  category: PlateCategory
  price: number
  image: string
  featured: boolean
}

export const emirateNames: Record<Emirate, string> = {
  dubai: "دبي",
  abudhabi: "أبوظبي",
  sharjah: "الشارقة",
  ajman: "عجمان",
  uaq: "أم القيوين",
  rak: "رأس الخيمة",
  fujairah: "الفجيرة",
}

export const emirateColors: Record<Emirate, string> = {
  dubai: "border-red-500",
  abudhabi: "border-blue-500",
  sharjah: "border-green-500",
  ajman: "border-orange-500",
  uaq: "border-teal-500",
  rak: "border-amber-700",
  fujairah: "border-fuchsia-600",
}

export const emirateTextColors: Record<Emirate, string> = {
  dubai: "text-red-400",
  abudhabi: "text-blue-400",
  sharjah: "text-green-400",
  ajman: "text-orange-400",
  uaq: "text-teal-400",
  rak: "text-amber-600",
  fujairah: "text-fuchsia-500",
}

export const emirateImages: Record<Emirate, string> = {
  dubai: "/images/dubai-plate.jpg",
  abudhabi: "/images/abudhabi-plate.jpg",
  sharjah: "/images/sharjah-plate.jpg",
  ajman: "/images/ajman-plate.jpg",
  uaq: "/images/uaq-plate.jpg",
  rak: "/images/rak-plate.jpg",
  fujairah: "/images/fujairah-plate.jpg",
}

export const categoryNames: Record<PlateCategory, string> = {
  vip: "VIP مميزة",
  special: "أرقام خاصة",
  regular: "أرقام عادية",
}

export const plates: Plate[] = [
  // Dubai VIP
  { id: "d1", number: "7", code: "A", emirate: "dubai", category: "vip", price: 15000000, image: "/images/dubai-plate.jpg", featured: true },
  { id: "d2", number: "77", code: "B", emirate: "dubai", category: "vip", price: 5500000, image: "/images/dubai-plate.jpg", featured: true },
  { id: "d3", number: "777", code: "AA", emirate: "dubai", category: "vip", price: 2800000, image: "/images/dubai-plate.jpg", featured: true },
  { id: "d4", number: "7777", code: "H", emirate: "dubai", category: "vip", price: 1200000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d5", number: "1", code: "V", emirate: "dubai", category: "vip", price: 25000000, image: "/images/dubai-plate.jpg", featured: true },
  { id: "d6", number: "11", code: "G", emirate: "dubai", category: "vip", price: 4200000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d7", number: "111", code: "K", emirate: "dubai", category: "special", price: 1800000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d8", number: "9999", code: "L", emirate: "dubai", category: "special", price: 950000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d9", number: "5050", code: "M", emirate: "dubai", category: "special", price: 750000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d10", number: "12345", code: "N", emirate: "dubai", category: "regular", price: 350000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d11", number: "55555", code: "O", emirate: "dubai", category: "vip", price: 3800000, image: "/images/dubai-plate.jpg", featured: true },
  { id: "d12", number: "8888", code: "P", emirate: "dubai", category: "special", price: 1100000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d13", number: "99999", code: "Q", emirate: "dubai", category: "special", price: 2200000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d14", number: "34567", code: "R", emirate: "dubai", category: "regular", price: 150000, image: "/images/dubai-plate.jpg", featured: false },
  { id: "d15", number: "67890", code: "S", emirate: "dubai", category: "regular", price: 120000, image: "/images/dubai-plate.jpg", featured: false },

  // Abu Dhabi VIP
  { id: "a1", number: "5", code: "1", emirate: "abudhabi", category: "vip", price: 18000000, image: "/images/abudhabi-plate.jpg", featured: true },
  { id: "a2", number: "55", code: "2", emirate: "abudhabi", category: "vip", price: 6000000, image: "/images/abudhabi-plate.jpg", featured: true },
  { id: "a3", number: "555", code: "6", emirate: "abudhabi", category: "vip", price: 3200000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a4", number: "5555", code: "10", emirate: "abudhabi", category: "special", price: 1400000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a5", number: "9", code: "5", emirate: "abudhabi", category: "vip", price: 12000000, image: "/images/abudhabi-plate.jpg", featured: true },
  { id: "a6", number: "99", code: "11", emirate: "abudhabi", category: "vip", price: 4800000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a7", number: "999", code: "12", emirate: "abudhabi", category: "special", price: 2100000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a8", number: "2222", code: "7", emirate: "abudhabi", category: "special", price: 900000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a9", number: "11111", code: "3", emirate: "abudhabi", category: "special", price: 2900000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a10", number: "45678", code: "8", emirate: "abudhabi", category: "regular", price: 180000, image: "/images/abudhabi-plate.jpg", featured: false },
  { id: "a11", number: "23456", code: "9", emirate: "abudhabi", category: "regular", price: 140000, image: "/images/abudhabi-plate.jpg", featured: false },

  // Sharjah
  { id: "s1", number: "3", code: "1", emirate: "sharjah", category: "vip", price: 8000000, image: "/images/sharjah-plate.jpg", featured: true },
  { id: "s2", number: "33", code: "2", emirate: "sharjah", category: "vip", price: 3500000, image: "/images/sharjah-plate.jpg", featured: false },
  { id: "s3", number: "333", code: "3", emirate: "sharjah", category: "special", price: 1600000, image: "/images/sharjah-plate.jpg", featured: false },
  { id: "s4", number: "3333", code: "4", emirate: "sharjah", category: "special", price: 800000, image: "/images/sharjah-plate.jpg", featured: false },
  { id: "s5", number: "6666", code: "5", emirate: "sharjah", category: "special", price: 650000, image: "/images/sharjah-plate.jpg", featured: false },
  { id: "s6", number: "78901", code: "6", emirate: "sharjah", category: "regular", price: 95000, image: "/images/sharjah-plate.jpg", featured: false },
  { id: "s7", number: "12340", code: "7", emirate: "sharjah", category: "regular", price: 85000, image: "/images/sharjah-plate.jpg", featured: false },

  // Ajman
  { id: "j1", number: "9", code: "A", emirate: "ajman", category: "vip", price: 5500000, image: "/images/ajman-plate.jpg", featured: true },
  { id: "j2", number: "99", code: "B", emirate: "ajman", category: "vip", price: 2200000, image: "/images/ajman-plate.jpg", featured: false },
  { id: "j3", number: "999", code: "C", emirate: "ajman", category: "special", price: 950000, image: "/images/ajman-plate.jpg", featured: false },
  { id: "j4", number: "9999", code: "D", emirate: "ajman", category: "special", price: 550000, image: "/images/ajman-plate.jpg", featured: false },
  { id: "j5", number: "4444", code: "E", emirate: "ajman", category: "special", price: 420000, image: "/images/ajman-plate.jpg", featured: false },
  { id: "j6", number: "56789", code: "F", emirate: "ajman", category: "regular", price: 75000, image: "/images/ajman-plate.jpg", featured: false },

  // UAQ
  { id: "u1", number: "1", code: "A", emirate: "uaq", category: "vip", price: 4000000, image: "/images/uaq-plate.jpg", featured: false },
  { id: "u2", number: "11", code: "B", emirate: "uaq", category: "vip", price: 1800000, image: "/images/uaq-plate.jpg", featured: false },
  { id: "u3", number: "111", code: "C", emirate: "uaq", category: "special", price: 750000, image: "/images/uaq-plate.jpg", featured: false },
  { id: "u4", number: "3333", code: "D", emirate: "uaq", category: "special", price: 380000, image: "/images/uaq-plate.jpg", featured: false },
  { id: "u5", number: "23456", code: "E", emirate: "uaq", category: "regular", price: 55000, image: "/images/uaq-plate.jpg", featured: false },

  // RAK
  { id: "r1", number: "8", code: "A", emirate: "rak", category: "vip", price: 6000000, image: "/images/rak-plate.jpg", featured: true },
  { id: "r2", number: "88", code: "B", emirate: "rak", category: "vip", price: 2800000, image: "/images/rak-plate.jpg", featured: false },
  { id: "r3", number: "888", code: "C", emirate: "rak", category: "special", price: 1200000, image: "/images/rak-plate.jpg", featured: false },
  { id: "r4", number: "8888", code: "D", emirate: "rak", category: "special", price: 650000, image: "/images/rak-plate.jpg", featured: false },
  { id: "r5", number: "34567", code: "E", emirate: "rak", category: "regular", price: 65000, image: "/images/rak-plate.jpg", featured: false },

  // Fujairah
  { id: "f1", number: "6", code: "A", emirate: "fujairah", category: "vip", price: 4500000, image: "/images/fujairah-plate.jpg", featured: true },
  { id: "f2", number: "66", code: "B", emirate: "fujairah", category: "vip", price: 1900000, image: "/images/fujairah-plate.jpg", featured: false },
  { id: "f3", number: "666", code: "C", emirate: "fujairah", category: "special", price: 850000, image: "/images/fujairah-plate.jpg", featured: false },
  { id: "f4", number: "6666", code: "D", emirate: "fujairah", category: "special", price: 450000, image: "/images/fujairah-plate.jpg", featured: false },
  { id: "f5", number: "45678", code: "E", emirate: "fujairah", category: "regular", price: 60000, image: "/images/fujairah-plate.jpg", featured: false },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getPlatesByEmirate(emirate: Emirate): Plate[] {
  return plates.filter((p) => p.emirate === emirate)
}

export function getPlatesByCategory(category: PlateCategory): Plate[] {
  return plates.filter((p) => p.category === category)
}

export function getFeaturedPlates(): Plate[] {
  return plates.filter((p) => p.featured)
}

export function getPlateById(id: string): Plate | undefined {
  return plates.find((p) => p.id === id)
}

export function searchPlates(query: string): Plate[] {
  return plates.filter(
    (p) =>
      p.number.includes(query) ||
      p.code.includes(query) ||
      emirateNames[p.emirate].includes(query)
  )
}
