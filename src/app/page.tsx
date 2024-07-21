import clsx from "clsx";
import { satisfy } from "./ui/fonts";
import Controls from "./ui/controls";
import { Suspense } from "react";
import Loader from "./ui/loader";
import { CardWrapper } from "./ui/postCard";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    postId?: string;
  };
}) {
  const id = Number(searchParams?.postId);

  return (
    <>
      <main>
        <div className="flex flex-col items-center relative">
          <h1
            className={clsx(
              `text-2xl sm:text-3xl lg:text-5xl inline`,
              satisfy.className
            )}
          >
            Blog View
          </h1>
          <Controls />
          <Suspense fallback={<Loader />}>
            <CardWrapper id={id} />;
          </Suspense>
        </div>
      </main>
    </>
  );
}
