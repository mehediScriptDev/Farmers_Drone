
import React, { useState, useRef } from "react";
import { Star } from "lucide-react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ---------------- VideoCard Component ----------------
function VideoCard({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        type="video/mp4"
        className="w-full h-full object-cover"
        onClick={handlePlay}
      />
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg">
            <FaPlay className="text-black text-3xl" />
          </div>
        </button>
      )}
    </div>
  );
}

// ---------------- Main Component ----------------
export default function OrderDetailsPage() {
  const [orderData] = useState({
    serviceOrderId: "#0123456789",
    customerOrderId: "#0123456789",
    basicSpecifics: [
      { label: "Customer ID", value: "#0123456789" },
      { label: "Sub-Service ID", value: "#0123456789" },
      { label: "Drone Operator ID", value: "#0123456789" },
      { label: "Drone ID", value: "#0123456789" },
      { label: "Customer Order ID", value: "#0123456789" },
    ],
    scheduling: {
      serviceLocation:
        "Marine Drive, Netaji Subhash Chandra Bose Road, Churchgate, South Mumbai",
      serviceStart: "23-sep-25",
      serviceEnd: "23-sep-25",
    },
    rescheduling: {
      rescheduledBy: "Customer (self)",
      rescheduledDate: "23-sep-25",
      rescheduleCount: "7 times",
      rescheduleReason:
        "Marine Drive, Netaji Subhash Chandra Bose Road, Churchgate, South Mumbai",
    },
    serviceMetrics: [
      { label: "Service Area (in Acres)", value: "1" },
      { label: "Flight Hours", value: "1.5h" },
      { label: "Unit Cost", value: "₹150" },
      { label: "Additional Costs", value: "No additional cost" },
      { label: "Discount Amount", value: "₹00" },
      { label: "Service Order Cost", value: "₹150" },
    ],
    paymentStatus: "Paid",
    notes: {
      specialInstructions: "No comments",
      acknowledgmentStatus: "Accepted",
    },
  });

  const [images] = useState([
    "https://images.unsplash.com/photo-1599328580087-15c9dab481f3?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1609692029268-f9ba9b2a728b?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1604129319050-36cc1107bead?w=500&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1661917179706-33e305a4ee45?w=500&auto=format&fit=crop&q=60",
  ]);

  const [videos] = useState([
    "https://media.istockphoto.com/id/1151123617/video/aerial-view-rice-field-terraces-panoramic-hillside-with-rice-farming-on-mountains.mp4?s=mp4-640x640-is&k=20&c=hmY8doayeuO0G9wSRRdZnOzPMAa6NS6t-wK84NHZymw=",
    "https://media.istockphoto.com/id/1276446161/video/inaho-bathed-in-the-light-of-dusk.mp4?s=mp4-640x640-is&k=20&c=nHuYPo_sigSbHYgFyXEWpntw7XCPPatO-_oxz3CRtnE=",
  ]);

  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [tip, setTip] = useState("$30");
  const [review, setReview] = useState("");
  const navigate = useNavigate(); // ✅ navigate hook

  return (


    <main className="p-4 md:px-12 ">
      <div className="max-w-8xl mx-auto rounded bg-white">
        <div className="p-6 md:p-12 bg-[#F4F9FF]">
          {/* ✅ Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center border-2 border-[#666666] p-2 rounded-full gap-2 mb-2 text-gray-700 hover:text-gray-900 font-medium cursor-pointer hover:bg-white"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          {/* Order IDs */}
          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="font-medium text-base md:text-lg">
                Service Order ID:
              </span>
              <span className="font-normal text-sm md:text-base">
                {orderData.serviceOrderId}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="font-medium text-base md:text-lg">
                Customer Order ID:
              </span>
              <span className="font-normal text-sm md:text-base">
                {orderData.customerOrderId}
              </span>
            </div>
          </div>

          {/* Basic Specifics */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              Basic Specifics Info
            </h3>
            <div className="space-y-2">
              {orderData.basicSpecifics.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm py-1.5"
                >
                  <span className="font-medium text-base md:text-lg">
                    {item.label}:
                  </span>
                  <span className="font-normal text-sm md:text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduling */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              Scheduling
            </h3>
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Service Location:
                </span>
                <span className="font-normal text-sm md:text-base mt-1 md:mt-0">
                  {orderData.scheduling.serviceLocation}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Service Start:
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.scheduling.serviceStart}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Service End:
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.scheduling.serviceEnd}
                </span>
              </div>
            </div>
          </div>

          {/* Rescheduling */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              Rescheduling Info
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Rescheduled By:
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.rescheduling.rescheduledBy}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Rescheduled Date:
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.rescheduling.rescheduledDate}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Reschedule Count:
                </span>
                <span className="font-normal text-sm md:text-base">
                  {orderData.rescheduling.rescheduleCount}
                </span>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm py-1.5">
                <span className="font-medium text-base md:text-lg">
                  Service Location:
                </span>
                <span className="font-normal text-sm md:text-base mt-1 md:mt-0">
                  {orderData.rescheduling.rescheduleReason}
                </span>
              </div>
            </div>
          </div>

          {/* Service Metrics */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              Service Metrics
            </h3>
            <div className="space-y-2">
              {orderData.serviceMetrics.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm py-1.5"
                >
                  <span className="font-medium text-base md:text-lg">
                    {item.label}:
                  </span>
                  <span className="font-normal text-sm md:text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Status */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              Payment & Status Section
            </h3>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="font-medium text-base md:text-lg">
                Service Order Payment Status:
              </span>
              <span className="font-normal text-sm md:text-base">
                {orderData.paymentStatus}
              </span>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pt-2 border-t border-gray-300">
              Notes & Confirmation
            </h3>
            <div className="space-y-2">
              {Object.entries(orderData.notes).map(([key, value], idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm py-1.5"
                >
                  <span className="font-medium text-base md:text-lg">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-normal text-sm md:text-base">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10">
          {/* Images */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pb-2">
              Images
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 pb-2">
              Videos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {videos.map((video, idx) => (
                <VideoCard key={idx} src={video} />
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="mb-6 bg-[#F0FFF1] rounded-lg p-6 mt-10 shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              Customer Feedback
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Your review helps other customers and our operators.
            </p>

            {/* Rating */}
            <div className="mb-6">
              <p className="text-xl font-medium text-gray-900 mb-2">
                Rate Your Drone Operator
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={34}
                    className={`cursor-pointer transition-colors duration-200 ${star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                      }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <label
                htmlFor="tips"
                className="block text-base font-medium text-gray-900 mb-2"
              >
                Tips
              </label>
              <input
                id="tips"
                type="text"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 bg-white"
              />
            </div>

            {/* Review */}
            <div>
              <label
                htmlFor="review"
                className="block text-base font-medium text-gray-900 mb-2"
              >
                Review
              </label>
              <textarea
                id="review"
                placeholder="Write here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="4"
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 bg-white resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
