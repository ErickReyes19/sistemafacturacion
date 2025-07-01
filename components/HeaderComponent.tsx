// components/header-component.tsx
import { Card, CardContent } from "@/components/ui/card"; // Componente cliente separado
import { ClientBackButton } from "./buton-back";

interface HeaderComponentProps {
  screenName: string;
  description: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Opcional si querés
  showBackButton?: boolean;
}

export default function HeaderComponent({
  screenName,
  description,
  Icon,
  showBackButton = true,
}: HeaderComponentProps) {
  return (
    <Card className="w-full my-4">
      <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 p-4 md:p-6">
        <div className="flex items-center space-x-4">
          {Icon && <Icon className="h-10 w-10 text-primary" aria-hidden="true" />}
          <div>
            <h2 className="text-xl md:text-2xl font-bold">{screenName}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {showBackButton && <ClientBackButton />}
      </CardContent>
    </Card>
  );
}
