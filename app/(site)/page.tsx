import { SearchArtistInput } from "@/app/(site)/components/search-artist-input";

export default async function Home() {
  return (
    <div className="w-full h-full bg-stone-500">
      <SearchArtistInput />
    </div>
  );
}
