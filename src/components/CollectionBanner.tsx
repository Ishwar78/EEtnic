import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CollectionBannerProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  productCount: number;
}

export default function CollectionBanner({
  title,
  subtitle,
  tagline,
  backgroundImage,
  backgroundColor = "bg-gradient-to-br from-primary/10 via-accent/5 to-background",
  textColor = "text-foreground",
  productCount,
}: CollectionBannerProps) {
  return (
    <div
      className={cn(
        "relative py-16 md:py-24 overflow-hidden",
        backgroundColor
      )}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(135deg, rgba(122, 33, 57, 0.08) 0%, rgba(201, 162, 39, 0.05) 100%), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      } : undefined}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4 md:mb-6 flex items-center justify-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className={cn("font-medium", textColor)}>{title}</span>
          </nav>

          {/* Main Title */}
          <h1 className={cn(
            "font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6",
            textColor
          )}>
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-2xl text-muted-foreground mb-3 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Tagline */}
          {tagline && (
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gold rounded-full" />
              <p className="text-gold font-medium text-lg tracking-wide">
                {tagline}
              </p>
              <div className="h-1 w-12 bg-gold rounded-full" />
            </div>
          )}

          {/* Product Count */}
          <div className="inline-block mt-6 md:mt-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-sm md:text-base text-muted-foreground">
              <span className="font-semibold text-foreground">{productCount}</span> exquisite pieces
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
