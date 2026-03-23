"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  Save,
  Globe,
  Phone,
  Share2,
  Search,
  CheckCircle2,
  Upload,
  X,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdmin, type SiteSettings } from "@/lib/admin-store"

export default function SettingsPage() {
  const { siteSettings, updateSiteSettings } = useAdmin()
  const [settings, setSettings] = useState<SiteSettings>(siteSettings)
  const [saved, setSaved] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>(siteSettings.logoUrl || "/images/logo.png")
  const [logoError, setLogoError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleSave() {
    updateSiteSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function update(key: keyof SiteSettings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function handleLogoFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLogoError("")

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      setLogoError("يرجى اختيار صورة بصيغة PNG أو JPG أو SVG أو WebP")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setLogoError("حجم الصورة يجب أن يكون أقل من 2MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      setLogoPreview(result)
      update("logoUrl", result)
    }
    reader.readAsDataURL(file)
  }

  function handleResetLogo() {
    setLogoPreview("/images/logo.png")
    update("logoUrl", "")
    if (fileInputRef.current) fileInputRef.current.value = ""
    setLogoError("")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إعدادات الموقع</h1>
          <p className="text-sm text-muted-foreground">إدارة الإعدادات العامة والتواصل والسيو</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "تم الحفظ" : "حفظ الإعدادات"}
        </Button>
      </div>

      <Tabs defaultValue="general" dir="rtl">
        <TabsList className="w-full justify-start bg-card border border-border">
          <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Globe className="h-4 w-4" />
            عام
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Phone className="h-4 w-4" />
            التواصل
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Share2 className="h-4 w-4" />
            التواصل الاجتماعي
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">الإعدادات العامة</CardTitle>
              <CardDescription className="text-muted-foreground">اسم الموقع والشعار والوصف</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">

              {/* Site Name */}
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">اسم الموقع</Label>
                <Input
                  value={settings.storeName}
                  onChange={(e) => update("storeName", e.target.value)}
                  placeholder="مثال: متجر اللوحات"
                  className="border-border bg-background text-foreground"
                />
                <p className="text-xs text-muted-foreground">هذا الاسم يظهر في الهيدر وعنوان المتصفح</p>
              </div>

              {/* Logo Upload */}
              <div className="flex flex-col gap-3">
                <Label className="text-foreground">شعار الموقع (اللوجو)</Label>

                {/* Preview */}
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-32 items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30">
                    {logoPreview ? (
                      <Image
                        src={logoPreview}
                        alt="معاينة اللوجو"
                        width={120}
                        height={60}
                        className="h-14 w-auto object-contain"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-foreground">اللوجو الحالي</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, SVG, WebP - بحد أقصى 2MB</p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-3.5 w-3.5" />
                        رفع لوجو جديد
                      </Button>
                      {settings.logoUrl && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="gap-1.5 text-muted-foreground hover:text-destructive"
                          onClick={handleResetLogo}
                        >
                          <X className="h-3.5 w-3.5" />
                          إعادة تعيين
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
                  className="hidden"
                  onChange={handleLogoFileChange}
                />

                {logoError && (
                  <p className="text-sm text-destructive">{logoError}</p>
                )}

                {/* Or by URL */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-muted-foreground">أو أدخل رابط الصورة</Label>
                  <Input
                    value={settings.logoUrl.startsWith("data:") ? "" : settings.logoUrl}
                    onChange={(e) => {
                      update("logoUrl", e.target.value)
                      if (e.target.value) setLogoPreview(e.target.value)
                    }}
                    placeholder="https://example.com/logo.png"
                    className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">وصف المتجر</Label>
                <Textarea
                  value={settings.storeDescription}
                  onChange={(e) => update("storeDescription", e.target.value)}
                  rows={3}
                  className="border-border bg-background text-foreground"
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">معلومات التواصل</CardTitle>
              <CardDescription className="text-muted-foreground">أرقام الهاتف والبريد الإلكتروني</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">رقم الواتساب</Label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  placeholder="+971501234567"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
                <p className="text-xs text-muted-foreground">أدخل الرقم مع رمز الدولة</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">رقم الهاتف</Label>
                <Input
                  value={settings.phoneNumber}
                  onChange={(e) => update("phoneNumber", e.target.value)}
                  placeholder="+971501234567"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">البريد الإلكتروني</Label>
                <Input
                  value={settings.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="info@example.com"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social */}
        <TabsContent value="social" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">وسائل التواصل الاجتماعي</CardTitle>
              <CardDescription className="text-muted-foreground">روابط حسابات التواصل الاجتماعي</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Instagram</Label>
                <Input
                  value={settings.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Twitter / X</Label>
                <Input
                  value={settings.twitter}
                  onChange={(e) => update("twitter", e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Facebook</Label>
                <Input
                  value={settings.facebook}
                  onChange={(e) => update("facebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">تحسين محركات البحث (SEO)</CardTitle>
              <CardDescription className="text-muted-foreground">إعدادات الـ Meta Tags والكلمات المفتاحية</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">عنوان الصفحة (Meta Title)</Label>
                <Input
                  value={settings.metaTitle}
                  onChange={(e) => update("metaTitle", e.target.value)}
                  className="border-border bg-background text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  {settings.metaTitle.length}/60 حرف
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">الوصف (Meta Description)</Label>
                <Textarea
                  value={settings.metaDescription}
                  onChange={(e) => update("metaDescription", e.target.value)}
                  rows={3}
                  className="border-border bg-background text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  {settings.metaDescription.length}/160 حرف
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">الكلمات المفتاحية</Label>
                <Textarea
                  value={settings.keywords}
                  onChange={(e) => update("keywords", e.target.value)}
                  rows={2}
                  placeholder="كلمة1, كلمة2, كلمة3"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">افصل بين الكلمات بفاصلة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


export default function SettingsPage() {
  const { siteSettings, updateSiteSettings } = useAdmin()
  const [settings, setSettings] = useState<SiteSettings>(siteSettings)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateSiteSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function update(key: keyof SiteSettings, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إعدادات الموقع</h1>
          <p className="text-sm text-muted-foreground">إدارة الإعدادات العامة والتواصل والسيو</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          {saved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "تم الحفظ" : "حفظ الإعدادات"}
        </Button>
      </div>

      <Tabs defaultValue="general" dir="rtl">
        <TabsList className="w-full justify-start bg-card border border-border">
          <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Globe className="h-4 w-4" />
            عام
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Phone className="h-4 w-4" />
            التواصل
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Share2 className="h-4 w-4" />
            التواصل الاجتماعي
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Search className="h-4 w-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        {/* General */}
        <TabsContent value="general" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">الإعدادات العامة</CardTitle>
              <CardDescription className="text-muted-foreground">معلومات المتجر الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">اسم المتجر</Label>
                <Input
                  value={settings.storeName}
                  onChange={(e) => update("storeName", e.target.value)}
                  className="border-border bg-background text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">وصف المتجر</Label>
                <Textarea
                  value={settings.storeDescription}
                  onChange={(e) => update("storeDescription", e.target.value)}
                  rows={3}
                  className="border-border bg-background text-foreground"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">رابط الشعار</Label>
                <Input
                  value={settings.logoUrl}
                  onChange={(e) => update("logoUrl", e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">معلومات التواصل</CardTitle>
              <CardDescription className="text-muted-foreground">أرقام الهاتف والبريد الإلكتروني</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">رقم الواتساب</Label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => update("whatsappNumber", e.target.value)}
                  placeholder="+971501234567"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
                <p className="text-xs text-muted-foreground">أدخل الرقم مع رمز الدولة</p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">رقم الهاتف</Label>
                <Input
                  value={settings.phoneNumber}
                  onChange={(e) => update("phoneNumber", e.target.value)}
                  placeholder="+971501234567"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">البريد الإلكتروني</Label>
                <Input
                  value={settings.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="info@example.com"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social */}
        <TabsContent value="social" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">وسائل التواصل الاجتماعي</CardTitle>
              <CardDescription className="text-muted-foreground">روابط حسابات التواصل الاجتماعي</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Instagram</Label>
                <Input
                  value={settings.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Twitter / X</Label>
                <Input
                  value={settings.twitter}
                  onChange={(e) => update("twitter", e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Facebook</Label>
                <Input
                  value={settings.facebook}
                  onChange={(e) => update("facebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="mt-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base text-foreground">تحسين محركات البحث (SEO)</CardTitle>
              <CardDescription className="text-muted-foreground">إعدادات الـ Meta Tags والكلمات المفتاحية</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">عنوان الصفحة (Meta Title)</Label>
                <Input
                  value={settings.metaTitle}
                  onChange={(e) => update("metaTitle", e.target.value)}
                  className="border-border bg-background text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  {settings.metaTitle.length}/60 حرف
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">الوصف (Meta Description)</Label>
                <Textarea
                  value={settings.metaDescription}
                  onChange={(e) => update("metaDescription", e.target.value)}
                  rows={3}
                  className="border-border bg-background text-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  {settings.metaDescription.length}/160 حرف
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">الكلمات المفتاحية</Label>
                <Textarea
                  value={settings.keywords}
                  onChange={(e) => update("keywords", e.target.value)}
                  rows={2}
                  placeholder="كلمة1, كلمة2, كلمة3"
                  className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">افصل بين الكلمات بفاصلة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
