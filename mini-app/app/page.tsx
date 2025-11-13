import { useState } from "react";
import { description, title, url } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import { SlotMachine } from "@/components/slot-machine";
import { Share } from "@/components/share";

export { generateMetadata };

export default function Home() {
  const [winFruit, setWinFruit] = useState<string | null>(null);

  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <span className="text-2xl">{title}</span>
      <span className="text-muted-foreground">{description}</span>
      <SlotMachine onWin={setWinFruit} />
      {winFruit && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-green-600 font-semibold">
            You won {winFruit}!
          </span>
          <Share
            text={`${title} ${url} - I just won ${winFruit}!`}
            className="mt-2"
          />
        </div>
      )}
    </main>
  );
}
