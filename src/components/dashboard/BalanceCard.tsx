import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface BalanceCardProps {
  title: string;
  amount: number;
  change: number;
  isPositive: boolean;
  className?: string;
}

export const BalanceCard = ({ title, amount, change, isPositive, className }: BalanceCardProps) => {
  return (
    <Card className={`p-6 shadow-card hover:shadow-primary transition-all duration-300 border-0 bg-gradient-card backdrop-blur-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-3xl font-bold text-foreground">{amount.toFixed(2)}</span>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
          isPositive ? 'bg-success-light text-success' : 'bg-destructive-light text-destructive'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
    </Card>
  );
};