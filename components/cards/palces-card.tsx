import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import Image from "next/image";

interface PlacesCardProps {
  city: string;
  country: string;
  image: string;
  categories: string[];
}

const PlacesCard = ({ city, country, image, categories }: PlacesCardProps) => {
  return (
    <div className="w-full grid grid-cols-12 items-center gap-4 cursor-pointer h-[122px] shadow-md rounded-[16px] p-[16px] bg-white">
      <div className="col-span-4 lg:col-span-3">
        <Image
          alt={`${city} image`}
          src={image}
          width={90}
          height={90}
          className="size-[90px] object-cover rounded-[8px]"
        />
      </div>
      <div className="col-span-8 flex flex-col gap-[10px]">
        <h5 className="font-mont text-base font-semibold text-primary-blackishGreen opacity-70">
          {city}, {country}
        </h5>
        <p className="font-mont text-sm text-primary-blackishGreen flex flex-wrap items-center gap-[4px]">
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
