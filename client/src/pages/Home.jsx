import styles from "../index";
import Herocar from "../Assets/homepage_car_copy.jpeg";

function Home() {
  return (
    <>
      {/* This is div is the container for the dot background */}
      <div className="relative h-full w-full bg-white min-h-[70vh]">
        <div
          className={`${styles.paddingX} absolute top-0   z-10 w-full   justify-between items-center flex flex-col sm:flex-row mt-[100px] gap-10`}
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
                Book Ride <span>^</span>
              </button>
              <button className="bg-black py-3 px-5 text-white">
                Learn More <span>^</span>
              </button>
            </div>
          </div>
          <div className="object-cover ">
            <img src={Herocar} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
