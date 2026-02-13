"use client"

import { useState } from "react"
import {
  Save,
  Globe,
  Phone,
  Share2,
  Search,
  CheckCircle2,
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
