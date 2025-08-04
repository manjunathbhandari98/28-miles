import { ChevronLeft, ChevronRight, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "../components/ui/LoadingPage";
import RatingOverview from "../components/ui/RatingOverview";
import { getReviews } from "../service/reviewService";
import { formatDateToReadable } from "./../utils/formatedDate";

const ReviewPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(0);
  const [totalReviewPages, setTotalReviewPages] = useState(0);
  const [ratings, setRatings] = useState([]);
  const MAX_REVIEWS = 7;

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await getReviews(
          product.productId,
          reviewPage,
          MAX_REVIEWS
        );
        setReviews(res.content);
        setTotalReviewPages(res.totalPages);
        setRatings(res.content.map((review) => Math.round(review.rating)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [product, reviewPage]);
  const maxImagesPerReview = 5;

  if (loading) return <LoadingPage />;

  return (
    <div className="md:pt-20 md:m-20 m-10 pt-10 grid grid-cols-1 md:grid-cols-[4fr_9fr] gap-5">
      {/* Average Ratings */}
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold hidden md:flex">Average Rating</h2>
        <div className="flex gap-4">
          <h2 className="text-xl font-semibold">{product.rating}</h2>
          <div className="flex flex-col text-xs gap-1">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < product.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300 fill-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-sm">{`${reviews.length} Reviews`}</p>
          </div>
        </div>
        <RatingOverview ratings={ratings} />
      </div>

      {/* Reviews */}
      <div className="flex flex-col gap-8 mt-20 md:mt-0">
        <h2 className="text-2xl text-start font-bold">Customer Review</h2>
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review.reviewId}
              className="flex border-gray-400 flex-col bg-zinc-950/80 p-5 gap-2"
            >
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <div className="p-2 bg-zinc-900 rounded-full">
                    <User size={24} />
                  </div>

                  <div className="flex flex-col gap">
                    <h2 className="text-lg font-semibold">{review.username}</h2>
                    <p>{formatDateToReadable(review.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="text-gray-300/70 pl-10 pt-3 text-md i">
                {review.comment}
              </div>
              <div className="flex gap-2 pl-10">
                {Array.isArray(review.images) && review.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {review.images
                      .slice(0, maxImagesPerReview)
                      .map((img, index) => (
                        <div
                          key={index}
                          className="relative w-20 h-20 overflow-hidden rounded-md"
                        >
                          <img
                            src={img}
                            alt={`Review image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          {/* Overlay for hidden images */}
                          {index === maxImagesPerReview - 1 &&
                            review.images.length > maxImagesPerReview && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-semibold">
                                +{review.images.length - maxImagesPerReview}
                              </div>
                            )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className={`${
            reviews.length <= MAX_REVIEWS ? "p-1" : ""
          } py-4 flex w-full items-center justify-center space-x-4`}
        >
          <button
            onClick={() => setReviewPage((p) => p - 1)}
            disabled={reviewPage === 0}
            className={`px-4 py-2 text-sm font-medium rounded-full transition duration-200
                         ${
                           reviewPage === 0
                             ? "cursor-not-allowed"
                             : " hover:text-pink-600 "
                         }`}
          >
            <ChevronLeft />
          </button>

          <span className="text-sm text-gray-700 font-medium">
            Page <span className="font-semibold">{reviewPage + 1}</span> of{" "}
            <span className="font-semibold">{totalReviewPages}</span>
          </span>

          <button
            onClick={() => setReviewPage((p) => p + 1)}
            disabled={reviewPage + 1 >= totalReviewPages}
            className={`px-4 py-2 text-sm font-medium transition duration-200
                         ${
                           reviewPage + 1 >= totalReviewPages
                             ? "cursor-not-allowed"
                             : " hover:text-pink-500"
                         }`}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
