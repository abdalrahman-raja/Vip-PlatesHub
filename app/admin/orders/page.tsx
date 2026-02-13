"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useAdmin, type Order } from "@/lib/admin-store"
import { emirateNames, formatPrice } from "@/lib/plates-data"

const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  completed: "مكتمل",
  cancelled: "ملغي",
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) => {
        const matchSearch =
          !search ||
          o.id.toLowerCase().includes(search.toLowerCase()) ||
          o.customerName.includes(search) ||
          o.customerEmail.toLowerCase().includes(search.toLowerCase())
        const matchStatus = filterStatus === "all" || o.status === filterStatus
        return matchSearch && matchStatus
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [orders, search, filterStatus])

  const totalRevenue = orders.filter((o) => o.status === "completed").reduce((s, o) => s + o.total, 0)
  const pendingCount = orders.filter((o) => o.status === "pending").length

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("ar-AE", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">الطلبات</h1>
        <p className="text-sm text-muted-foreground">
          {orders.length} طلب إجمالاً - {pendingCount} قيد الانتظار - الإيرادات: {formatPrice(totalRevenue)}
        </p>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث برقم الطلب أو اسم العميل أو البريد..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border bg-background pe-4 ps-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full border-border bg-background text-foreground sm:w-44">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="all" className="text-foreground">جميع الحالات</SelectItem>
              <SelectItem value="pending" className="text-foreground">قيد الانتظار</SelectItem>
              <SelectItem value="completed" className="text-foreground">مكتمل</SelectItem>
              <SelectItem value="cancelled" className="text-foreground">ملغي</SelectItem>
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
                  <TableHead className="text-muted-foreground">رقم الطلب</TableHead>
                  <TableHead className="text-muted-foreground">العميل</TableHead>
                  <TableHead className="text-muted-foreground">اللوحة</TableHead>
                  <TableHead className="text-muted-foreground">المبلغ</TableHead>
                  <TableHead className="text-muted-foreground">طريقة الدفع</TableHead>
                  <TableHead className="text-muted-foreground">التاريخ</TableHead>
                  <TableHead className="text-muted-foreground">الحالة</TableHead>
                  <TableHead className="text-muted-foreground">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="cursor-pointer border-border hover:bg-accent/50" onClick={() => setSelectedOrder(order)}>
                    <TableCell className="font-mono text-sm font-medium text-foreground">{order.id}</TableCell>
                    <TableCell className="text-foreground">{order.customerName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.plateCode} {order.plateNumber} - {emirateNames[order.plateEmirate]}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{formatPrice(order.total)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.paymentMethod === "crypto" ? "عملات رقمية" : "بطاقة ائتمانية"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(v) => updateOrderStatus(order.id, v as Order["status"])}
                      >
                        <SelectTrigger className="h-8 w-28 border-border bg-background text-xs text-foreground" onClick={(e) => e.stopPropagation()}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-border bg-card">
                          <SelectItem value="pending" className="text-foreground">قيد الانتظار</SelectItem>
                          <SelectItem value="completed" className="text-foreground">مكتمل</SelectItem>
                          <SelectItem value="cancelled" className="text-foreground">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                      لا توجد طلبات مطابقة
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="border-border bg-card sm:max-w-lg">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground">تفاصيل الطلب {selectedOrder.id}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {formatDate(selectedOrder.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">العميل</p>
                    <p className="text-sm font-medium text-foreground">{selectedOrder.customerName}</p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                    <p className="text-sm font-medium text-foreground" dir="ltr">{selectedOrder.customerEmail}</p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">الهاتف</p>
                    <p className="text-sm font-medium text-foreground" dir="ltr">{selectedOrder.customerPhone}</p>
                  </div>
                  <div className="flex flex-col gap-1 rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground">طريقة الدفع</p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedOrder.paymentMethod === "crypto" ? "عملات رقمية" : "بطاقة ائتمانية"}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="mb-2 text-xs text-muted-foreground">اللوحة</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {selectedOrder.plateCode} {selectedOrder.plateNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">{emirateNames[selectedOrder.plateEmirate]}</p>
                    </div>
                    <p className="text-lg font-bold text-primary">{formatPrice(selectedOrder.total)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <Badge variant="outline" className={statusColors[selectedOrder.status]}>
                    {statusLabels[selectedOrder.status]}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
