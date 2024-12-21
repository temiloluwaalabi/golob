import { CategoryCard } from "@/components/cards/category-card";
import { HomeSearch } from "@/components/cards/home-search";
import PlacesCard from "@/components/cards/palces-card";
import { ReviewsCard } from "@/components/cards/reviews-card";
import { NavHeader } from "@/components/shared/header/main-header";
import { SectionHeader } from "@/components/shared/section-header";
import { categories, places, reviews } from "@/constants";
import { currentUser } from "@/lib/auth";
import { User } from "@/types";

// import { fetchCountriesByRegionAndSubRegions } from "./actions/countries.actions";

export default async function Home() {
  const user: User | null = await currentUser();
  // const countries = await fetchCountriesByRegionAndSubRegions();
  return (
    <>
      <section
        className="relative m-[15px] flex h-[400px] items-center justify-center rounded-[24px] sm:m-[20px] md:m-[25px] md:h-[480px] lg:m-[30px] lg:h-[600px]"
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
          className="absolute left-0 top-0 z-20 w-full bg-transparent px-[32px]"
        />
        <div className="absolute left-0 top-0 z-10 size-full rounded-[24px] bg-black/30" />{" "}
        {/* Overlay */}
        <div className="z-20 flex flex-col gap-4 md:gap-7 lg:gap-10">
          <div className="flex flex-col items-center gap-2 md:gap-8 lg:gap-14">
            <h5 className="lg:text-45_gothic text-[20px] text-white md:text-[30px]">
              Helping Others
            </h5>
            <h2 className="lg:text-80_gothic mt-4 font-gothicExtended text-[30px] text-white sm:text-[40px] md:text-[60px]">
              LIVE & TRAVEL
            </h2>
          </div>
          <p className="lg:text-20_semibold text-center font-mont text-[16px] text-white md:text-[18px]">
            Special offers to suit your plan
          </p>
        </div>
      </section>
      <section className=" z-30 px-[30px] md:px-[70px] lg:px-[104px]">
        <div className="z-30 translate-y-[-20%] sm:-translate-y-1/4 md:translate-y-[-40%] lg:-translate-y-1/2">
          <HomeSearch />
        </div>
      </section>
      <section className="z-40 mt-[-80px] flex flex-col gap-10 px-[30px] pb-[40px] md:px-[70px] lg:px-[104px] ">
        <SectionHeader
          title="Plan your perfect trip"
          desc="Search Flights & Places Hire to our most popular destinations"
          btn="See More Places"
        />
        <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
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
      <section className="flex flex-col gap-10 px-[30px] py-[40px] md:px-[70px] lg:px-[104px] ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
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
      <section className="flex flex-col gap-10 px-[30px] py-[40px] md:px-[70px] lg:px-[104px]">
        <SectionHeader
          title="Reviews"
          desc="What people say about Golobe Facilities"
          btn="See All"
        />
        <div className="md:grid-col-2 grid grid-cols-1 gap-12 lg:grid-cols-3">
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
