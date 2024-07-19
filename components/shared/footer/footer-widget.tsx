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
    <div className="flex flex-col items-start p-0 gap-4 ">
      <h5 className="font-gothic text-base font-bold text-primary-blackishGreen">
        {props.title}
      </h5>
      <div className="flex flex-col p-0 gap-3">
        {props.links.map((link, i) => (
          <Link
            className="text-sm font-mont text-primary-blackishGreen opacity-70"
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
