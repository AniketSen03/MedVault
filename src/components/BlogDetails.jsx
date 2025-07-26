import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const posts = [
    {
        id: 1,
        title: "AI-Powered Cancer Drug Enters Human Trials",
        source: "Science Today",
        image: "/blog1.avif",
        body: `In a landmark moment for precision oncology, researchers have announced the launch of human clinical trials for a cancer drug developed entirely using artificial intelligence. The drug, created by Isomorphic Labs—a subsidiary of Alphabet—was designed using AlphaFold 3, an advanced AI tool capable of predicting complex protein structures and molecular interactions.
The development process, which traditionally takes years, was accelerated dramatically by machine learning algorithms that analyzed millions of molecular combinations to identify a compound targeting aggressive tumor pathways. The drug has shown promising results in preclinical models, particularly for breast and lung cancers that are resistant to conventional therapies.
The Phase I trial will assess safety, dosage, and efficacy across multiple stages, with results expected by mid-2026. If successful, this could become the first AI-designed cancer therapy to reach the market, potentially transforming how drugs are discovered and personalized for patients.
Experts believe this breakthrough could pave the way for faster, more cost-effective treatments with fewer side effects. The project has already attracted over $600 million in funding and partnerships with pharmaceutical giants like Novartis and Eli Lilly. As AI continues to reshape the biotech landscape, this trial marks a pivotal step toward integrating intelligent systems into mainstream medicine.`
    },
    {
        id: 2,
        title: "India Launches First Agentic AI Health Research Centre",
        source: "The Times of Health",
        image: "/blog2.webp",
        body: `India has taken a bold leap into the future of healthcare by launching its first Agentic AI Health Research Centre, a joint initiative between Agilisium and the Sri Ramachandra Institute of Higher Education and Research (SRIHER). The center is designed to harness the power of autonomous AI agents to revolutionize diagnostics, treatment planning, and public health infrastructure.
The facility will serve as a collaborative hub for precision medicine, digital diagnostics, and clinical research. Agilisium will contribute its expertise in data science, biostatistics, and generative AI, while SRIHER will provide access to clinical data, medical facilities, and domain experts.
Key focus areas include AI-powered clinical trials, predictive diagnostics, and personalized medicine. The center will also incubate digital twins for individualized treatment simulations, AI-enabled hospital infrastructure, and disease surveillance systems.
A Clean Health Data Initiative is underway to standardize and cleanse medical datasets, ensuring compliance with global standards. Additionally, the center will pilot AI-powered chatbots and GenAI virtual assistants to support clinicians and patients with real-time diagnostics and remote monitoring.
An academic certification program on Generative AI in Healthcare is also being launched, aimed at training the next generation of AI-native medical professionals. Officials say this initiative marks a turning point in India's digital health strategy, positioning the country as a global leader in AI-driven healthcare innovation.`
    },
    {
        id: 3,
        title: "New mRNA Vaccine Shows Promise Against Cancer",
        source: "Medical Frontier",
        image: "/blog3.webp",
        body: `In a major breakthrough in cancer immunotherapy, scientists at the University of Florida have developed a new mRNA-based vaccine that activates the immune system to attack tumors. Unlike traditional treatments that target specific cancer proteins, this vaccine stimulates a broad immune response, mimicking the way the body fights viral infections.
The vaccine works by encoding tumor-specific antigens into messenger RNA, which is delivered into the body using lipid nanoparticles—similar to the technology used in COVID-19 vaccines. Once inside, the mRNA instructs cells to produce proteins that alert the immune system to the presence of cancer cells.
In early trials, the vaccine was paired with immune checkpoint inhibitors, resulting in significant tumor shrinkage in patients with melanoma and pancreatic cancer. The treatment also boosted immune markers and increased the visibility of tumors to immune cells by elevating PD-L1 expression.
Researchers believe this approach could lead to a universal cancer vaccine, capable of sensitizing the immune system against a wide range of tumors without needing to customize the formulation for each patient. The vaccine has shown promise even in drug-resistant cancers and may eventually replace or complement chemotherapy, radiation, and surgery.
The team is now preparing for expanded human trials and hopes to bring the vaccine to market within the next few years. If successful, this could usher in a new era of safe, targeted, and highly effective cancer treatments powered by mRNA technology.`
    }
];

const BlogDetails = () => {
    useEffect(() => {
        document.title = "News & Updates - MedVault";
    }, []);
    const { id } = useParams();
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
        return (
            <div className="p-6 max-w-3xl mx-auto text-center text-blue-500">
                <h2 className="text-xl font-semibold">Post not found</h2>
            </div>
        );
    }

    return (
        <article className="px-4 sm:px-6 md:px-8 py-12 max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-2">
                    {post.title}
                </h1>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {post.source}
                </span>
            </div>
            <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow mb-8"
            />
            <div className="space-y-4 text-[17px] text-gray-700 leading-relaxed whitespace-pre-line">
                {post.body}
            </div>
        </article>
    );
};

export default BlogDetails;
