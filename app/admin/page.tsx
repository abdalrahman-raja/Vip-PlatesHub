"use client"

import { Car, Crown, DollarSign, ShoppingBag, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdmin } from "@/lib/admin-store"
import { emirateNames, formatPrice, type Emirate } from "@/lib/plates-data"

const emirateChartColors: Record<string, string> = {
  dubai: "#ef4444",
  abudhabi: "#3b82f6",
  sharjah: "#22c55e",
  ajman: "#f97316",
  uaq: "#14b8a6",
  rak: "#b45309",
  fujairah: "#d946ef",
}

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

export default function AdminDashboard() {
  const { plates, orders } = useAdmin()

  const totalPlates = plates.length
  const vipPlates = plates.filter((p) => p.category === "vip").length
  const totalValue = plates.reduce((sum, p) => sum + p.price, 0)
  const completedOrders = orders.filter((o) => o.status === "completed").length
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const totalRevenue = orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.total, 0)

  // Chart data: plates count per emirate
  const emirateCounts: Record<string, number> = {}
  plates.forEach((p) => {
    emirateCounts[p.emirate] = (emirateCounts[p.emirate] || 0) + 1
  })
  const chartData = Object.entries(emirateCounts).map(([key, count]) => ({
    name: emirateNames[key as Emirate],
    count,
    emirate: key,
  }))

  const recentOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5)

  const stats = [
    {
      title: "إجمالي اللوحات",
      value: totalPlates.toString(),
      icon: Car,
      desc: `${vipPlates} لوحة VIP`,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "القيمة الإجمالية",
      value: formatPrice(totalValue),
      icon: DollarSign,
      desc: "قيمة جميع اللوحات",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "الطلبات المكتملة",
      value: completedOrders.toString(),
      icon: ShoppingBag,
      desc: `${pendingOrders} طلب قيد الانتظار`,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "الإيرادات",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      desc: "من الطلبات المكتملة",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">نظرة عامة</h1>
        <p className="text-sm text-muted-foreground">ملخص سريع عن حالة المتجر والمبيعات</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </div>
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">اللوحات حسب الإمارة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={emirateChartColors[entry.emirate] || "#d4a017"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button asChild className="h-11 justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/admin/plates">
                <Car className="h-4 w-4" />
                إضافة لوحة جديدة
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 justify-start gap-2 border-border text-foreground hover:bg-accent">
              <Link href="/admin/orders">
                <ShoppingBag className="h-4 w-4" />
                عرض الطلبات
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 justify-start gap-2 border-border text-foreground hover:bg-accent">
              <Link href="/admin/payments">
                <DollarSign className="h-4 w-4" />
                إعدادات الدفع
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 justify-start gap-2 border-border text-foreground hover:bg-accent">
              <Link href="/" target="_blank">
                <Eye className="h-4 w-4" />
                معاينة المتجر
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="border-border bg-card">
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-foreground">أحدث الطلبات</CardTitle>
          <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <Link href="/admin/orders">عرض الكل</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">رقم الطلب</TableHead>
                <TableHead className="text-muted-foreground">العميل</TableHead>
                <TableHead className="text-muted-foreground">اللوحة</TableHead>
                <TableHead className="text-muted-foreground">المبلغ</TableHead>
                <TableHead className="text-muted-foreground">الدفع</TableHead>
                <TableHead className="text-muted-foreground">الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="border-border">
                  <TableCell className="font-medium text-foreground">{order.id}</TableCell>
                  <TableCell className="text-muted-foreground">{order.customerName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.plateCode} {order.plateNumber} - {emirateNames[order.plateEmirate]}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{formatPrice(order.total)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.paymentMethod === "crypto" ? "عملات رقمية" : "بطاقة ائتمانية"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {recentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    لا توجد طلبات بعد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
