import { getIconComponent } from '@/lib/icon-mapping';
import type { ProcessedContactMethod } from '@/types';
import { GlassCard, CardContent } from '@/ui';

interface ContactMethodCardProps {
  method: ProcessedContactMethod;
}

export const ContactMethodCard = ({ method }: ContactMethodCardProps) => {
  return (
    <a href={method.href} target="_blank" rel="noopener noreferrer" className="group block">
      <GlassCard className="border-surface-border transition-all duration-200 hover:bg-surface-hover">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-surface p-3 text-muted-foreground transition-all duration-200 group-hover:scale-110 group-hover:text-primary">
              {getIconComponent(method.icon)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                {method.title}
              </h4>
              <p className="mb-1 text-sm text-muted-foreground">{method.description}</p>
              <p className="text-sm text-foreground">{method.value}</p>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </a>
  );
};
