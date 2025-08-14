import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EmployeeCardProps {
  id: string;
  name: string;
  skills: string[];
  status?: 'active' | 'available';
  role?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, employeeId: string) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export function EmployeeCard({
  id,
  name,
  skills,
  status = 'available',
  role,
  draggable = false,
  onDragStart,
  onDragEnd
}: EmployeeCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const avatarColors = [
    'bg-primary-500',
    'bg-success-500', 
    'bg-warning-500',
    'bg-error-500',
    'bg-purple-500',
    'bg-blue-500'
  ];
  
  const colorIndex = id.charCodeAt(0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <div 
      className={cn(
        "bg-white p-3 rounded-lg shadow-sm border border-gray-200",
        draggable && "cursor-move hover:shadow-md transition-shadow"
      )}
      draggable={draggable}
      onDragStart={onDragStart ? (e) => onDragStart(e, id) : undefined}
      onDragEnd={onDragEnd}
      data-testid={`employee-card-${id}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", avatarColor)}>
            <span className="text-white text-sm font-medium">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-secondary-700" data-testid={`employee-name-${id}`}>
              {name}
            </p>
            <p className="text-xs text-secondary-500">
              {role || skills.join(', ')}
            </p>
          </div>
        </div>
        
        {status === 'active' && (
          <Badge variant="secondary" className="text-success-600 bg-success-100">
            Active
          </Badge>
        )}
      </div>
      
      {skills.length > 0 && !role && (
        <div className="mt-2 flex flex-wrap gap-1">
          {skills.slice(0, 2).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 2} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
