"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { type Plate, type Emirate, type PlateCategory, emirateNames, categoryNames, emirateImages } from "@/lib/plates-data"

interface PlateFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plate?: Plate | null
  onSubmit: (data: Omit<Plate, "id">) => void
}

export function PlateFormDialog({ open, onOpenChange, plate, onSubmit }: PlateFormDialogProps) {
  const [emirate, setEmirate] = useState<Emirate>("dubai")
  const [code, setCode] = useState("")
  const [number, setNumber] = useState("")
  const [category, setCategory] = useState<PlateCategory>("vip")
  const [price, setPrice] = useState("")
  const [featured, setFeatured] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (plate) {
      setEmirate(plate.emirate)
      setCode(plate.code)
      setNumber(plate.number)
      setCategory(plate.category)
      setPrice(plate.price.toString())
      setFeatured(plate.featured)
    } else {
      setEmirate("dubai")
      setCode("")
      setNumber("")
      setCategory("vip")
      setPrice("")
      setFeatured(false)
    }
    setErrors({})
  }, [plate, open])

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!code.trim()) newErrors.code = "الكود مطلوب"
    if (!number.trim()) newErrors.number = "الرقم مطلوب"
    if (!price || Number(price) <= 0) newErrors.price = "أدخل سعراً صحيحاً"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    onSubmit({
      emirate,
      code: code.trim(),
      number: number.trim(),
      category,
      price: Number(price),
      image: emirateImages[emirate],
      featured,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {plate ? "تعديل اللوحة" : "إضافة لوحة جديدة"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {plate ? "قم بتعديل بيانات اللوحة" : "أدخل بيانات اللوحة الجديدة"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          {/* Emirate */}
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">الإمارة</Label>
            <Select value={emirate} onValueChange={(v) => setEmirate(v as Emirate)}>
              <SelectTrigger className="border-border bg-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                {Object.entries(emirateNames).map(([key, name]) => (
                  <SelectItem key={key} value={key} className="text-foreground">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Code & Number */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">الكود</Label>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثال: A"
                className="border-border bg-background text-foreground"
              />
              {errors.code && <p className="text-xs text-red-400">{errors.code}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">الرقم</Label>
              <Input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="مثال: 7777"
                className="border-border bg-background text-foreground"
              />
              {errors.number && <p className="text-xs text-red-400">{errors.number}</p>}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">الفئة</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as PlateCategory)}>
              <SelectTrigger className="border-border bg-background text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card">
                {Object.entries(categoryNames).map(([key, name]) => (
                  <SelectItem key={key} value={key} className="text-foreground">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">السعر (درهم)</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="مثال: 1500000"
              className="border-border bg-background text-foreground"
              min={0}
            />
            {errors.price && <p className="text-xs text-red-400">{errors.price}</p>}
          </div>

          {/* Featured */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="flex flex-col gap-0.5">
              <Label className="text-foreground">لوحة مميزة</Label>
              <p className="text-xs text-muted-foreground">عرض اللوحة في قسم المميز على الصفحة الرئيسية</p>
            </div>
            <Switch checked={featured} onCheckedChange={setFeatured} />
          </div>

          {/* Plate Preview */}
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">معاينة اللوحة</p>
            <div className="flex items-center justify-center rounded-md border border-border bg-card p-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">{emirateNames[emirate]}</p>
                <p className="mt-1 text-3xl font-bold tracking-wider text-foreground">
                  {code || "---"} {number || "----"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border text-foreground">
            إلغاء
          </Button>
          <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {plate ? "حفظ التعديلات" : "إضافة اللوحة"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
