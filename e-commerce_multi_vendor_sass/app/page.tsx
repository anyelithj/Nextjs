import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className={cn("container","border", "border-red-500","text-red-900", "uppercase")}>
      <Button variant="destructive" size="sm" >Happy new year</Button>
      <h1>Typography</h1>
    </div>
    //  <div className="text-red-900 uppercase">
    //  Happy new year
    // </div>
  );
}
