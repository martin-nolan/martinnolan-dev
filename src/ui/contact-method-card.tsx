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
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-surface p-2 text-muted-foreground transition-all duration-200 group-hover:scale-110 group-hover:text-primary sm:p-3">
              {getIconComponent(method.icon)}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
                {method.title}
              </h4>
              <p className="mb-1 text-xs text-muted-foreground sm:text-sm">{method.description}</p>
              <p className="truncate text-xs text-foreground sm:text-sm">{method.value}</p>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </a>
  );
};
