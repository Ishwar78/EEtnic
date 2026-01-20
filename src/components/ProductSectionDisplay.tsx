import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  [key: string]: any;
}

interface ProductSection {
  _id: string;
  name: string;
  heading: string;
  subheading?: string;
  productIds: Product[];
  displayLayout: string;
  backgroundImage?: string;
}

interface ProductSectionDisplayProps {
  sectionName: string;
}

const ProductSectionDisplay = ({ sectionName }: ProductSectionDisplayProps) => {
  const [section, setSection] = useState<ProductSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || '/api';
        const response = await fetch(`${API_URL}/product-sections/name/${sectionName}`);

        if (response.ok) {
          const data = await response.json();
          setSection(data.section);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Error fetching product section:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSection();
  }, [sectionName]);

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!section || !section.productIds || section.productIds.length === 0) {
    return null;
  }

  const renderAsymmetricLayout = () => {
    if (section.productIds.length === 0) return null;

    const firstProduct = section.productIds[0];
    const remainingProducts = section.productIds.slice(1);
    const smallProducts = remainingProducts.slice(0, 4); // Show 4 products in 2x2 grid

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Product */}
        <div className="lg:col-span-1 lg:row-span-2">
          <ProductCard product={firstProduct} />
        </div>

        {/* Small Products Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {smallProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  };

  const renderGridLayout = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {section.productIds.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  const renderCarouselLayout = () => {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-full">
          {section.productIds.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-48">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeaturedLayout = () => {
    if (section.productIds.length === 0) return null;

    const featuredProduct = section.productIds[0];
    const otherProducts = section.productIds.slice(1);

    return (
      <div className="space-y-12">
        {/* Featured Product - Large */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="h-96 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={featuredProduct.image} 
              alt={featuredProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-4">{featuredProduct.name}</h3>
            <p className="text-2xl font-semibold text-primary mb-4">
              ₹{featuredProduct.price.toLocaleString('en-IN')}
            </p>
            {featuredProduct.originalPrice && (
              <p className="text-lg text-gray-500 line-through mb-6">
                ₹{featuredProduct.originalPrice.toLocaleString('en-IN')}
              </p>
            )}
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Shop Now
            </button>
          </div>
        </div>

        {/* Other Products Grid */}
        {otherProducts.length > 0 && (
          <div>
            <h4 className="text-2xl font-bold mb-8">More in This Collection</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLayout = () => {
    switch (section.displayLayout) {
      case 'asymmetric':
        return renderAsymmetricLayout();
      case 'carousel':
        return renderCarouselLayout();
      case 'featured':
        return renderFeaturedLayout();
      case 'grid':
      default:
        return renderGridLayout();
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {section.heading}
          </h2>
          {section.subheading && (
            <p className="text-lg text-muted-foreground">
              {section.subheading}
            </p>
          )}
        </div>

        {/* Products Layout */}
        {renderLayout()}
      </div>
    </section>
  );
};

export default ProductSectionDisplay;
