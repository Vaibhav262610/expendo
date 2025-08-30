"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, DollarSign, TrendingUp, TrendingDown, User, Calendar, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Payment {
  id: string
  title: string
  description?: string
  amount: number
  type: "income" | "expense" | "owed_to_me" | "i_owe"
  category: string
  person?: string // For owed payments
  status: "pending" | "completed"
  date: string
  createdAt: string
}

const paymentCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Business",
  "Other",
]

const typeColors = {
  income: "bg-green-100 text-green-800 border-green-200",
  expense: "bg-red-100 text-red-800 border-red-200",
  owed_to_me: "bg-blue-100 text-blue-800 border-blue-200",
  i_owe: "bg-orange-100 text-orange-800 border-orange-200",
}

const typeLabels = {
  income: "Income",
  expense: "Expense",
  owed_to_me: "Owed to Me",
  i_owe: "I Owe",
}

export function PaymentManager() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      title: "Freelance Project",
      description: "Website development for client",
      amount: 2500,
      type: "income",
      category: "Business",
      status: "completed",
      date: "2024-01-10",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Dinner Split",
      description: "Restaurant bill with friends",
      amount: 45,
      type: "owed_to_me",
      category: "Food & Dining",
      person: "John Smith",
      status: "pending",
      date: "2024-01-12",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      title: "Grocery Shopping",
      amount: 120,
      type: "expense",
      category: "Food & Dining",
      status: "completed",
      date: "2024-01-11",
      createdAt: "2024-01-11",
    },
    {
      id: "4",
      title: "Concert Tickets",
      description: "Bought tickets for Sarah",
      amount: 80,
      type: "i_owe",
      category: "Entertainment",
      person: "Sarah Johnson",
      status: "pending",
      date: "2024-01-13",
      createdAt: "2024-01-13",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPayment, setNewPayment] = useState({
    title: "",
    description: "",
    amount: "",
    type: "expense" as const,
    category: "Other",
    person: "",
    date: new Date().toISOString().split("T")[0],
  })

  const addPayment = () => {
    if (!newPayment.title.trim() || !newPayment.amount) return

    const payment: Payment = {
      id: Date.now().toString(),
      title: newPayment.title,
      description: newPayment.description,
      amount: Number.parseFloat(newPayment.amount),
      type: newPayment.type,
      category: newPayment.category,
      person: newPayment.person || undefined,
      status: "pending",
      date: newPayment.date,
      createdAt: new Date().toISOString(),
    }

    setPayments([payment, ...payments])
    setNewPayment({
      title: "",
      description: "",
      amount: "",
      type: "expense",
      category: "Other",
      person: "",
      date: new Date().toISOString().split("T")[0],
    })
    setIsAddDialogOpen(false)
  }

  const togglePaymentStatus = (id: string) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: payment.status === "pending" ? "completed" : "pending" } : payment,
      ),
    )
  }

  const deletePayment = (id: string) => {
    setPayments(payments.filter((payment) => payment.id !== id))
  }

  // Calculate totals
  const totalIncome = payments
    .filter((p) => p.type === "income" && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalExpenses = payments
    .filter((p) => p.type === "expense" && p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalOwedToMe = payments
    .filter((p) => p.type === "owed_to_me" && p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalIOwe = payments
    .filter((p) => p.type === "i_owe" && p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0)

  const netBalance = totalIncome - totalExpenses + totalOwedToMe - totalIOwe

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Completed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Money spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Owed to Me</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalOwedToMe.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Pending receipts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">I Owe</CardTitle>
            <User className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalIOwe.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Pending payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Net Balance Card */}
      <Card className={cn("border-2", netBalance >= 0 ? "border-green-200" : "border-red-200")}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className={cn("w-5 h-5", netBalance >= 0 ? "text-green-600" : "text-red-600")} />
            Net Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("text-3xl font-bold", netBalance >= 0 ? "text-green-600" : "text-red-600")}>
            ${Math.abs(netBalance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {netBalance >= 0 ? "You're in the positive!" : "You have a deficit"}
          </p>
        </CardContent>
      </Card>

      {/* Add Payment Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment History</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
              <DialogDescription>Record a new income, expense, or debt.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newPayment.title}
                  onChange={(e) => setNewPayment({ ...newPayment, title: e.target.value })}
                  placeholder="Enter payment title..."
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newPayment.type}
                    onValueChange={(value: any) => setNewPayment({ ...newPayment, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="owed_to_me">Owed to Me</SelectItem>
                      <SelectItem value="i_owe">I Owe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPayment.category}
                    onValueChange={(value) => setNewPayment({ ...newPayment, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {(newPayment.type === "owed_to_me" || newPayment.type === "i_owe") && (
                <div>
                  <Label htmlFor="person">Person</Label>
                  <Input
                    id="person"
                    value={newPayment.person}
                    onChange={(e) => setNewPayment({ ...newPayment, person: e.target.value })}
                    placeholder="Enter person's name..."
                  />
                </div>
              )}
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  placeholder="Enter payment description..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addPayment}>Add Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        {payments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <DollarSign className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">No payments yet</h3>
              <p className="text-sm text-muted-foreground">Add your first payment to get started!</p>
            </CardContent>
          </Card>
        ) : (
          payments.map((payment) => (
            <Card key={payment.id} className="transition-all hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{payment.title}</h3>
                      <Badge variant="outline" className={typeColors[payment.type]}>
                        {typeLabels[payment.type]}
                      </Badge>
                      <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                        {payment.status === "completed" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {payment.status}
                      </Badge>
                    </div>
                    {payment.description && <p className="text-sm text-muted-foreground">{payment.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(payment.date).toLocaleDateString()}
                      </span>
                      <span>{payment.category}</span>
                      {payment.person && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {payment.person}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "text-lg font-bold",
                        payment.type === "income" || payment.type === "owed_to_me" ? "text-green-600" : "text-red-600",
                      )}
                    >
                      {payment.type === "income" || payment.type === "owed_to_me" ? "+" : "-"}$
                      {payment.amount.toFixed(2)}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePaymentStatus(payment.id)}
                        className={cn(payment.status === "completed" ? "text-green-600" : "text-orange-600")}
                      >
                        {payment.status === "completed" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deletePayment(payment.id)}>
                        <DollarSign className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
