import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";


const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/allProducts')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
            })
    }, [])
    return (
        <div className="max-w-6xl mx-auto my-20">
           
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
                {allProducts.map((product,index) => (
                    <div
                        key={index}
                        className="card  bg-base-100 shadow-xl border py-4">
                        <figure><img src={product.productImage} className="max-h-72" alt={product.productName} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {product.productName}
                            </h2>
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                            <p><span className="font-semibold">Date: </span>{product.creationDate} <span className="font-semibold">Time: </span>{product.creationTime}</p>
                            <div className="card-actions items-center justify-end">
                                <p className="flex items-center text-xl">
                                    <FaStar className="ml-1 text-amber-400 hover:text-amber-600" ></FaStar>
                                    <FaStar className="ml-1 text-amber-400 hover:text-amber-600" ></FaStar>
                                    <FaStar className="ml-1 text-amber-400 hover:text-amber-600" ></FaStar>
                                    <FaStar className="ml-1 text-amber-400 hover:text-amber-600" ></FaStar>
                                    <FaStar className="mx-1 text-gray-500" ></FaStar>
                                    {product.rating}
                                </p>
                                <p className="text-2xl font-semibold">${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;