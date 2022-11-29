import Head from "next/head";

import { useState, useEffect, useRef } from "react";

import Image from "next/legacy/image";
import { useTheme } from "next-themes";

import { Banner, CreatorCard, NFTCard } from "../components";

import images from "../assets";
import { makeId } from "../utils/makeId";

const Home = () => {
  const [hideButtons, setHideButtons] = useState(true);
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = (direction: string) => {
    const { current }: { current: any } = scrollRef;
    const scrollAmount = window.innerWidth > 1000 ? 2700 : 210;
    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current }: { current: any } = scrollRef;
    const { current: parent }: { current: any } = parentRef;
    if (current?.scrollAmount >= parent?.offsetWidth) {
      setHideButtons(true);
    } else {
      setHideButtons(false);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  }, []);

  // To prevent hydration error messages from the makeId() function -> returning a random number means
  // that the server side rendered DOM is not the same as the DOM made by the react app in the browser https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  // -------------------------------------------------------------------------------------------------

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          banner="Discover, collect and sell extraordinary NFTs on the Cardano Blockchain"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div>
          <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl text-semibold ml-4 xs:ml-0">
            Top Sellers
          </h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div
              className="flex flex-roiw w-max overflow-x-scroll no-scrollbar select-none"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((index) => (
                <CreatorCard
                  key={`creator-${index}`}
                  rank={index}
                  creatorImage={images[`creator${index}`]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorADA={10 - index * 0.5}
                />
              ))}
              {!hideButtons && (
                <>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                    onClick={() => handleScroll("left")}
                  >
                    <Image
                      src={images.left}
                      alt={""}
                      layout="fill"
                      objectFit="contain"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                  <div
                    className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                    onClick={() => handleScroll("right")}
                  >
                    <Image
                      src={images.right}
                      alt={""}
                      layout="fill"
                      objectFit="contain"
                      className={theme === "light" && "filter invert"}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl text-semibold sm:mb-4 flex-1">
              Hot Bids
            </h1>
            <div>SearchBar</div>
          </div>
            <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <NFTCard
                  key={`nft-${index}`}
                  nft={{
                    index,
                    name: `Nifty NFT ${index}`,
                    price: (10 - index * 0.534).toFixed(2),
                    seller: `0x${makeId(3)}...${makeId(4)}`,
                    owner: `0x${makeId(3)}...${makeId(4)}`,
                    description: "Cool NFT on Sale"
                  }}
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
