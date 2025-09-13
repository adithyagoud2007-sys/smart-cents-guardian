import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Target } from "lucide-react";

interface BudgetItem {
  category: string;
  spent: number;
  budget: number;
  color: string;
}

interface BudgetProgressProps {
  budgets: BudgetItem[];
}

export const BudgetProgress = ({ budgets }: BudgetProgressProps) => {
  return (
    <Card className="p-6 shadow-card border-0 bg-gradient-card backdrop-blur-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Budget Overview</h3>
      </div>
      
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budget) * 100;
          const isOverBudget = percentage > 100;
          const isNearLimit = percentage > 80 && percentage <= 100;
          
          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${budget.color}`} />
                  <span className="text-sm font-medium text-foreground">{budget.category}</span>
                  {isOverBudget && <AlertTriangle className="h-4 w-4 text-destructive" />}
                  {!isOverBudget && !isNearLimit && <CheckCircle className="h-4 w-4 text-success" />}
                </div>
                <span className="text-sm text-muted-foreground">
                  ${budget.spent.toFixed(2)} / ${budget.budget.toFixed(2)}
                </span>
              </div>
              
              <Progress 
                value={Math.min(percentage, 100)} 
                className="h-2"
                style={{
                  background: isOverBudget ? 'hsl(var(--destructive-light))' : 
                             isNearLimit ? 'hsl(var(--warning-light))' : 
                             'hsl(var(--success-light))'
                }}
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span>${(budget.budget - budget.spent).toFixed(2)} remaining</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};