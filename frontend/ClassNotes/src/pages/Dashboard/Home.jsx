import React from "react";
import Navbar from "../../components/Navbar";
import { Link as RouterLink } from "react-router-dom";

// const colleges = [
//   {
//     name: "IIT Bombay",
//     logo: "https://upload.wikimedia.org/wikipedia/en/1/12/IIT_Bombay_Logo.svg",
//     url: "https://www.iitb.ac.in/",
//   },
//   {
//     name: "IIT Delhi",
//     logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/IIT_Delhi_Logo.svg",
//     url: "https://home.iitd.ac.in/",
//   },
//   {
//     name: "IIT Madras",
//     logo: "https://upload.wikimedia.org/wikipedia/en/2/2e/IIT_Madras_Logo.svg",
//     url: "https://www.iitm.ac.in/",
//   },
//   {
//     name: "IIT Kanpur",
//     logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/IIT_Kanpur_Logo.svg",
//     url: "https://www.iitk.ac.in/",
//   },
//   {
//     name: "IIT Kharagpur",
//     logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/IIT_Kharagpur_Logo.svg",
//     url: "https://www.iitkgp.ac.in/",
//   },
// ];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="text-center py-24 px-6">
        <h1 className="text-6xl md:text-7xl font-serif font-bold mb-12">
          Share notes, effortlessly.
        </h1>
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl hover:scale-105 transition-all duration-300 transform-gpu">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Notes Dashboard Preview"
            className="w-full transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Trusted Colleges */}
      {/* <section className="py-16 px-6 text-center">
        <p className="text-gray-500 text-sm mb-8">Trusted by students from:</p>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {colleges.map((college, index) => (
            <a
              key={index}
              href={college.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img
                src={college.logo}
                alt={college.name}
                className="h-10 object-contain bg-white p-1 rounded shadow"
              />
            </a>
          ))}
        </div>
      </section> */}

      {/* Benefits */}
      <section id="benefits" className="py-24 px-6 border-t border-gray-100">
        <p className="text-green-800 font-mono text-sm mb-2">Benefits</p>
        <h2 className="text-4xl font-serif font-semibold mb-4">
          We’ve cracked the code.
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          ClassNote brings simplicity to knowledge sharing. No ads, no distractions — just real-time notes shared across colleges.
        </p>
      </section>

      {/* Footer CTA */}
      <footer id="contact" className="py-16 px-6 text-center bg-gray-50">
        <h3 className="text-2xl font-serif font-medium mb-4">
          Start sharing your notes now
        </h3>
        <p className="text-gray-600 mb-6">
          Connect with your peers and never miss another lecture note.
        </p>
        <RouterLink
          to="/login"
          className="inline-block bg-green-900 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-green-800 transition"
        >
          Get Started ↗
        </RouterLink>
      </footer>
    </div>
  );
}
