"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

import { Link } from "react-router-dom";

export const products = [
  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },

  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
  {
    title: "",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },

  
];

export const HeroParallax = () => {
  const firstRow = products.slice(0, 1);
  const secondRow = products.slice(1, 2);
  const thirdRow = products.slice(2, 3);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, .4], [1000, 200]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0.7, 1], [250, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.150], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.350], [20, 0]),
    springConfig
  );
  const rotateZM = useSpring(
    useTransform(scrollYProgress, [0.7, 1], [0, -20]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <>
      <div
        ref={ref}
        className="h-full py-40 overflow-hidden mb-[200px]  antialiased relative flex flex-col self-auto [perspective:1000px]  [transform-style:preserve-3d] "
      >
        <Header />
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
          className=""
        >
          <motion.div className="flex flex-row-reverse  mb-[200px] ">
            {firstRow.map((product,index) => (
              <div key={index} className="flex bg-gradient-to-br from-green-400 to-slate-900 max-w-[1300px] rounded-lg py-[100px] px-[100px] mx-auto  ">
                <div>
                  <h1 className="w-[400px] text-4xl    p-4 text-center  from-white via-gray-50 to-black-700 bg-gradient-to-bl bg-clip-text text-transparent font-bold capitalize  ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Adipisci odit accusantium saepe iure eligendi, nihil
                    perferendis reprehenderit dolore distinctio quaerat
                  </h1>
                </div>

                <div>
                  <ProductCard
                    product={product}
                    translate={translateX}
                
                  />
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div className="flex flex-row-reverse  mb-[200px]  "  style={{ rotateZ: rotateZM }}>
            {secondRow.map((product,index) => (
                
              <div key={index}  className="flex flex-row justify-center items-center p-[100px] bg-gradient-to-br from-green-400 to-slate-900 max-w-[1300px] rounded-lg py-[100px] px-[100px] mx-auto ">
                <div>
                  <ProductCard
                    product={product}
                    translate={translateXReverse}
                    
                  />
                </div>
                <div className="pr-10">
                  <h1 className="w-[400px] text-4xl    p-4 mr-[200px] text-center  from-white via-gray-50 to-black-700 bg-gradient-to-bl bg-clip-text text-transparent font-bold capitalize  ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Adipisci odit accusantium saepe iure eligendi, nihil
                    perferendis reprehenderit dolore distinctio quaerat
                  </h1>
                </div>
              </div>
       
            ))}
          </motion.div>
          <motion.div className="flex h-[600px] flex-row-reverse space-x-reverse space-x-20">
           
          </motion.div>
        </motion.div>
      </div>
     
    </>
  );
};

export const Header = () => {
  return (
    <div className="flex justify-between items-center max-w-7xl relative mx-auto py-20 z-20 md:py-40 px-4 w-full bg-transparent  left-0 top-0">
        <div>
      <h1 className="text-2xl md:text-7xl font-bold dark:text-black bg-transparent">
        The Ultimate <br /> Car rental For You
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-slate-800">
        We provide beautiful products with clean and trust We are a team of
        skilled and experienced professionals who are passionate about our work.
      </p>
      </div>
     
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96  w-[100vh] relative flex-shrink-0"
    >
      <Link to={product.link} className="block group-hover/product:shadow-2xl ">
        <div className="m-10">
          <img
            src={product.thumbnail}
            height="600"
            width="600"
            className="object-contain object-left-top absolute h-full w-full inset-0"
            alt={product.title}
          />
        </div>
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
