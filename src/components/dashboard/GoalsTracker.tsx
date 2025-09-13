import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Plus, Trophy } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
  color: string;
}

interface GoalsTrackerProps {
  goals: Goal[];
  onAddGoal: () => void;
}

export const GoalsTracker = ({ goals, onAddGoal }: GoalsTrackerProps) => {
  return (
    <Card className="p-6 shadow-card border-0 bg-gradient-card backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Savings Goals</h3>
        </div>
        <Button 
          onClick={onAddGoal}
          size="sm"
          className="bg-gradient-primary text-primary-foreground hover:shadow-primary"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No savings goals yet</p>
            <p className="text-sm text-muted-foreground">Set your first goal to start saving!</p>
          </div>
        ) : (
          goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            const isCompleted = percentage >= 100;
            
            return (
              <div key={goal.id} className="space-y-3 p-4 rounded-lg bg-accent/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${goal.color}`} />
                    <h4 className="font-medium text-foreground">{goal.title}</h4>
                    {isCompleted && <Trophy className="h-4 w-4 text-warning" />}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
                
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-3"
                />
                
                <div className="flex justify-between text-sm">
                  <span className="text-foreground font-medium">
                    ${goal.current.toFixed(2)} / ${goal.target.toFixed(2)}
                  </span>
                  <span className={`font-medium ${isCompleted ? 'text-success' : 'text-primary'}`}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                
                {isCompleted && (
                  <div className="text-center text-success text-sm font-medium">
                    🎉 Goal achieved! Congratulations!
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};