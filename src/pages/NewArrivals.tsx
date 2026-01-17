import { useState, useEffect } from "react";
import CollectionLayout from "@/components/CollectionLayout";
import { Product } from "@/data/products";
import { normalizeProduct } from "@/lib/normalizeProduct";

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.success || data.products) {
          const filtered = (data.products || []).filter((p: any) => p.isNew);
          const mapped = filtered.map((p: any) => normalizeProduct(p));
          setProducts(mapped);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <CollectionLayout
        title="Loading..."
        metaTitle="New Arrivals"
        metaDescription="Explore our new arrivals"
        products={[]}
        filterCategories={[]}
        bannerBgColor="bg-gradient-to-br from-gold/15 via-accent/5 to-background"
      />
    );
  }

  return (
    <CollectionLayout
      title="New Arrivals"
      subtitle="Fresh & Latest Designs"
      tagline="Exclusively Curated for You"
      metaTitle="New Arrivals | Vasstra"
      metaDescription="Explore our new arrivals - freshly curated ethnic wear collection with latest designs and trends"
      products={products}
      filterCategories={[]}
      bannerImage="https://images.unsplash.com/photo-1626327957914-28bfbf68a57d?w=1600&q=80&fit=crop"
      bannerBgColor="bg-gradient-to-br from-gold/15 via-accent/5 to-background"
    />
  );
}
