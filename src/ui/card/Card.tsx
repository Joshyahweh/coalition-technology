import React from "react";
import { CustomImage } from "../image/CustomImage";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

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
  const levelDisplay: Record<string, JSX.Element | string> = {
    "Higher than Average": <BiSolidUpArrow color="#072635" />,
    "Lower than Average": <BiSolidDownArrow color="#072635" />,
    Normal: "",
  };
  return (
    <main
      className="px-3 py-3 text-[#072635]"
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
      <p className="text-2xl font-extrabold mb-5">
        {cardValue} {cardValueUnit}
      </p>
      <div className="flex items-center gap-3">
        {levelDisplay[cardStateLevel]}
        <p className="text-xs">{cardStateLevel}</p>
      </div>
    </main>
  );
};

export default CustomCard;
