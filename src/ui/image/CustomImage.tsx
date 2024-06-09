"use client"
import Image, { ImageProps } from "next/image";

export const CustomImage: React.FC<ImageProps & { alt: string }> = ({
  alt,
  ...props
}) => {
  // Define the custom loader function

  const customLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return <Image {...props} alt={alt} loader={customLoader} />;
};
