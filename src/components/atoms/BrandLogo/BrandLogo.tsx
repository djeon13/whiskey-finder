import { Link } from "react-router-dom";
import "./BrandLogo.css";

export interface BrandLogoProps {
  src: string;
  alt: string;
  to?: string;
  className?: string;
  imageClassName?: string;
}

export function BrandLogo({
  src,
  alt,
  to = "/",
  className = "brand-logo",
  imageClassName = "brand-logo__image",
}: BrandLogoProps) {
  return (
    <Link className={className} to={to}>
      <img className={imageClassName} src={src} alt={alt} />
    </Link>
  );
}
