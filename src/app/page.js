import HomeComponent from "@/components/Home/Home";
import Image from "next/image";

export default function Home() {
  return (
    <div>
    <HomeComponent />
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center md:pt-16 ">

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ashkangl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.png"
            alt="File icon"
            width={16}
            height={16}
          />
          GITHUB
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://ashkangolzad.ir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/web.jpg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          ASHKANGOLZAD.IR
        </a>
      </footer>
    </div>
  );
}
