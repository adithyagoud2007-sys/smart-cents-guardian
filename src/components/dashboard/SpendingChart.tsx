import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

const spendingData = [
  { month: 'Jan', amount: 850 },
  { month: 'Feb', amount: 920 },
  { month: 'Mar', amount: 750 },
  { month: 'Apr', amount: 880 },
  { month: 'May', amount: 1020 },
  { month: 'Jun', amount: 940 },
];

const categoryData = [
  { name: 'Food & Dining', value: 450, color: '#F97316' },
  { name: 'Transportation', value: 280, color: '#3B82F6' },
  { name: 'Entertainment', value: 180, color: '#8B5CF6' },
  { name: 'Education', value: 320, color: '#10B981' },
  { name: 'Shopping', value: 240, color: '#EC4899' },
  { name: 'Other', value: 120, color: '#6B7280' },
];

export const SpendingChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Spending Trend */}
      <Card className="p-6 shadow-card border-0 bg-gradient-card backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Spending Trend</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary-glow))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-6 shadow-card border-0 bg-gradient-card backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-5 h-5 bg-gradient-primary rounded-full" />
          <h3 className="text-lg font-semibold text-foreground">Category Breakdown</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};