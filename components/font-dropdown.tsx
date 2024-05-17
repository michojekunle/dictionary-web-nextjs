import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const fontList = [
  'roboto',
  'lato', 
  'montserrat',
  'cousine',
  'sacramento',
  'pt-mono',
]

const FontDropdown = ({ onFontChange } : { onFontChange: (font: string) => void }) => {
  const [font, setFont] = useState(fontList[0]);
  return (
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-3 outline-none pr-0" variant="link">
          <span className="capitalize font-bold">{font}</span> 
          <ChevronDown className="w-5 h-5"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {fontList.map((font) => (
          <DropdownMenuItem onClick={() => {onFontChange(font); setFont(font);}} className="capitalize" key={font}>
            {font}  
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  )
};

export default FontDropdown;
