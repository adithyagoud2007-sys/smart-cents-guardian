import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Receipt } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { value: "food", label: "Food & Dining", color: "bg-orange-500" },
  { value: "transport", label: "Transportation", color: "bg-blue-500" },
  { value: "entertainment", label: "Entertainment", color: "bg-purple-500" },
  { value: "education", label: "Education", color: "bg-green-500" },
  { value: "shopping", label: "Shopping", color: "bg-pink-500" },
  { value: "health", label: "Health & Fitness", color: "bg-red-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
];

interface ExpenseFormProps {
  onExpenseAdd: (expense: { amount: number; category: string; description: string; date: string }) => void;
}

export const ExpenseForm = ({ onExpenseAdd }: ExpenseFormProps) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const expense = {
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    };

    onExpenseAdd(expense);
    
    // Reset form
    setAmount("");
    setCategory("");
    setDescription("");
    
    toast.success("Expense added successfully!");
  };

  return (
    <Card className="p-6 shadow-card border-0 bg-gradient-card backdrop-blur-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Receipt className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Add Expense</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium text-foreground">Amount</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border-border/50 focus:ring-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium text-foreground">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-border/50 focus:ring-primary">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                    <span>{cat.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">Description</Label>
          <Input
            id="description"
            placeholder="What did you spend on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-border/50 focus:ring-primary"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-primary text-primary-foreground hover:shadow-primary transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </form>
    </Card>
  );
};