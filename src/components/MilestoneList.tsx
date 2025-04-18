
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CheckCircle } from "lucide-react";

type Milestone = {
  id: string;
  week_number: number;
  title: string;
  description: string;
  milestone_type: 'CHECKUP' | 'ADVICE';
  importance: 'high' | 'normal' | 'low';
};

const MilestoneList = ({ currentWeek }: { currentWeek: number }) => {
  const { data: milestones } = useQuery({
    queryKey: ['milestones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pregnancy_milestones')
        .select('*')
        .order('week_number', { ascending: true });
      
      if (error) throw error;
      return data as Milestone[];
    }
  });

  if (!milestones) return null;

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <Card 
          key={milestone.id}
          className={`p-4 ${milestone.week_number === currentWeek ? 'border-baby-pink border-2' : ''}`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${
              milestone.milestone_type === 'CHECKUP' ? 'bg-baby-pink/20' : 'bg-baby-blue/20'
            }`}>
              {milestone.milestone_type === 'CHECKUP' ? 
                <CalendarClock className="w-6 h-6 text-baby-pink" /> : 
                <CheckCircle className="w-6 h-6 text-baby-blue" />
              }
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">Tuần {milestone.week_number}</h3>
                <Badge variant={milestone.importance === 'high' ? 'destructive' : 'secondary'}>
                  {milestone.importance === 'high' ? 'Quan trọng' : 'Thông tin'}
                </Badge>
              </div>
              <h4 className="font-semibold mb-2">{milestone.title}</h4>
              <p className="text-muted-foreground text-sm">{milestone.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MilestoneList;
