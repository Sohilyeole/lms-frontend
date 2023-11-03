import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";
import celebrity from "../helper/CelebrityData"

function AboutUs() {
   
  return (
    <HomeLayout>
      <div className=" pl-20 pt-20 flex flex-col text-white">
        <div className="flex itemz-center gap-5 mx-10 h-[75vh]">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affortable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affortable and quality education to the
              world. We are providing the platform for the aspring teachers and
              students to share their skills,creativity and knowlege to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/2">
            <img
              src="src\Assets\Images\aboutMainImage.png"
              className="drop-shadow-2xl "
              id="text1"
              
            />
          </div>
        </div>
        <div className="carousel w-1/2  m-auto my-16 ">
            {/*bellow code can run but we can transfer same code theough component called carouselslide also this code taking from desyiui carousel isteeed of writing component 5 times we can create arrray in helpers and apply map on it*/}
           
            {/* <div id="slide1" className="carousel-item relative w-full">
                <div className ="flex flex-col items-center justify-center gap-4 px-[15%]">
                    <img src="src\Assets\Images\QuotesPersonalityImage\apj.png" className="w-40 rounded-full border-2 border-gray-400" />
                    <p className="text-xl text-gray-200">
                        {"If you want to shine like a sun, first burn like a sun."}
                        
                    </p>
                    <h3 className="text-2xl font-semibold ">APJ Abdul Kalam</h3>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide5" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> 
            <div id="slide2" className="carousel-item relative w-full">
                <div className ="flex flex-col items-center justify-center gap-4 px-[15%]">
                    <img src="src\Assets\Images\QuotesPersonalityImage\steveJobs.png" className="w-40 rounded-full border-2 border-gray-400" />
                    <p className="text-xl text-gray-200">
                        {"Your time is limited, so don't waste it living someone else's life."}
                        
                    </p>
                    <h3 className="text-2xl font-semibold ">Steev Jobs</h3>
                    <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> 
            <div id="slide3" className="carousel-item relative w-full">
                <div className ="flex flex-col items-center justify-center gap-4 px-[15%]">
                    <img src="src\Assets\Images\QuotesPersonalityImage\nelsonMandela.png" className="w-40 rounded-full border-2 border-gray-400" />
                    <p className="text-xl text-gray-200">
                        {"Education is the most powerful tool you can use to change the world"}
                        
                    </p>
                    <h3 className="text-2xl font-semibold ">Nelson Mandela</h3>
                    <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> 
            <div id="slide4" className="carousel-item relative w-full">
                <div className ="flex flex-col items-center justify-center gap-4 px-[15%]">
                    <img src="src\Assets\Images\QuotesPersonalityImage\einstein.png" className="w-40 rounded-full border-2 border-gray-400" />
                    <p className="text-xl text-gray-200">
                        {"A person who never made a mistake never tried anything new."}
                        
                    </p>
                    <h3 className="text-2xl font-semibold ">Albert Einstein</h3>
                    <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide5" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div id="slide5" className="carousel-item relative w-full">
                <div className ="flex flex-col items-center justify-center gap-4 px-[15%]">
                    <img src="src\Assets\Images\QuotesPersonalityImage\billGates.png" className="w-40 rounded-full border-2 border-gray-400" />
                    <p className="text-xl text-gray-200">
                        {"The belief that the world is getting worse, that we can't solve extreme poverty and disease, isn't just mistaken."}
                        
                    </p>
                    <h3 className="text-2xl font-semibold ">Bill Gates</h3>
                    <div className="absolute   flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> */}
            {celebrity&& celebrity.map((e)=><CarouselSlide {...e} key={e.slideNumber} totalSlide={celebrity.length} />)}

        </div>
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
