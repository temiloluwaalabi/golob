import { Dot } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface PlacesCardProps {
  city: string;
  country: string;
  image: string;
  categories: string[];
}

const PlacesCard = ({ city, country, image, categories }: PlacesCardProps) => {
  return (
    <div className="grid h-[122px] w-full cursor-pointer grid-cols-12 items-center gap-4 rounded-[16px] bg-white p-[16px] shadow-md">
      <div className="col-span-4 lg:col-span-3">
        <Image
          alt={`${city} image`}
          src={image}
          width={90}
          height={90}
          className="size-[90px] rounded-[8px] object-cover"
        />
      </div>
      <div className="col-span-8 flex flex-col gap-[10px]">
        <h5 className="font-mont text-base font-semibold text-primary-blackishGreen opacity-70">
          {city}, {country}
        </h5>
        <p className="flex flex-wrap items-center gap-[4px] font-mont text-sm text-primary-blackishGreen">
          {categories.map((cat, i) => (
            <>
              <span className="flex items-center " key={`${cat} - ${i} ctage`}>
                {cat}{" "}
                <Dot
                  className={cn("", i === categories.length - 1 && "hidden")}
                />
              </span>
            </>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PlacesCard;
