"use client"

import { useState } from "react"
import { Save, Bitcoin, CreditCard, Landmark, TestTube, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useAdmin, type PaymentSettings } from "@/lib/admin-store"

const cryptoCurrencies = [
  { id: "BTC", label: "Bitcoin (BTC)" },
  { id: "ETH", label: "Ethereum (ETH)" },
  { id: "USDT", label: "Tether (USDT)" },
  { id: "USDC", label: "USD Coin (USDC)" },
  { id: "BNB", label: "BNB" },
  { id: "SOL", label: "Solana (SOL)" },
  { id: "XRP", label: "Ripple (XRP)" },
  { id: "DOGE", label: "Dogecoin (DOGE)" },
  { id: "LTC", label: "Litecoin (LTC)" },
  { id: "TRX", label: "Tron (TRX)" },
]

export default function PaymentsPage() {
  const { paymentSettings, updatePaymentSettings } = useAdmin()
  const [settings, setSettings] = useState<PaymentSettings>(paymentSettings)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updatePaymentSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function toggleCurrency(currency: string) {
    setSettings((prev) => ({
      ...prev,
      nowpayments: {
        ...prev.nowpayments,
        currencies: prev.nowpayments.currencies.includes(currency)
          ? prev.nowpayments.currencies.filter((c) => c !== currency)
          : [...prev.nowpayments.currencies, currency],
      },
    }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إعدادات الدفع</h1>
          <p className="text-sm text-muted-foreground">إدارة بوابات الدفع وطرق الاستقبال</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "تم الحفظ" : "حفظ الإعدادات"}
        </Button>
      </div>

      {/* Test Mode */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <TestTube className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-medium text-foreground">وضع الاختبار</p>
              <p className="text-xs text-muted-foreground">استخدم بيانات اختبارية بدون معاملات حقيقية</p>
            </div>
          </div>
          <Switch
            checked={settings.testMode}
            onCheckedChange={(v) => setSettings((p) => ({ ...p, testMode: v }))}
          />
        </CardContent>
      </Card>

      {/* NOWPayments */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                <Bitcoin className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">NOWPayments</CardTitle>
                <CardDescription className="text-muted-foreground">قبول المدفوعات بالعملات الرقمية</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={settings.nowpayments.enabled ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-border text-muted-foreground"}>
                {settings.nowpayments.enabled ? "مفعّل" : "معطّل"}
              </Badge>
              <Switch
                checked={settings.nowpayments.enabled}
                onCheckedChange={(v) => setSettings((p) => ({ ...p, nowpayments: { ...p.nowpayments, enabled: v } }))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">API Key</Label>
            <Input
              value={settings.nowpayments.apiKey}
              onChange={(e) => setSettings((p) => ({ ...p, nowpayments: { ...p.nowpayments, apiKey: e.target.value } }))}
              placeholder="أدخل مفتاح API من NOWPayments"
              className="border-border bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground"
              dir="ltr"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">IPN Secret Key</Label>
            <Input
              type="password"
              value={settings.nowpayments.ipnSecret}
              onChange={(e) => setSettings((p) => ({ ...p, nowpayments: { ...p.nowpayments, ipnSecret: e.target.value } }))}
              placeholder="أدخل مفتاح IPN السري"
              className="border-border bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground"
              dir="ltr"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">العملات المقبولة</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {cryptoCurrencies.map((currency) => (
                <label
                  key={currency.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2.5 transition-colors hover:bg-accent"
                >
                  <Checkbox
                    checked={settings.nowpayments.currencies.includes(currency.id)}
                    onCheckedChange={() => toggleCurrency(currency.id)}
                  />
                  <span className="text-xs text-foreground">{currency.label}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Card */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <CreditCard className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">البطاقة الائتمانية</CardTitle>
                <CardDescription className="text-muted-foreground">قبول المدفوعات بالبطاقة الائتمانية</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={settings.creditCard.enabled ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-border text-muted-foreground"}>
                {settings.creditCard.enabled ? "مفعّل" : "معطّل"}
              </Badge>
              <Switch
                checked={settings.creditCard.enabled}
                onCheckedChange={(v) => setSettings((p) => ({ ...p, creditCard: { ...p.creditCard, enabled: v } }))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">مزود الخدمة</Label>
            <Select
              value={settings.creditCard.provider}
              onValueChange={(v) => setSettings((p) => ({ ...p, creditCard: { ...p.creditCard, provider: v as "stripe" | "manual" } }))}
            >
              <SelectTrigger className="border-border bg-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                <SelectItem value="stripe" className="text-foreground">Stripe</SelectItem>
                <SelectItem value="manual" className="text-foreground">تحويل يدوي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {settings.creditCard.provider === "stripe" && (
            <>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Publishable Key</Label>
                <Input
                  value={settings.creditCard.apiKey}
                  onChange={(e) => setSettings((p) => ({ ...p, creditCard: { ...p.creditCard, apiKey: e.target.value } }))}
                  placeholder="pk_live_..."
                  className="border-border bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Secret Key</Label>
                <Input
                  type="password"
                  value={settings.creditCard.secretKey}
                  onChange={(e) => setSettings((p) => ({ ...p, creditCard: { ...p.creditCard, secretKey: e.target.value } }))}
                  placeholder="sk_live_..."
                  className="border-border bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Bank Transfer */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                <Landmark className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">التحويل البنكي</CardTitle>
                <CardDescription className="text-muted-foreground">قبول المدفوعات عبر التحويل البنكي</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={settings.bankTransfer?.enabled ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-border text-muted-foreground"}>
                {settings.bankTransfer?.enabled ? "مفعّل" : "معطّل"}
              </Badge>
              <Switch
                checked={settings.bankTransfer?.enabled ?? false}
                onCheckedChange={(v) => setSettings((p) => ({ ...p, bankTransfer: { ...p.bankTransfer, enabled: v, whatsappNumber: p.bankTransfer?.whatsappNumber || "" } }))}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">رقم الواتساب للتواصل</Label>
            <Input
              value={settings.bankTransfer?.whatsappNumber || ""}
              onChange={(e) => setSettings((p) => ({ ...p, bankTransfer: { ...p.bankTransfer, enabled: p.bankTransfer?.enabled ?? false, whatsappNumber: e.target.value } }))}
              placeholder="+971501234567"
              className="border-border bg-background font-mono text-sm text-foreground placeholder:text-muted-foreground"
              dir="ltr"
            />
            <p className="text-xs text-muted-foreground">سيتم توجيه العملاء للتواصل عبر الواتساب لإتمام عملية التحويل البنكي</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
