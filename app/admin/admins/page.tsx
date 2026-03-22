"use client"

import { useState } from "react"
import {
  UserPlus,
  Trash2,
  Pencil,
  Shield,
  ShieldCheck,
  Eye,
  EyeOff,
  X,
  Check,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useAdmin, type AdminUser } from "@/lib/admin-store"

interface AdminForm {
  name: string
  username: string
  password: string
  confirmPassword: string
}

const emptyForm: AdminForm = { name: "", username: "", password: "", confirmPassword: "" }

export default function AdminsPage() {
  const { admins, addAdmin, updateAdmin, deleteAdmin, currentAdmin } = useAdmin()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [form, setForm] = useState<AdminForm>(emptyForm)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  function updateForm(key: keyof AdminForm, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError("")
  }

  function validateForm() {
    if (!form.name.trim()) return "يرجى إدخال الاسم الكامل"
    if (!form.username.trim()) return "يرجى إدخال اسم المستخدم"
    if (form.username.includes(" ")) return "اسم المستخدم لا يجب أن يحتوي على مسافات"
    if (!editingAdmin && !form.password) return "يرجى إدخال كلمة المرور"
    if (form.password && form.password.length < 6) return "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    if (form.password && form.password !== form.confirmPassword) return "كلمتا المرور غير متطابقتان"

    // Check unique username
    const duplicate = admins.find(
      (a) => a.username === form.username.trim() && a.id !== editingAdmin?.id
    )
    if (duplicate) return "اسم المستخدم مستخدم بالفعل"

    return null
  }

  function handleAdd() {
    const err = validateForm()
    if (err) { setError(err); return }

    addAdmin({
      name: form.name.trim(),
      username: form.username.trim().toLowerCase(),
      password: form.password,
    })

    setShowAddDialog(false)
    setForm(emptyForm)
    setShowPassword(false)
    setSuccess("تم إضافة المشرف بنجاح")
    setTimeout(() => setSuccess(""), 3000)
  }

  function handleEdit(admin: AdminUser) {
    setEditingAdmin(admin)
    setForm({ name: admin.name, username: admin.username, password: "", confirmPassword: "" })
    setError("")
    setShowPassword(false)
  }

  function handleSaveEdit() {
    if (!editingAdmin) return
    const err = validateForm()
    if (err) { setError(err); return }

    const updates: Partial<Omit<AdminUser, "id" | "createdAt">> = {
      name: form.name.trim(),
      username: form.username.trim().toLowerCase(),
    }
    if (form.password) updates.password = form.password

    updateAdmin(editingAdmin.id, updates)
    setEditingAdmin(null)
    setForm(emptyForm)
    setSuccess("تم تحديث بيانات المشرف بنجاح")
    setTimeout(() => setSuccess(""), 3000)
  }

  function handleDelete(id: string) {
    if (admins.length === 1) {
      setError("لا يمكن حذف آخر مشرف في النظام")
      return
    }
    deleteAdmin(id)
    setDeleteConfirm(null)
    setSuccess("تم حذف المشرف بنجاح")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة المشرفين</h1>
          <p className="text-sm text-muted-foreground">
            إضافة وتعديل وحذف حسابات المشرفين
          </p>
        </div>
        <Button
          onClick={() => { setShowAddDialog(true); setForm(emptyForm); setError("") }}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <UserPlus className="h-4 w-4" />
          إضافة مشرف جديد
        </Button>
      </div>

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-500">
          <Check className="h-4 w-4 shrink-0" />
          {success}
        </div>
      )}

      {/* Global error */}
      {error && !editingAdmin && !showAddDialog && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Admins list */}
      <div className="flex flex-col gap-3">
        {admins.map((admin) => {
          const isCurrent = admin.id === currentAdmin?.id
          const isEditing = editingAdmin?.id === admin.id

          return (
            <Card key={admin.id} className={`border-border bg-card ${isCurrent ? "border-primary/40" : ""}`}>
              <CardContent className="p-4">
                {isEditing ? (
                  /* Edit inline form */
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">تعديل بيانات المشرف</p>
                      <button onClick={() => { setEditingAdmin(null); setError("") }} className="text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm text-muted-foreground">الاسم الكامل</Label>
                        <Input
                          value={form.name}
                          onChange={(e) => updateForm("name", e.target.value)}
                          className="border-border bg-background text-foreground"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm text-muted-foreground">اسم المستخدم</Label>
                        <Input
                          value={form.username}
                          onChange={(e) => updateForm("username", e.target.value)}
                          className="border-border bg-background text-foreground"
                          dir="ltr"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm text-muted-foreground">كلمة مرور جديدة (اختياري)</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={(e) => updateForm("password", e.target.value)}
                            placeholder="اتركه فارغاً للإبقاء على القديمة"
                            className="border-border bg-background pe-10 text-foreground placeholder:text-muted-foreground"
                            dir="ltr"
                          />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm text-muted-foreground">تأكيد كلمة المرور</Label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={(e) => updateForm("confirmPassword", e.target.value)}
                          placeholder="أعد إدخال كلمة المرور"
                          className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => { setEditingAdmin(null); setError("") }}>
                        إلغاء
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit} className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Check className="h-3.5 w-3.5" />
                        حفظ التعديلات
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Display row */
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isCurrent ? "bg-primary/20" : "bg-secondary"}`}>
                        {isCurrent ? (
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{admin.name}</p>
                          {isCurrent && (
                            <Badge className="bg-primary/20 text-primary text-xs">أنت</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground" dir="ltr">@{admin.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="hidden text-xs text-muted-foreground sm:block">
                        {new Date(admin.createdAt).toLocaleDateString("ar-AE")}
                      </p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEdit(admin)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {!isCurrent && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteConfirm(admin.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add Admin Dialog */}
      <Dialog open={showAddDialog} onOpenChange={(open) => { setShowAddDialog(open); setError("") }}>
        <DialogContent className="border-border bg-card sm:max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-foreground">إضافة مشرف جديد</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">الاسم الكامل</Label>
              <Input
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="مثال: محمد علي"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">اسم المستخدم</Label>
              <Input
                value={form.username}
                onChange={(e) => updateForm("username", e.target.value)}
                placeholder="مثال: moderator1"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                dir="ltr"
              />
              <p className="text-xs text-muted-foreground">يُستخدم لتسجيل الدخول، بدون مسافات</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">كلمة المرور</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateForm("password", e.target.value)}
                  placeholder="6 أحرف على الأقل"
                  className="border-border bg-background pe-10 text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">تأكيد كلمة المرور</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
                placeholder="أعد إدخال كلمة المرور"
                className="border-border bg-background text-foreground placeholder:text-muted-foreground"
                dir="ltr"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => { setShowAddDialog(false); setError("") }}>
              إلغاء
            </Button>
            <Button onClick={handleAdd} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <UserPlus className="h-4 w-4" />
              إضافة المشرف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="border-border bg-card sm:max-w-sm" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-foreground">تأكيد الحذف</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            هل أنت متأكد من حذف هذا المشرف؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>إلغاء</Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
