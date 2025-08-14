import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";
import { useGenerateSchedule } from "@/hooks/use-shift-assignments";

interface ScheduleOptimizerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleOptimizerModal({ open, onOpenChange }: ScheduleOptimizerModalProps) {
  const [goals, setGoals] = useState({
    efficiency: true,
    balance: true,
    overtime: false
  });
  const [timeRange, setTimeRange] = useState("7");
  const [shiftType, setShiftType] = useState("all");
  
  const generateSchedule = useGenerateSchedule();

  const handleGenerateSchedule = () => {
    generateSchedule.mutate({
      goals,
      timeRange: parseInt(timeRange),
      shiftType
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" aria-describedby="schedule-optimizer-description">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary-500" />
            <span>AI Schedule Optimizer</span>
          </DialogTitle>
          <p id="schedule-optimizer-description" className="text-sm text-secondary-600">
            Configure optimization parameters to generate an AI-powered shift schedule
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Optimization Goals
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="efficiency"
                  checked={goals.efficiency}
                  onCheckedChange={(checked) => 
                    setGoals(prev => ({ ...prev, efficiency: !!checked }))
                  }
                  data-testid="checkbox-efficiency"
                />
                <label htmlFor="efficiency" className="text-sm text-secondary-600">
                  Maximize Production Efficiency
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="balance"
                  checked={goals.balance}
                  onCheckedChange={(checked) => 
                    setGoals(prev => ({ ...prev, balance: !!checked }))
                  }
                  data-testid="checkbox-balance"
                />
                <label htmlFor="balance" className="text-sm text-secondary-600">
                  Balance Workload Distribution
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="overtime"
                  checked={goals.overtime}
                  onCheckedChange={(checked) => 
                    setGoals(prev => ({ ...prev, overtime: !!checked }))
                  }
                  data-testid="checkbox-overtime"
                />
                <label htmlFor="overtime" className="text-sm text-secondary-600">
                  Minimize Overtime Costs
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Time Range
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger data-testid="select-time-range">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Next 7 days</SelectItem>
                  <SelectItem value="14">Next 14 days</SelectItem>
                  <SelectItem value="30">Next 30 days</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={shiftType} onValueChange={setShiftType}>
                <SelectTrigger data-testid="select-shift-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="day">Day Shift Only</SelectItem>
                  <SelectItem value="night">Night Shift Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-primary-700">AI Recommendations Ready</h4>
                  <p className="text-sm text-primary-600">
                    Based on historical data and current capacity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateSchedule}
            disabled={generateSchedule.isPending}
            data-testid="button-generate"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {generateSchedule.isPending ? "Generating..." : "Generate Schedule"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
