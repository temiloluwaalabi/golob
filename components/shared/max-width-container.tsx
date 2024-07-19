import { cn } from "@/lib/utils";

interface MaxWidthContainerProps {
  children: React.ReactNode;
  className?: string;
}
const MaxWidthContainer = ({ children, className }: MaxWidthContainerProps) => {
  return (
    <section
      className={cn(
        "w-full px-[30px] md:px-[70px] lg:px-[104px] py-4 sm:py-6 md:py-8 lg:py-10",
        className
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthContainer;
