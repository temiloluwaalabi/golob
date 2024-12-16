"use client";
// @flow
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChevronDown, ChevronUp, Star, StarHalf } from "lucide-react";
import GoogleIcon from "../icons/google";
import Image from "next/image";
import { Button } from "../ui/button";
type Props = {
  title: string;
  description: string;
  stars: number;
  name: string;
  company: string;
  position: string;
  image: string;
};
export const ReviewsCard = (props: Props) => {
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const fullStars = Math.floor(props.stars);
  const hasHalfStar = props.stars % 1 !== 0;

  // Generate stars array outside of JSX rendering
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="size-6 text-orange-300 mr-2" fill="#fdba74" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key={fullStars}
          className="size-6 text-orange-300 mr-2"
          fill="#fdba74"
        />
      );
    }
    return stars;
  };

  const starsArray = generateStars();

  const words = props.description.split(" ");
  const trucatedDescription = showFullDescription
    ? props.description
    : words.length > 15
    ? words.slice(0, 15).join(" ") + "..."
    : props.description;
  return (
    <div>
      <Card className="p-6 flex flex-col justify-center relative  shadow-lg rounded-[20px] bg-white gap-5">
        <CardHeader className="flex flex-col gap-2 p-0">
          <CardTitle className="font-gothic text-2xl font-bold text-primary-blackishGreen">
            {props.title}
          </CardTitle>
          <CardDescription>
            <span className="font-mont text-sm text-primary-blackishGreen opacity-50">
              {trucatedDescription}
            </span>
          </CardDescription>
          {words.length > 15 && (
            <Button
              className="w-auto ml-auto p-0"
              variant={"link"}
              onClick={() => setShowFullDescription((prev) => !prev)}
            >
              {showFullDescription ? (
                <>
                  <span className="flex items-center">
                    Hide <ChevronUp className="size-4 ms-2" />
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center">
                    View More <ChevronDown className="size-4 ms-2" />
                  </span>
                </>
              )}
            </Button>
          )}
        </CardHeader>
        <CardContent className=" p-0">
          <div className="flex flex-col gap-2">
            <span className="flex">{starsArray}</span>
            <div className="space-y-2">
              <h4 className="font-gothic text-sm font-bold text-primary-blackishGreen">
                {props.name}
              </h4>
              <p className="font-mont text-xs font-medium text-primary-blackishGreen opacity-50">
                <span>
                  {props.company} - {props.position}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <span className="text-xs font-bold font-gothic opacity-50">
                Google
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <Image
            src={props.image}
            alt={`${props.name} review`}
            width={377}
            height={200}
            className="rounded-[8px] object-cover w-full h-[200px]"
          />
        </CardFooter>
        <div className="absolute size-full bg-[#CDEAE1] left-[15px] lg:left-[25px] top-[22px] rounded-[20px] -z-10" />
      </Card>
    </div>
  );
};
