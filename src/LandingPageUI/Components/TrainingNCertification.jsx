

export default function TrainingNCertification() {
 

  return (
    <div className="bg-gray-50 py-6 sm:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col lg:w-10/12 xl:max-w-7xl mx-auto items-center gap-4">
     {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/2VLqZtded_0?si=DH643yI3bCtSzoqh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

     <video controls onPause={true} src="/assets/demoVideo.mp4"></video>
    </div>
    </div>
  );
}
