"use client";

import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SearchIcon } from "lucide-react";
import { BASE_URL } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  searchTerm: z.string().min(1, {
    message: "search term must be at least 1 character.",
  }),
});

export default function Search({ onSearch, setLoading, word }: { onSearch: (data: any[] | any) => void, setLoading: Dispatch<SetStateAction<boolean>>, word: string | undefined }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(word && values.searchTerm === word) return 
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${values.searchTerm}`);
      const data = await res.json();
      if(!res.ok) {
          console.log(data);
          setLoading(false);
          return onSearch({ error: { ...data } })
      } else if (data) {
          setLoading(false);
          return onSearch(data);
      }
    } catch (error) {
      setLoading(false);
      return onSearch({ error: { server: { title: "Server Error", message: "Unable to fetch from server, could not reach dictionary server, check internet connection"}}})
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border rounded-xl w-full flex items-center justify-between gap-3 py-1.5 md:py-2.5 px-3 md:px-6">
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full border-none outline-none">
                <Input placeholder="Search for anything..." {...field} className="border-none outline-none w-full p-2 bg-none" autoComplete="on" autoCorrect="on" spellCheck/>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant='ghost' aria-label="search-btn">
          <SearchIcon />
        </Button>
      </form>
      <FormMessage />
    </Form>
  );
}
