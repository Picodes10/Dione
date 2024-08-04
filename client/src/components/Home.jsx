/* eslint-disable no-unused-vars */
import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
        <div className="text-center">
          <h1 className="text-8xl font-bold tracking-tight text-slate-200 sm:text-7xl">
            Unite. Collaborate. Innovate.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            A global open-source collaboration platform offering diverse
            projects and seamless tools for developers. Join to innovate,
            contribute, and grow in the open-source community.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
