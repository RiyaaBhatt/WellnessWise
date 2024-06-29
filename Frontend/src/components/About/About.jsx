import React from "react";

const About = () => {
  return (
    <div className="min-h-[550px] bg-gray-100 dark:bg-gray-800 dark:text-white py-12">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About WellnessWise
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 tracking-wide leading-7 max-w-3xl">
            At WellnessWise, we believe that a healthy diet is the foundation
            of a happy and fulfilling life. Our mission is to provide
            personalized diet plans that cater to your unique nutritional
            needs and lifestyle preferences. Whether you're looking to lose
            weight, gain muscle, or simply maintain a balanced diet, we have
            the right plan for you.
            <br />
            <br />
            Our team of expert nutritionists and dietitians work tirelessly to
            curate meal plans that are not only healthy but also delicious and
            easy to prepare. Join us on a journey towards a healthier you!
          </p>
          <div>
            <button className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
