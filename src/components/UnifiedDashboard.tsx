"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, DollarSign, TrendingUp, TrendingDown, Clock, Flag, Calendar, Target, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data - in a real app, this would come from your state management
const mockStats = {
  todos: {
    total: 12,
    completed: 8,
    pending: 4,
    highPriority: 2,
    dueToday: 1,
  },
  payments: {
    totalIncome: 2500,
    totalExpenses: 1200,
    owedToMe: 125,
    iOwe: 80,
    netBalance: 1345,
    pendingPayments: 3,
  },
}

const recentActivity = [
  {
    id: "1",
    type: "todo",
    action: "completed",
    title: "Review team feedback",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    id: "2",
    type: "payment",
    action: "added",
    title: "Freelance payment received",
    amount: 500,
    time: "4 hours ago",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    id: "3",
    type: "todo",
    action: "created",
    title: "Complete project proposal",
    time: "1 day ago",
    icon: Flag,
    color: "text-red-600",
  },
  {
    id: "4",
    type: "payment",
    action: "pending",
    title: "Dinner split with John",
    amount: 45,
    time: "2 days ago",
    icon: Clock,
    color: "text-orange-600",
  },
]

export function UnifiedDashboard() {
  const todoCompletionRate = Math.round((mockStats.todos.completed / mockStats.todos.total) * 100)
  const financialHealth = mockStats.payments.netBalance > 0 ? "Positive" : "Negative"

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Productivity Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Task Completion</span>
              <span className="text-sm text-muted-foreground">{todoCompletionRate}%</span>
            </div>
            <Progress value={todoCompletionRate} className="h-2" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{mockStats.todos.completed}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{mockStats.todos.pending}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{mockStats.todos.highPriority}</div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Net Balance</span>
              <Badge variant={financialHealth === "Positive" ? "default" : "destructive"}>{financialHealth}</Badge>
            </div>
            <div className="text-3xl font-bold text-primary">${mockStats.payments.netBalance.toFixed(2)}</div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">+${mockStats.payments.totalIncome}</div>
                <div className="text-xs text-muted-foreground">Income</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">-${mockStats.payments.totalExpenses}</div>
                <div className="text-xs text-muted-foreground">Expenses</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.todos.dueToday}</div>
            <p className="text-xs text-muted-foreground">Tasks need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.payments.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Owed</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${mockStats.payments.owedToMe}</div>
            <p className="text-xs text-muted-foreground">To be received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">I Owe</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${mockStats.payments.iOwe}</div>
            <p className="text-xs text-muted-foreground">To be paid</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className={cn("p-2 rounded-full bg-background", activity.color)}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{activity.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    {activity.amount && (
                      <span className={cn("text-sm font-medium", activity.color)}>${activity.amount}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today&apos;s Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <span className="font-medium">High Priority Tasks</span>
              </div>
              <Badge variant="destructive">{mockStats.todos.highPriority}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Due Today</span>
              </div>
              <Badge variant="outline" className="border-orange-200 text-orange-800">
                {mockStats.todos.dueToday}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Collect Payments</span>
              </div>
              <Badge variant="outline" className="border-blue-200 text-blue-800">
                ${mockStats.payments.owedToMe}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Pay Debts</span>
              </div>
              <Badge variant="outline" className="border-orange-200 text-orange-800">
                ${mockStats.payments.iOwe}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
