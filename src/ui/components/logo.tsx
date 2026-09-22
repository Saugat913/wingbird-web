type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function Logo({ className = "h-7 w-7", ...props }: LogoProps) {
  return <img src="/logo.svg" alt="Wingbird Logo" className={className} {...props} />;
}
