import { BarChart3, CheckSquare, DollarSign } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { UnifiedDashboard } from "./UnifiedDashboard"
import { PaymentManager } from "./PaymentManager"
import { TodoManager } from "./TodoManager"

export function Analytics() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
            <Tabs defaultValue="dashboard" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dashboard" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="todos" className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Payments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <UnifiedDashboard />
              </TabsContent>

              <TabsContent value="todos">
                <TodoManager />
              </TabsContent>

              <TabsContent value="payments">
                <PaymentManager />
              </TabsContent>
            </Tabs>
          </main>
  )
}
