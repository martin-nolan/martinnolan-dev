declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }

  export const ArrowDown: ComponentType<IconProps>;
  export const Github: ComponentType<IconProps>;
  export const Linkedin: ComponentType<IconProps>;
  export const Mail: ComponentType<IconProps>;
  export const MessageCircle: ComponentType<IconProps>;
  export const X: ComponentType<IconProps>;
  export const Download: ComponentType<IconProps>;
  export const Send: ComponentType<IconProps>;
  export const ChevronLeft: ComponentType<IconProps>;
  export const ChevronRight: ComponentType<IconProps>;
  export const Menu: ComponentType<IconProps>;
  export const Code: ComponentType<IconProps>;
  export const Users: ComponentType<IconProps>;
  export const Brain: ComponentType<IconProps>;
  export const Rocket: ComponentType<IconProps>;
  export const Phone: ComponentType<IconProps>;
  export const RefreshCw: ComponentType<IconProps>;
  export const FileX: ComponentType<IconProps>;
  export const Calendar: ComponentType<IconProps>;
  export const Globe2: ComponentType<IconProps>;
  export const Moon: ComponentType<IconProps>;
  export const Sun: ComponentType<IconProps>;
  // Add other icons as needed
}
