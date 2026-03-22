"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { type Plate, type Emirate, type PlateCategory, plates as defaultPlates, emirateImages } from "./plates-data"

// --- Types ---

export interface AdminUser {
  id: string
  username: string
  password: string
  name: string
  createdAt: string
}

export interface Order {
  id: string
  plateId: string
  plateNumber: string
  plateCode: string
  plateEmirate: Emirate
  customerName: string
  customerEmail: string
  customerPhone: string
  paymentMethod: "crypto" | "card"
  status: "pending" | "completed" | "cancelled"
  total: number
  createdAt: string
}

export interface PaymentSettings {
  nowpayments: {
    enabled: boolean
    apiKey: string
    ipnSecret: string
    currencies: string[]
  }
  creditCard: {
    enabled: boolean
    provider: "stripe" | "manual"
    apiKey: string
    secretKey: string
  }
  bankTransfer: {
    enabled: boolean
    whatsappNumber: string
  }
  testMode: boolean
}

export interface SiteSettings {
  storeName: string
  storeDescription: string
  logoUrl: string
  whatsappNumber: string
  phoneNumber: string
  email: string
  instagram: string
  twitter: string
  facebook: string
  metaTitle: string
  metaDescription: string
  keywords: string
}

interface AdminStore {
  // Auth
  isAuthenticated: boolean
  currentAdmin: AdminUser | null
  login: (username: string, password: string) => boolean
  logout: () => void

  // Admins management
  admins: AdminUser[]
  addAdmin: (admin: Omit<AdminUser, "id" | "createdAt">) => void
  updateAdmin: (id: string, updates: Partial<Omit<AdminUser, "id" | "createdAt">>) => void
  deleteAdmin: (id: string) => void

  // Plates
  plates: Plate[]
  addPlate: (plate: Omit<Plate, "id">) => void
  updatePlate: (id: string, updates: Partial<Plate>) => void
  deletePlate: (id: string) => void
  toggleFeatured: (id: string) => void

  // Orders
  orders: Order[]
  updateOrderStatus: (id: string, status: Order["status"]) => void

  // Payment settings
  paymentSettings: PaymentSettings
  updatePaymentSettings: (settings: PaymentSettings) => void

  // Site settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings: SiteSettings) => void
}

// --- Defaults ---

const defaultPaymentSettings: PaymentSettings = {
  nowpayments: {
    enabled: true,
    apiKey: "",
    ipnSecret: "",
    currencies: ["BTC", "ETH", "USDT", "BNB", "USDC"],
  },
  creditCard: {
    enabled: true,
    provider: "stripe",
    apiKey: "",
    secretKey: "",
  },
  bankTransfer: {
    enabled: true,
    whatsappNumber: "+971501234567",
  },
  testMode: true,
}

const defaultSiteSettings: SiteSettings = {
  storeName: "لوحات الإمارات VIP",
  storeDescription: "متجر لبيع أرقام ولوحات السيارات الإماراتية المميزة",
  logoUrl: "",
  whatsappNumber: "+971501234567",
  phoneNumber: "+971501234567",
  email: "info@emiratesplates.ae",
  instagram: "https://instagram.com/emiratesplates",
  twitter: "https://twitter.com/emiratesplates",
  facebook: "https://facebook.com/emiratesplates",
  metaTitle: "لوحات الإمارات VIP | أرقام سيارات مميزة للبيع",
  metaDescription: "متجر لبيع أرقام ولوحات السيارات الإماراتية المميزة",
  keywords: "لوحات سيارات, أرقام مميزة, لوحات دبي, لوحات أبوظبي",
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    plateId: "d1",
    plateNumber: "7",
    plateCode: "A",
    plateEmirate: "dubai",
    customerName: "أحمد محمد",
    customerEmail: "ahmed@example.com",
    customerPhone: "+971501234567",
    paymentMethod: "crypto",
    status: "completed",
    total: 15000000,
    createdAt: "2026-02-10T14:30:00Z",
  },
  {
    id: "ORD-002",
    plateId: "a1",
    plateNumber: "5",
    plateCode: "1",
    plateEmirate: "abudhabi",
    customerName: "خالد عبدالله",
    customerEmail: "khaled@example.com",
    customerPhone: "+971559876543",
    paymentMethod: "card",
    status: "pending",
    total: 18000000,
    createdAt: "2026-02-12T10:15:00Z",
  },
  {
    id: "ORD-003",
    plateId: "s1",
    plateNumber: "3",
    plateCode: "1",
    plateEmirate: "sharjah",
    customerName: "سارة يوسف",
    customerEmail: "sara@example.com",
    customerPhone: "+971507654321",
    paymentMethod: "crypto",
    status: "pending",
    total: 8000000,
    createdAt: "2026-02-13T08:45:00Z",
  },
  {
    id: "ORD-004",
    plateId: "d5",
    plateNumber: "1",
    plateCode: "V",
    plateEmirate: "dubai",
    customerName: "عمر ناصر",
    customerEmail: "omar@example.com",
    customerPhone: "+971504567890",
    paymentMethod: "card",
    status: "completed",
    total: 25000000,
    createdAt: "2026-02-08T16:20:00Z",
  },
  {
    id: "ORD-005",
    plateId: "j1",
    plateNumber: "9",
    plateCode: "A",
    plateEmirate: "ajman",
    customerName: "فاطمة علي",
    customerEmail: "fatima@example.com",
    customerPhone: "+971508765432",
    paymentMethod: "crypto",
    status: "cancelled",
    total: 5500000,
    createdAt: "2026-02-07T12:00:00Z",
  },
]

const defaultAdmins: AdminUser[] = [
  {
    id: "admin_1",
    username: "admin",
    password: "Zoro232594!@#$",
    name: "المشرف الرئيسي",
    createdAt: new Date().toISOString(),
  },
]

const ADMIN_PASSWORD = "Zoro232594!@#$"
const STORAGE_KEYS = {
  auth: "admin_auth",
  currentAdminId: "admin_current_id",
  admins: "admin_users",
  plates: "admin_plates",
  orders: "admin_orders",
  payment: "admin_payment_settings",
  site: "admin_site_settings",
}

// --- Context ---

const AdminContext = createContext<AdminStore | null>(null)

export function useAdmin(): AdminStore {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error("useAdmin must be used within AdminStoreProvider")
  return ctx
}

// --- Provider ---

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null)
  const [admins, setAdmins] = useState<AdminUser[]>(defaultAdmins)
  const [platesState, setPlatesState] = useState<Plate[]>(defaultPlates)
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(defaultPaymentSettings)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const auth = localStorage.getItem(STORAGE_KEYS.auth)
      if (auth === "true") setIsAuthenticated(true)

      const storedAdmins = localStorage.getItem(STORAGE_KEYS.admins)
      if (storedAdmins) setAdmins(JSON.parse(storedAdmins))

      const currentAdminId = localStorage.getItem(STORAGE_KEYS.currentAdminId)
      if (currentAdminId) {
        const storedAdmins2 = localStorage.getItem(STORAGE_KEYS.admins)
        const adminsList: AdminUser[] = storedAdmins2 ? JSON.parse(storedAdmins2) : defaultAdmins
        const found = adminsList.find((a) => a.id === currentAdminId)
        if (found) setCurrentAdmin(found)
      }

      const storedPlates = localStorage.getItem(STORAGE_KEYS.plates)
      if (storedPlates) setPlatesState(JSON.parse(storedPlates))

      const storedOrders = localStorage.getItem(STORAGE_KEYS.orders)
      if (storedOrders) setOrders(JSON.parse(storedOrders))

      const storedPayment = localStorage.getItem(STORAGE_KEYS.payment)
      if (storedPayment) setPaymentSettings(JSON.parse(storedPayment))

      const storedSite = localStorage.getItem(STORAGE_KEYS.site)
      if (storedSite) setSiteSettings(JSON.parse(storedSite))
    } catch {
      // ignore parse errors
    }
    setHydrated(true)
  }, [])

  // Persist changes
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEYS.admins, JSON.stringify(admins))
  }, [admins, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEYS.plates, JSON.stringify(platesState))
  }, [platesState, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders))
  }, [orders, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEYS.payment, JSON.stringify(paymentSettings))
  }, [paymentSettings, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEYS.site, JSON.stringify(siteSettings))
  }, [siteSettings, hydrated])

  // Auth
  const login = useCallback((username: string, password: string) => {
    const found = admins.find(
      (a) => a.username === username && a.password === password
    )
    if (found) {
      setIsAuthenticated(true)
      setCurrentAdmin(found)
      localStorage.setItem(STORAGE_KEYS.auth, "true")
      localStorage.setItem(STORAGE_KEYS.currentAdminId, found.id)
      return true
    }
    return false
  }, [admins])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setCurrentAdmin(null)
    localStorage.removeItem(STORAGE_KEYS.auth)
    localStorage.removeItem(STORAGE_KEYS.currentAdminId)
  }, [])

  // Admins CRUD
  const addAdmin = useCallback((admin: Omit<AdminUser, "id" | "createdAt">) => {
    const newAdmin: AdminUser = {
      ...admin,
      id: `admin_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    setAdmins((prev) => [...prev, newAdmin])
  }, [])

  const updateAdmin = useCallback((id: string, updates: Partial<Omit<AdminUser, "id" | "createdAt">>) => {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)))
    setCurrentAdmin((prev) => (prev?.id === id ? { ...prev, ...updates } : prev))
  }, [])

  const deleteAdmin = useCallback((id: string) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id))
  }, [])

  // Plates CRUD
  const addPlate = useCallback((plate: Omit<Plate, "id">) => {
    const newPlate: Plate = {
      ...plate,
      id: `plate_${Date.now()}`,
    }
    setPlatesState((prev) => [newPlate, ...prev])
  }, [])

  const updatePlate = useCallback((id: string, updates: Partial<Plate>) => {
    setPlatesState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }, [])

  const deletePlate = useCallback((id: string) => {
    setPlatesState((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const toggleFeatured = useCallback((id: string) => {
    setPlatesState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    )
  }, [])

  // Orders
  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    )
  }, [])

  // Settings
  const updatePaymentSettings = useCallback((settings: PaymentSettings) => {
    setPaymentSettings(settings)
  }, [])

  const updateSiteSettings = useCallback((settings: SiteSettings) => {
    setSiteSettings(settings)
  }, [])

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        currentAdmin,
        login,
        logout,
        admins,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        plates: platesState,
        addPlate,
        updatePlate,
        deletePlate,
        toggleFeatured,
        orders,
        updateOrderStatus,
        paymentSettings,
        updatePaymentSettings,
        siteSettings,
        updateSiteSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
