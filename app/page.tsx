import { CategoryCard } from "@/components/cards/category-card";
import { HomeSearch } from "@/components/cards/home-search";
import PlacesCard from "@/components/cards/palces-card";
import { ReviewsCard } from "@/components/cards/reviews-card";
import { NavHeader } from "@/components/shared/header/main-header";
import { SectionHeader } from "@/components/shared/section-header";
import { categories, places, reviews } from "@/constants";
import { currentUser } from "@/lib/auth";
import { User } from "@/types";
import Image from "next/image";

export default async function Home() {
  const user: User | null = await currentUser();

  return (
    <>
      <section
        className="h-[400px] md:h-[480px] lg:h-[600px] flex justify-center items-center rounded-[24px] m-[15px] sm:m-[20px] md:m-[25px] lg:m-[30px] relative"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/demw7uh0v/image/upload/v1720189748/golobe/hero_gsodsd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center", // This line sets the background position
        }}
      >
        <NavHeader
          user={user}
          transparent={true}
          className="z-20 px-[32px] absolute top-0 left-0 w-full bg-transparent"
        />
        <div className="absolute z-10 top-0 rounded-[24px] left-0 w-full h-full bg-black/30" />{" "}
        {/* Overlay */}
        <div className="flex flex-col gap-4 md:gap-7 lg:gap-10 z-20">
          <div className="flex items-center gap-2 md:gap-8 lg:gap-14 flex-col">
            <h5 className="text-[20px] md:text-[30px] lg:text-45_gothic text-white">
              Helping Others
            </h5>
            <h2 className="text-[30px] sm:text-[40px] md:text-[60px] font-gothicExtended lg:text-80_gothic text-white mt-4">
              LIVE & TRAVEL
            </h2>
          </div>
          <p className="text-[16px] md:text-[18px] font-mont lg:text-20_semibold text-center text-white">
            Special offers to suit your plan
          </p>
        </div>
      </section>
      <section className=" px-[30px] md:px-[70px] lg:px-[104px] z-30">
        <div className="translate-y-[-20%] sm:translate-y-[-25%] md:translate-y-[-40%] lg:translate-y-[-50%] z-30">
          <HomeSearch />
        </div>
      </section>
      <section className="mt-[-80px] z-40 pb-[40px] px-[30px] flex flex-col gap-10 md:px-[70px] lg:px-[104px] ">
        <SectionHeader
          title="Plan your perfect trip"
          desc="Search Flights & Places Hire to our most popular destinations"
          btn="See More Places"
        />
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {places.map((place, i) => (
            <PlacesCard
              key={`${place.city} - ${i} pefTrip`}
              city={place.city}
              country={place.country}
              categories={place.categories}
              image={place.image}
            />
          ))}
        </div>
      </section>
      <section className="pt-[40px] pb-[40px] px-[30px] flex flex-col gap-10 md:px-[70px] lg:px-[104px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {categories.map((category, i) => (
            <CategoryCard
              key={`${category.name} - ${i} catTri[]`}
              title={category.name}
              desc={category.desc}
              btnText={category.btnText}
              img={category.image}
            />
          ))}
        </div>
      </section>
      <section className="pt-[40px] pb-[40px] px-[30px] flex flex-col gap-10 md:px-[70px] lg:px-[104px]">
        <SectionHeader
          title="Reviews"
          desc="What people say about Golobe Facilities"
          btn="See All"
        />
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-12">
          {reviews.map((review, i) => (
            <ReviewsCard
              title={review.title}
              name={review.name}
              description={review.description}
              position={review.position}
              company={review.company}
              stars={review.stars}
              image={review.image}
              key={`${review.name} - ${i}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
