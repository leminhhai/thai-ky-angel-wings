
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
    queryKey: ['milestones', currentWeek],
    queryFn: async () => {
      // Fetch milestones up to the current week plus next 4 weeks
      const { data, error } = await supabase
        .from('pregnancy_milestones')
        .select('*')
        .lte('week_number', currentWeek + 4)
        .order('week_number', { ascending: true });
      
      if (error) throw error;
      return data as Milestone[];
    }
  });

  if (!milestones) return null;

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => {
        const isPast = milestone.week_number < currentWeek;
        const isCurrent = milestone.week_number === currentWeek;
        const isUpcoming = milestone.week_number > currentWeek;

        return (
          <Card 
            key={milestone.id}
            className={`p-4 ${
              isCurrent ? 'border-[#fd7e14] border-2' : 
              isPast ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-full ${
                milestone.milestone_type === 'CHECKUP' ? 'bg-[#ffc107]/20' : 'bg-[#6c757d]/20'
              }`}>
                {milestone.milestone_type === 'CHECKUP' ? 
                  <CalendarClock className={`w-6 h-6 ${isPast ? 'text-[#6c757d]' : 'text-[#ffc107]'}`} /> : 
                  <CheckCircle className={`w-6 h-6 ${isPast ? 'text-[#6c757d]' : 'text-[#fd7e14]'}`} />
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-medium ${
                    isCurrent ? 'text-[#fd7e14]' : 
                    isPast ? 'text-[#6c757d]' : 
                    'text-[#ffc107]'
                  }`}>
                    Tuần {milestone.week_number}
                  </h3>
                  <Badge 
                    variant={milestone.importance === 'high' ? 'destructive' : 'secondary'}
                    className={milestone.importance === 'high' ? 'bg-[#fd7e14] text-white' : ''}
                  >
                    {milestone.importance === 'high' ? 'Quan trọng' : 'Thông tin'}
                  </Badge>
                </div>
                <h4 className="font-semibold mb-2 text-[#6c757d]">{milestone.title}</h4>
                <p className="text-sm text-[#6c757d]">{milestone.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default MilestoneList;
