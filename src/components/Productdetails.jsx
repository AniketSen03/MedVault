// src/components/Productdetails.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import medicinePacketImages from './img';

const Productdetails = ({ addToCart, setBuyNowItem, user }) => {
    useEffect(() => {
        document.title = "Medicines - MedVault";
    }, []);
    const currentUser = user || JSON.parse(localStorage.getItem("user") || "null");

    const { id } = useParams();
    const location = useLocation();
    const drug = location.state?.drug;
    const productData = medicinePacketImages[parseInt(id) % medicinePacketImages.length];
    const navigate = useNavigate();

    if (!drug)
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-center text-gray-500 text-lg">
                    No data found for this medicine.
                </p>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col-reverse md:flex-row gap-8 items-center md:items-start">
                {/* Details Section */}
                <div className="flex-1 w-full md:w-auto">
                    <h2 className="text-3xl font-bold text-blue-700 mb-2 text-center md:text-left">
                        {drug.openfda?.brand_name?.join(', ') || 'Unknown Brand'}
                    </h2>
                    <p className="text-lg text-gray-700 mb-4 text-center md:text-left">
                        <span className="font-semibold">Generic Name:</span>{' '}
                        {drug.openfda?.generic_name?.join(', ') || 'N/A'}
                    </p>
                    <div className="mb-4 text-center md:text-left">
                        <span className="font-semibold">Manufacturer:</span>{' '}
                        {drug.openfda?.manufacturer_name?.join(', ') || 'N/A'}
                    </div>
                    <div className="mb-4 text-center md:text-left">
                        <span className="font-semibold">Purpose:</span>{' '}
                        {drug.purpose?.join(', ') || 'N/A'}
                    </div>
                    <div className="mb-4 text-center md:text-left">
                        <span className="font-semibold">Usage:</span>{' '}
                        {Array.isArray(drug.indications_and_usage)
                            ? drug.indications_and_usage.join(' ')
                            : drug.indications_and_usage || 'N/A'}
                    </div>
                    <div className="mb-4 text-center md:text-left">
                        <span className="font-semibold">Warnings:</span>{' '}
                        {Array.isArray(drug.warnings)
                            ? drug.warnings.join(' ')
                            : drug.warnings || 'N/A'}
                    </div>
                    <div className="mb-4 text-center md:text-left">
                        <span className="font-semibold">Dosage & Administration:</span>{' '}
                        {Array.isArray(drug.dosage_and_administration)
                            ? drug.dosage_and_administration.join(' ')
                            : drug.dosage_and_administration || 'N/A'}
                    </div>

                </div>
                {/* Image Section */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-1/3 w-full mb-6 md:mb-0">
                    <img
                        src={productData.image}
                        alt="Medicine"
                        className="rounded-lg w-64 h-64 object-cover border"
                    />

                    {/* Show Price */}
                    <p className="mt-4 text-lg font-semibold text-gray-700 text-center">
                        <span className="text-black font-bold mr-2">₹{(productData.price * 0.9).toFixed(0)}</span>
                        <span className="line-through text-gray-500">₹{productData.price}</span>
                        <span className="ml-2 px-2 py-1 text-sm text-blue-600 border border-blue-600 border-dashed rounded">
                            {Math.round(100 - 100 * 0.9)}% Off
                        </span>
                    </p>



                    <div className="flex justify-center md:justify-start">
                        <button className="mt-6 px-[4.5rem] py-2 text-white bg-gray-800 rounded hover:bg-gray-900 flex items-center  transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
                            onClick={() => {
                                const discountedPrice = Math.round(productData.price * 0.9);
                                addToCart({
                                    name: drug.openfda?.brand_name?.join(", ") || "Unknown",
                                    price: discountedPrice,
                                    image: productData.image,
                                    quantity: 1
                                });
                            }}
                        >
                            Add to Cart <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus-fill inline ml-2" viewBox="0 0 16 16">
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <button className="mt-6 px-[5rem] py-2 bg-blue-700 text-white rounded hover:bg-blue-800 flex items-center  transition hover:scale-105 delay-150 duration-300 ease-in-out hover:shadow-lg"
                            onClick={() => {
                                if (!currentUser || !currentUser.email) {
                                    alert("Please log in or sign up to continue.");
                                    return;
                                }
                                const discountedPrice = Math.round(productData.price * 0.9);

                                setBuyNowItem({
                                    name: drug.openfda?.brand_name?.join(", ") || "Unknown",
                                    price: discountedPrice,
                                    image: productData.image,
                                    quantity: 1
                                });
                                navigate("/buy");
                            }}
                        >
                            Buy Now <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-heart-fill inline ml-2" viewBox="0 0 16 16">
                                <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Description Section */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center md:text-left">Description</h3>
                <p className="text-gray-700 text-center md:text-left">
                    {Array.isArray(drug.description)
                        ? drug.description.join(' ')
                        : drug.description || 'No description available.'}
                </p>
            </div>
        </div>
    );
};

export default Productdetails;
