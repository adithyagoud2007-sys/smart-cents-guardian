import { useState } from "react";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { ExpenseForm } from "@/components/dashboard/ExpenseForm";
import { BudgetProgress } from "@/components/dashboard/BudgetProgress";
import { GoalsTracker } from "@/components/dashboard/GoalsTracker";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Wallet, PiggyBank, Receipt, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const initialBudgets = [
  { category: "Food & Dining", spent: 450, budget: 500, color: "bg-orange-500" },
  { category: "Transportation", spent: 280, budget: 300, color: "bg-blue-500" },
  { category: "Entertainment", spent: 180, budget: 200, color: "bg-purple-500" },
  { category: "Education", spent: 320, budget: 400, color: "bg-green-500" },
  { category: "Shopping", spent: 240, budget: 250, color: "bg-pink-500" },
];

const initialGoals = [
  {
    id: "1",
    title: "Emergency Fund",
    current: 1250,
    target: 2000,
    deadline: "2024-12-31",
    color: "bg-success",
  },
  {
    id: "2", 
    title: "New Laptop",
    current: 800,
    target: 1200,
    deadline: "2024-10-15",
    color: "bg-primary",
  },
];

export const Dashboard = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [goals, setGoals] = useState(initialGoals);

  const handleExpenseAdd = (expense: any) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
    
    // Update budget spending
    setBudgets(prev => prev.map(budget => {
      if (budget.category.toLowerCase().includes(expense.category)) {
        return { ...budget, spent: budget.spent + expense.amount };
      }
      return budget;
    }));

    // Check for budget alerts
    const updatedBudget = budgets.find(b => 
      b.category.toLowerCase().includes(expense.category)
    );
    if (updatedBudget && (updatedBudget.spent + expense.amount) > updatedBudget.budget) {
      toast.error(`Budget exceeded for ${updatedBudget.category}!`, {
        description: `You've spent $${(updatedBudget.spent + expense.amount).toFixed(2)} of $${updatedBudget.budget} budget.`
      });
    }
  };

  const handleAddGoal = () => {
    toast.info("Goal creation feature coming soon!");
  };

  const totalBalance = 2450.50;
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0) + 1590; // Base spending
  const monthlyBudget = budgets.reduce((sum, b) => sum + b.budget, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">FinanceTracker</h1>
                <p className="text-sm text-muted-foreground">Smart money management for students</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-border/50">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm" className="border-border/50">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BalanceCard
            title="Available Balance"
            amount={totalBalance}
            change={5.2}
            isPositive={true}
          />
          <BalanceCard
            title="Monthly Spending"
            amount={totalSpent}
            change={-2.1}
            isPositive={false}
          />
          <BalanceCard
            title="Savings Rate"
            amount={(totalBalance - totalSpent) / totalBalance * 100}
            change={8.5}
            isPositive={true}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ExpenseForm onExpenseAdd={handleExpenseAdd} />
            <BudgetProgress budgets={budgets} />
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
        </div>

        {/* Goals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <GoalsTracker goals={goals} onAddGoal={handleAddGoal} />
          </div>
          
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-card backdrop-blur-sm rounded-lg border-0 shadow-card p-6">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-success-light border border-success/20">
                  <h4 className="font-medium text-success mb-2">💡 Smart Tip</h4>
                  <p className="text-sm text-success-foreground">
                    You're spending 15% less on dining this month. Keep it up! Consider moving this extra $75 to your emergency fund.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-warning-light border border-warning/20">
                  <h4 className="font-medium text-warning mb-2">⚠️ Budget Alert</h4>
                  <p className="text-sm text-warning-foreground">
                    You're approaching your shopping budget limit. Only $10 remaining for this month.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">🎯 Goal Progress</h4>
                  <p className="text-sm text-foreground">
                    At your current saving rate, you'll reach your laptop goal 2 weeks early!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};