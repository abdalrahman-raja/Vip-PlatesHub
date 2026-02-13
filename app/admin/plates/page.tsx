"use client"

import { useState, useMemo } from "react"
import { Plus, Search, Pencil, Trash2, Star, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAdmin } from "@/lib/admin-store"
import { PlateFormDialog } from "@/components/admin/plate-form-dialog"
import {
  type Plate,
  type Emirate,
  type PlateCategory,
  emirateNames,
  categoryNames,
  formatPrice,
} from "@/lib/plates-data"

const categoryColors: Record<PlateCategory, string> = {
  vip: "bg-primary/10 text-primary border-primary/20",
  special: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  regular: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
}

export default function PlatesManagement() {
  const { plates, addPlate, updatePlate, deletePlate, toggleFeatured } = useAdmin()
  const [search, setSearch] = useState("")
  const [filterEmirate, setFilterEmirate] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [formOpen, setFormOpen] = useState(false)
  const [editingPlate, setEditingPlate] = useState<Plate | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredPlates = useMemo(() => {
    return plates.filter((p) => {
      const matchSearch =
        !search ||
        p.number.includes(search) ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        emirateNames[p.emirate].includes(search)
      const matchEmirate = filterEmirate === "all" || p.emirate === filterEmirate
      const matchCategory = filterCategory === "all" || p.category === filterCategory
      return matchSearch && matchEmirate && matchCategory
    })
  }, [plates, search, filterEmirate, filterCategory])

  function handleAdd() {
    setEditingPlate(null)
    setFormOpen(true)
  }

  function handleEdit(plate: Plate) {
    setEditingPlate(plate)
    setFormOpen(true)
  }

  function handleFormSubmit(data: Omit<Plate, "id">) {
    if (editingPlate) {
      updatePlate(editingPlate.id, data)
    } else {
      addPlate(data)
    }
  }

  function handleConfirmDelete() {
    if (deleteId) {
      deletePlate(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة اللوحات</h1>
          <p className="text-sm text-muted-foreground">
            {plates.length} لوحة إجمالاً - {filteredPlates.length} معروضة
          </p>
        </div>
        <Button onClick={handleAdd} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          إضافة لوحة
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث بالرقم أو الكود أو الإمارة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-background pe-4 ps-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select value={filterEmirate} onValueChange={setFilterEmirate}>
            <SelectTrigger className="w-full border-border bg-background text-foreground sm:w-44">
              <SelectValue placeholder="الإمارة" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="all" className="text-foreground">جميع الإمارات</SelectItem>
              {Object.entries(emirateNames).map(([key, name]) => (
                <SelectItem key={key} value={key} className="text-foreground">{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full border-border bg-background text-foreground sm:w-40">
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="all" className="text-foreground">جميع الفئات</SelectItem>
              {Object.entries(categoryNames).map(([key, name]) => (
                <SelectItem key={key} value={key} className="text-foreground">{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">اللوحة</TableHead>
                  <TableHead className="text-muted-foreground">الإمارة</TableHead>
                  <TableHead className="text-muted-foreground">الكود</TableHead>
                  <TableHead className="text-muted-foreground">الرقم</TableHead>
                  <TableHead className="text-muted-foreground">الفئة</TableHead>
                  <TableHead className="text-muted-foreground">السعر</TableHead>
                  <TableHead className="text-muted-foreground">مميزة</TableHead>
                  <TableHead className="text-muted-foreground">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlates.map((plate) => (
                  <TableRow key={plate.id} className="border-border">
                    <TableCell>
                      <div className="flex h-10 w-20 items-center justify-center rounded border border-border bg-background text-xs font-bold text-foreground">
                        {plate.code} {plate.number}
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{emirateNames[plate.emirate]}</TableCell>
                    <TableCell className="font-mono text-foreground">{plate.code}</TableCell>
                    <TableCell className="font-mono text-foreground">{plate.number}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={categoryColors[plate.category]}>
                        {categoryNames[plate.category]}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{formatPrice(plate.price)}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleFeatured(plate.id)}
                        className="text-muted-foreground transition-colors hover:text-primary"
                        title={plate.featured ? "إزالة من المميز" : "إضافة للمميز"}
                      >
                        {plate.featured ? (
                          <Star className="h-5 w-5 fill-primary text-primary" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(plate)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">تعديل</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(plate.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">حذف</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPlates.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                      لا توجد لوحات مطابقة للبحث
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <PlateFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        plate={editingPlate}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">حذف اللوحة</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              هل أنت متأكد من حذف هذه اللوحة؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-border text-foreground">إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-700">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
