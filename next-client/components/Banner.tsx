import React from "react";

import Image from "next/legacy/image";
import logo from "../assets/HoC_MASTER_v1_splitFour.svg";

interface bannerStyles {
  banner?: string;
  childStyles?: string;
  parentStyles?: string;
}

const Banner = ({ banner, childStyles, parentStyles }: bannerStyles) => (
  <div
    className={`relative w-full flex items-center z-0 overflow-hidden nft-gradient ${parentStyles}`}
  >
    <p className={`font-bold text-5xl font-poppins leading-70 ${childStyles}`}>
      {banner}
    </p>

    <div className="absolute w-48 h-48 sm:w-32 sm:h-32 rounded-full white-bg -top-9 -left-16 -z-5">
      <Image
        src={logo}
        objectFit="contain"
        width={400}
        height={400}
        alt="logo"
        className="animate-spinning-logo"
      />
    </div>
    <div className="absolute w-72 h-72 sm:w-56 sm:h-56 rounded-full white-bg -bottom-24 -right-14 -z-5">
      <Image
        src={logo}
        objectFit="contain"
        width={400}
        height={400}
        alt="logo"
        className="animate-spinning-logo"
      />
    </div>
  </div>
);

export default Banner;
