"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { searchArtist } from "@/lib/spotify";

export const SearchArtistInput = () => {
  const router = useRouter();
  const [searchedArtistString, setSearchedArtistString] = useState("");
  const debouncedSearchedArtistName = useDebounce(searchedArtistString);

  const [searchedArtistResult, setSearchedArtistResult] = useState<Artist[]>(
    []
  );
  const [artist, setArtist] = useState<Artist>();

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearchedArtistName === "") return;

    const fetchArtist = async () => {
      const formattedSearchString = debouncedSearchedArtistName
        .trim()
        .replaceAll(" ", "+");
      const { artists } = await searchArtist(formattedSearchString);

      setSearchedArtistResult(artists.items);
    };

    fetchArtist();
  }, [debouncedSearchedArtistName]);

  const onChangeArtistNameHandler = (search: string) => {
    setSearchedArtistString(search);
  };

  const onClickStartHandler = () => {
    if (artist === undefined) return;

    router.push(`/streak/${artist.id}/${artist.name.toLowerCase()}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={popoverOpen}
            className="w-[300px] justify-between"
          >
            {searchedArtistResult.find(
              (acArtist) => acArtist.name === artist?.name
            )
              ? artist?.name
              : "Search artist..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput
              onValueChange={onChangeArtistNameHandler}
              placeholder="Search artist..."
            />
            <CommandEmpty>No artist found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {searchedArtistResult.map((artist, i) => (
                <CommandItem
                  key={`${i}-${artist.id}`}
                  value={artist.name}
                  onSelect={() => {
                    setArtist(artist);
                    setPopoverOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      searchedArtistString === artist.name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {artist.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="w-[300px] mt-10"
        onClick={onClickStartHandler}
        disabled={artist === undefined}
      >
        Start
      </Button>
    </div>
  );
};
