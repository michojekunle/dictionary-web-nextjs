'use client'

import FontDropdown from "@/components/font-dropdown";
import { ModeToggle } from "@/components/mode-toggle";
import Search from "@/components/search";
import { ScrollArea } from "@/components/ui/scroll-area";
import WordDetails from "@/components/word-details";
import { Book } from "lucide-react";
import {
  Sacramento,
  PT_Mono,
  Cousine,
  Lato,
  Montserrat,
  Roboto,
} from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const roboto = Roboto({ subsets: ['latin'], weight: ["100", "300", "400", "700"] });
const sacramento = Sacramento({ subsets: ['latin'], weight: "400" });
const pt_mono = PT_Mono({ subsets: ['latin'], weight: "400" });
const cousine = Cousine({ subsets: ['latin'], weight: ["400", "700"] });
const lato = Lato({ subsets: ['latin'], weight: ["100", "300", "400", "700"] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ["100", "300", "400", "700"] });

export default function Home() {
  const [font, setFont] = useState(roboto.className);
  const [wordDetails, setWordDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const onFontChange = (font: string) => {
    switch (font) {
      case "roboto":
        setFont(roboto.className);
        break;
      case "sacramento":
        setFont(sacramento.className);
        break;
      case "pt-mono":
        setFont(pt_mono.className);
        break;
      case "cousine":
        setFont(cousine.className);
        break;
      case "lato":
        setFont(lato.className);
        break;
      case "montserrat":
        setFont(montserrat.className);
        break;
      default:
        break;
    }
  };

  const onSearch = (data: any[]) => {
    if(data[0]?.error) {
      return setError(data[0]?.error);
    }
    if(data.length > 0) {
      setError(false);
      setWordDetails(data);
    }  
  }
  return (
    <ScrollArea
      className={`${font} min-h-screen p-4 md:py-8 container mx-auto w-full max-w-3xl flex flex-col gap-4 md:gap-8`}
    >
      <header className="flex items-center justify-between">
        <Link href="/">
          <Book className="w-10 h-10" />
        </Link>
        <div className="flex gap-3">
          <FontDropdown onFontChange={onFontChange} />
          <div className="h-10 w-0.5 bg-black dark:bg-white"></div>
          <ModeToggle />
        </div>
      </header>
      <main className="mt-6 md:mt-8 space-y-6 md:space-y-8">
        <Search setLoading={setLoading} onSearch={onSearch}/>
        <WordDetails loading={loading} error={error} wordDetails={wordDetails}/>
      </main>
    </ScrollArea>
  );
}
