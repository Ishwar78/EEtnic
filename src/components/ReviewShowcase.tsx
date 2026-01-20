import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Review {
  _id: string;
  customerName: string;
  customerImage: string;
  reviewText: string;
  rating: number;
  order: number;
}

export default function ReviewShowcase() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (response.ok) {
          const data = await response.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [API_URL]);

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const itemsPerView = 4;
  const totalSlides = Math.ceil(reviews.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const startIndex = currentIndex * itemsPerView;
  const visibleReviews = reviews.slice(startIndex, startIndex + itemsPerView);

  return (
    <section className="py-16 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            Real photos from our valued customers
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {visibleReviews.map((review) => (
              <div
                key={review._id}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Customer Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={review.customerImage}
                    alt={review.customerName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Review Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                    {review.customerName}
                  </h3>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Indicators */}
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === currentIndex
                        ? "w-8 bg-primary"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
