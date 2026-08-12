import { ImageResponse } from "next/og";
import { SocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "SL Studio";
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<SocialImage />, { ...size });
}
