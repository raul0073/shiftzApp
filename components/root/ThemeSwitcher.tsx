"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setMounted(true);
    setLoading(false);
  }, []);
  
  if (!mounted) return null;
  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Tabs defaultValue={theme}>
        <TabsList className="border">
          <TabsTrigger value="light" onClick={() => setTheme("light")}>
            <SunIcon className="h-[1.1rem] w-[1.1rem] hover:fill-yellow-100" />
          </TabsTrigger>
          <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
            <MoonIcon className="h-[1.1rem] w-[1.1rem] rotate-90 transition-all dark:rotate-0" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}

export default ThemeSwitcher;
