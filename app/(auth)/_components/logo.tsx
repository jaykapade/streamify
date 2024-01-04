import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {};

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image
          src="/logo.svg"
          className="rounded-full"
          alt="Streamify"
          height="80"
          width="80"
        />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className={"text-xl font-semibold"}>Streamify</p>
        <p className={"text-sm text-muted-foreground"}>
          Let Your Every Moment Takes Center Stage!
        </p>
      </div>
    </div>
  );
};

export default Logo;
