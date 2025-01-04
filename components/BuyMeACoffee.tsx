import Image from "next/image";
import React from "react";

const BuyMeACoffee = () => {
  return (
    <div className="relative">
      <a href="https://www.buymeacoffee.com/arpancodes" target="_blank">
        <Image
          width={160}
          height={80}
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          style={{}}
        />
      </a>
      <p className="opacity-50 text-center absolute w-full text-sm left-1/2 -translate-x-1/2">
        Support my work!
      </p>
    </div>
  );
};

export default BuyMeACoffee;
