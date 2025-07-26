import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import medicinePacketImages from './img';
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Products = ({ addToCart, setBuyNowItem, user }) => {
  useEffect(() => {
    document.title = "Medicines - MedVault";
  }, []);

  
  const currentUser = user || JSON.parse(localStorage.getItem("user") || "null");

  const [drugList, setDrugList] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // const [cartItems, setCartItems] = useState([]);
  // const [buyNowItems, setBuyNowItems] = useState([]);



  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await axios.get(
          "https://api.fda.gov/drug/label.json?limit=21"
        );
        setDrugList(response.data.results);
        setFilteredDrugs(response.data.results);
      } catch (err) {
        setError("Failed to fetch drug data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDrugs();
  }, []);

  useEffect(() => {
  if (!loading && filteredDrugs.length > 0) {
    const cards = gsap.utils.toArray(".medicine-card");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }
}, [loading, filteredDrugs]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = drugList.filter((drug) => {
      const brand = drug.openfda?.brand_name?.join(" ").toLowerCase() || "";
      const ingredients =
        drug.openfda?.substance_name?.join(" ").toLowerCase() || "";
      const usage =
        Array.isArray(drug.indications_and_usage)
          ? drug.indications_and_usage.join(" ").toLowerCase()
          : drug.indications_and_usage?.toLowerCase() || "";

      if (searchType === "brand") return brand.includes(value);
      if (searchType === "ingredient") return ingredients.includes(value);
      if (searchType === "disease") return usage.includes(value);

      return (
        brand.includes(value) ||
        ingredients.includes(value) ||
        usage.includes(value)
      );
    });

    setFilteredDrugs(filtered);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-blue-500">{error}</p>;

  // Determine how many cards to show
  const isHome = location.pathname === "/";
  const drugsToShow = isHome ? filteredDrugs.slice(0, 3) : filteredDrugs;

  return (
    <section id="products" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
          Medicines
        </h3>

        {!isHome && (
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <input
              type="text"
              placeholder={`Search by ${searchType}`}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-1/2 px-4 py-2 border outline-blue-200 rounded-lg shadow-sm"
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border outline-blue-200 rounded-lg shadow-sm"
            >
              <option value="all">All</option>
              <option value="brand">Brand Name</option>
              <option value="ingredient">Ingredient</option>
              <option value="disease">Disease / Usage</option>
            </select>
          </div>
        )}

        {drugsToShow.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {drugsToShow.map((drug, idx) => {
              const productImage = medicinePacketImages[idx % medicinePacketImages.length];
              return (
                <div
                  key={idx}
                  className="medicine-card bg-blue-50 rounded-xl shadow p-6 flex flex-col text-left h-full"
                >
                  <img
                    src={productImage.image}
                    alt={drug.openfda?.brand_name?.[0] || "Medicine"}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />

                  <h4 className="text-lg font-bold text-blue-700 mb-2 uppercase">
                    {drug.openfda?.brand_name?.join(", ") || "Unknown Brand"}
                  </h4>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Manufacturer:</strong>{" "}
                    {drug.openfda?.manufacturer_name?.join(", ") || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Purpose:</strong>{" "}
                    {drug.purpose ? drug.purpose.join(" ").split(" ").slice(0, 6).join(" ") + "..." : "N/A"}
                    {/* Read More Button */}
                    <Link
                      to={`/products/${idx}`}
                      state={{ drug }}
                      className="text-blue-600 hover:underline font-medium ml-1"
                    >
                      Read More
                    </Link></p>

                  <p className="text-[14px] text-gray-700 text-left font-medium mt-2">
                    <span className="text-[16px] text-black font-bold mr-2">₹{(productImage.price * 0.9).toFixed(0)}</span>
                    <span className="line-through text-[13px] text-gray-500 mr-2">₹{productImage.price}</span>
                    <span className="text-[13px] font-semibold text-blue-600 px-2 py-[1.5px] border border-blue-600 border-dashed rounded-md">
                      {Math.round(100 - 100 * 0.9)}% OFF
                    </span>
                  </p>


                  {/* Buttons at the bottom */}
                  <div className="flex items-center justify-evenly gap-2 mt-auto pt-6">




                    {/* Add to Cart */}
                    <button onClick={() => {
                      const discountedPrice = Math.round(productImage.price * 0.9);
                      addToCart({
                        name: drug.openfda?.brand_name?.join(", ") || "Unknown Brand",
                        price: discountedPrice,
                        image: productImage.image,
                        quantity: 1
                      })
                    }}

                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium shadow hover:bg-gray-900 transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
                    >
                      Add to Cart
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                        <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 
                         2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                      </svg>
                    </button>

                    {/* Buy Now */}
                    <button
                      onClick={() => {
                        if (!currentUser || !currentUser.email) {
                          alert("Please log in or sign up to continue.");
                          return;
                        }

                        const discountedPrice = Math.round(productImage.price * 0.9);

                        const item = {
                          name: drug.openfda?.brand_name?.join(", ") || "Unknown Brand",
                          price: discountedPrice,
                          image: productImage.image,
                          quantity: 1
                        };
                        setBuyNowItem(item);
                        localStorage.setItem("buyNowItem", JSON.stringify(item)); // ✅ Save in storage
                        setBuyNowItem(item); // your state
                        navigate("/buy");
                      }}

                      className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800  transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
                    >
                      Buy Now

                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                      </svg>
                    </button>

                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Explore More Medicine Button for Home Route */}
        {isHome && (
          <div className="mt-8 flex items-center justify-center">
            <Link
              to="/products"
              className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-800 transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
            >
              Explore More Medicines <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
