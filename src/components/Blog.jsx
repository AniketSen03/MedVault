import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    id: 1,
    title: "AI-Powered Cancer Drug Enters Human Trials",
    image: "src/assets/blog1.avif",
    body: `A groundbreaking cancer drug developed using artificial intelligence has entered human trials, marking a major milestone in precision oncology. Researchers used machine learning to identify compounds that target specific tumor pathways, dramatically accelerating the drug discovery process. The new therapy has shown promising results in preclinical models, particularly for aggressive forms of breast and lung cancer. Experts believe this could pave the way for faster, more personalized treatments with fewer side effects. The trial will evaluate safety, dosage, and efficacy across multiple stages, with results expected by mid-2026.`
  },
  {
    id: 2,
    title: "India Launches First Agentic AI Health Research Centre",
    image: "src/assets/blog2.webp",
    body: `India has inaugurated its first Agentic AI Health Research Centre in collaboration with SRIHER and Agilisium. The center aims to revolutionize healthcare by integrating artificial intelligence into diagnostics, treatment planning, and public health monitoring. Researchers will focus on chronic diseases like diabetes, cardiovascular conditions, and cancer, using AI to analyze patient data and predict outcomes. The initiative also includes training programs for medical professionals and data scientists, fostering a new generation of tech-savvy healthcare experts. Officials say this marks a turning point in India's digital health strategy.`
  },
  {
    id: 3,
    title: "New mRNA Vaccine Shows Promise Against Cancer",
    image: "src/assets/blog3.webp",
    body: `Scientists have developed a new mRNA-based vaccine that triggers strong immune responses against tumors. Unlike traditional cancer treatments, this vaccine trains the body to recognize and attack cancer cells by encoding tumor-specific antigens. In early trials, patients with melanoma and pancreatic cancer showed significant tumor shrinkage and improved immune markers. The vaccine is being tested in combination with checkpoint inhibitors to enhance its effectiveness. Researchers hope this approach will lead to a new era of immunotherapy, offering safer and more targeted options for cancer patients worldwide.`
  }
];

const Blog = () => {
   useEffect(() => {
            document.title = "Blog - MedVault";
        }, []); 
        const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Fade in entire section
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 3,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );

    // Target and animate each box with stagger
    const boxes = gsap.utils.toArray(".choose-box");
    boxes.forEach((box, i) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
     <section ref={sectionRef} id="blog" className="py-16 px-4 sm:px-6 md:px-8 bg-blue-50">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12">
        Latest News & Updates
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id} 
            className="choose-box bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-grow">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                {post.title}
              </h4>
              <Link
                to={`/blog/news/${post.id}`}
                className="mt-auto ml-3 text-blue-700 text-sm font-medium hover:underline hover:text-blue-800 transition delay-150 duration-300 ease animate-bounce"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
