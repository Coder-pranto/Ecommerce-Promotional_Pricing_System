import { FaRegStar, FaStar } from "react-icons/fa6";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import {
  useCreateMutation,
  useDataQuery,
  useUpdateMutation,
} from "../../utils/api";
import toast from "react-hot-toast";

export default function Review({ userId, sellerId }) {
  const [activeSection, setActiveSection] = useState("description");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [updatingReviewId, setUpdatingReviewId] = useState(null);

  // fetching ratings for this shop
  const { data: ratingData, refetch } = useDataQuery(
    ["shop-raitng", sellerId],
    `/review/seller/${sellerId}`
  );

  // creating or posting rating of user for the shop
  const rateShop = useCreateMutation(["shop-rating"], "/review");

  //updating rating
  const updateShopRating = useUpdateMutation(
    ["shop-rating", updatingReviewId],
    "/review"
  );

  // handling submission of review
  const handleSubmit = async () => {
    try {
      const response = await rateShop.mutateAsync({
        customerId: userId,
        sellerId: sellerId,
        rating: rating,
        // title: "Dummy Title",
        comment: comment,
      });
      if (response.status === 201) {
        setRating(0);
        setComment("");
        refetch();
        toast.success(response.data?.message);
      }
    } catch (err) {
      toast.error(err.response.data?.msg);
    }
  };

  // onclick on edit icon getting and setting rating for update
  const handleUpdate = (rating) => {
    // console.log(rating);
    setComment(rating?.comment);
    setRating(rating?.rating);
    setUpdatingReviewId(rating?._id);
  };

  // handling update operation
  const handleUpdateReview = async () => {
    try {
      const response = await updateShopRating.mutateAsync({
        id: updatingReviewId,
        updatedData: {
          customerId: userId,
          sellerId: sellerId,
          rating: rating,
          // title: "Dummy Title",
          comment: comment,
        },
      });
      // console.log(response);
      if (response.status === 200) {
        setRating(0);
        setComment("");
        refetch();
        toast.success("Review updated");
      }
    } catch (err) {
      toast.error(err.response.data?.msg);
    }
  };

  return (
    <div className="justify-center mt-8">
      <div className="text-center mx-auto mb-8">
        <div className="flex justify-between md:justify-center gap-4">
          <button
            className={`text-xxl ${
              activeSection !== "description" && "text-gray-500"
            }`}
            onClick={() => setActiveSection("description")}
          >
            Description
          </button>
          <button
            className={`text-xxl ${
              activeSection !== "reviews" && "text-gray-500"
            }`}
            onClick={() => setActiveSection("reviews")}
          >
            Reviews [{ratingData?.data?.length}]
          </button>
        </div>
      </div>
      <div className="w-[80%] mx-auto text-gray-400">
        {activeSection === "description" && (
          <div className="flex flex-col justify-center">
            <p className="mb-4">
              Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
              portable active stereo speaker takes the unmistakable look and
              sound of Marshall, unplugs the chords, and takes the show on the
              road.
            </p>
            <p>
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of
              vintage styled engineering. Setting the bar as one of the loudest
              speakers in its class, the Kilburn is a compact, stout-hearted
              hero with a well-balanced audio which boasts a clear midrange and
              extended highs for a sound that is both articulate and pronounced.
              The analogue knobs allow you to fine tune the controls to your
              personal preferences while the guitar-influenced leather strap
              enables easy and stylish travel.
            </p>
          </div>
        )}
        {activeSection === "reviews" && (
          <div className="flex flex-col">
            <div className="flex flex-row gap-x-5 xs:gap-y-3 overflow-x-auto">
              {ratingData?.data.map((rating) => (
                <ReviewCard
                  key={rating?._id}
                  name={rating.customerId?.name}
                  customerId={rating.customerId?._id}
                  comment={rating?.comment}
                  rating={rating?.rating}
                  userId={userId}
                  handleUpdate={() => handleUpdate(rating)}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-x-12 justify-center">
              <textarea
                name="review"
                className="border-2 border-primary p-2 rounded-lg w-full md:w-3/4"
                cols="30"
                rows="6"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="flex flex-col mt-5">
                <h3 className="text-black mb-2">Give us a review</h3>
                <div className="flex items-center mb-1">
                  <h4>Shop Review: </h4>
                  <span className="ml-3 flex items-center cursor-pointer">
                    {/* creating array with length of rating with filled star */}
                    {Array.from({ length: rating }, (_, index) => (
                      <FaStar
                        key={index}
                        color="skyblue"
                        onClick={() => setRating(index + 1)}
                      />
                    ))}

                    {/* creating a 5 blank star for rating and slicing the array from rating to lenght 5 and replacing the sliced array with filled star */}
                    {Array.from({ length: 5 }, (_, index) => (
                      <FaRegStar
                        key={index}
                        color="skyblue"
                        onClick={() => setRating(index + 1)}
                      />
                    )).slice(rating, 5)}
                  </span>
                </div>

                {!updatingReviewId ? (
                  <button
                    onClick={handleSubmit}
                    className="w-30 p-1.5 mt-2.5 rounded-lg bg-primary text-white"
                  >
                    Add a review
                  </button>
                ) : (
                  <button
                    onClick={handleUpdateReview}
                    className="w-30 p-1.5 mt-2.5 rounded-lg bg-primary text-white"
                  >
                    Update review
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
