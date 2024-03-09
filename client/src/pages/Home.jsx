import styles from "../index";
import Herocar from "../Assets/homepage_car_copy.jpeg";

function Home() {
  return (
    <>
      {/* This is div is the container for the dot background */}
      <div className="relative h-full w-full bg-white min-h-[70vh]">
        <div
          className={`px-28 absolute top-0   z-10 w-full   justify-between items-center flex flex-col sm:flex-row mt-[100px] gap-10`}
        >
          <div className="">
            <p className={`py-2 ${styles.paragraph}`}>Plan your trip now</p>
            <h1 className={`${styles.heading2} font-bold text-[58px] mb-6`}>
              Save <span className="text-green-600">big</span> with our <br />
              car rental
            </h1>
            <p className={`${styles.paragraph}`}>
              Rent the car of your dreams. Unbeatable prices, unlimited miles,
              flexible pick-up options and much more.
            </p>
            <div className="mt-[40px] flex gap-3">
              <button className="bg-green-500 py-3 px-5 text-black">
                Book Ride <span className="ml-2"><i className="bi bi-check-circle-fill"></i></span>
              </button>
              <button className="bg-black py-3 px-5 text-white">
                Learn More <span><i className="bi bi-chevron-right"></i></span>
              </button>
            </div>
          </div>
          <div className="object-contain ">
            <img src={Herocar} alt="" />
          </div>
        </div>
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
    </>
  );
}

export default Home;
