/* eslint-disable no-unused-vars */
// Projects.jsx
import React, { useState } from 'react';
import { Card, Button } from 'flowbite-react';

const projectsData = [
  {
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    category: "Web Development",
    language: "JavaScript",
    date: "2021-02-10",
  },
  {
    title: "Data Science Project",
    description: "A comprehensive project on data analysis and machine learning.",
    category: "Data Science",
    language: "Python",
    date: "2021-05-15",
  },
  {
    title: "Mobile App Development",
    description: "Creating a cross-platform mobile application.",
    category: "Mobile Apps",
    language: "Java",
    date: "2021-08-22",
  },
  // Add more projects as needed
];

const Projects = () => {
  const [category, setCategory] = useState('All');
  const [language, setLanguage] = useState('All');
  const [date, setDate] = useState('');

  const filteredProjects = projectsData.filter((project) => {
    return (
      (category === 'All' || project.category === category) &&
      (language === 'All' || project.language === language) &&
      (!date || project.date === date)
    );
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-slate-200">
      {/* Filter Options Section */}
      <div className="w-full lg:w-1/4 bg-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Filter Options</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>All</option>
              <option>Web Development</option>
              <option>Data Science</option>
              <option>Mobile Apps</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Programming Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>All</option>
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="w-full lg:w-3/4 bg-gray-900 p-6">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="max-w-lg bg-gray-800 text-gray-200">
              <h5 className="text-2xl font-bold tracking-tight">
                {project.title}
              </h5>
              <p className="font-normal">
                {project.description}
              </p>
              <Button className="bg-indigo-600">
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
