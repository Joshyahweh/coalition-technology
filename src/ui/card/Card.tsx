import React from "react";
import { CustomImage } from "../image/CustomImage";

const CustomCard: React.FC<{
  cardBackgroundColor: string;
  cardImage: string;
  cardTitle: string;
  cardValue: number;
  cardStateLevel: string;
  cardValueUnit: string;
}> = ({
  cardBackgroundColor,
  cardImage,
  cardStateLevel,
  cardTitle,
  cardValue,
  cardValueUnit,
}) => {
  return (
    <main
      className="p-3 text-[#072635]"
      style={{
        backgroundColor: cardBackgroundColor,
        borderRadius: "5%",
        width: "30%",
      }}
    >
      <CustomImage
        src={cardImage}
        alt="Respiratory rate"
        width={70}
        height={70}
      />
      <p className="py-2 text-xs">{cardTitle}</p>
      <p className="text-2xl font-black mb-5">
        {cardValue} {cardValueUnit}
      </p>
      <p className="text-xs">{cardStateLevel}</p>
    </main>
  );
};

export default CustomCard;
