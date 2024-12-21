// @flow
import Link from "next/link";
import * as React from "react";
interface LinkProps {
  name: string;
  link: string;
}
type Props = {
  title: string;
  links: LinkProps[];
};
export const FooterWidget = (props: Props) => {
  return (
    <div className="flex flex-col items-start gap-4 p-0 ">
      <h5 className="font-gothic text-base font-bold text-primary-blackishGreen">
        {props.title}
      </h5>
      <div className="flex flex-col gap-3 p-0">
        {props.links.map((link) => (
          <Link
            className="font-mont text-sm text-primary-blackishGreen opacity-70"
            href={link.link}
            key={link.name}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
