import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function TrainingNCertification() {
  const [trainingCards, setTrainingCards] = useState([])

  useEffect(()=>{
    axios.get('/MarketingDashboard/data/marketingLandingPage.json')
    .then(res => {
      setTrainingCards(res.data.allLoyaltyPrograms)
    })
    .catch(err => {
      console.error("Error fetching training cards data:", err);
    });
  },[])


  return (
    <div className="bg-gray-50 py-6 sm:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto xl:mb-28 lg:mb-10 mb-6">
        <h1 className="lg:text-[40px] text-2xl sm:text-3xl font-medium text-center text-gray-900 mb-4 lg:mb-10">Training & Certification</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 lg:gap-5 gap-2.5">
          {trainingCards.slice(0, 3).map((card) => (
            <div
              key={card.id}
              className="rounded-lg overflow-hidden bg-[#E6F0EB]"
            >
              <div className="lg:h-[262px] h-48 w-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3
                  className="font-semibold text-xl text-gray-900 mb-3"
                  
                >
                  {card.title}
                </h3>

                <p className="text-gray-700 line-clamp-2 mb-6 text-xs lg:text-[16px]" >
                  {card.description}
                </p>

                <Link to="/trainings"
                  className="block text-center w-full bg-[#02CE13] text-white font-semibold py-3 text-sm lg:text-lg px-6 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:w-10/12 xl:max-w-7xl mx-auto items-center gap-4">
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/2VLqZtded_0?si=DH643yI3bCtSzoqh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

        <video controls onPause={true} src="/assets/demoVideo.mp4"></video>
      </div>
    </div>
  );
}
