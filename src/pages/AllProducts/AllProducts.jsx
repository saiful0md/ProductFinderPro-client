import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import './allProducts.css';

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const searchRef= useRef(null)
    // eslint-disable-next-line no-unused-vars
    const [itemPerPage, setItemPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(0)
    const { count } = useLoaderData()
    const numberOfPages = Math.ceil(count / itemPerPage)
    const pages = [...Array(numberOfPages).keys()]


    useEffect(() => {
        fetch(`https://product-finder-pro-server.vercel.app/allProducts?sort=${sort}&search=${search}&category=${category}&page=${currentPage}&size=${itemPerPage}`)
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
            })
    }, [category, currentPage, itemPerPage, search, sort])

    const handleSearch = e => {
        e.preventDefault()
        const searchText = e.target.search.value
        setSearch(searchText)   
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleReset = () => {
        setSearch('')
        setCategory('')
        setSort('')
        searchRef.current.value = '';
    }
    return (
        <div className="max-w-6xl mx-auto my-20 p-2">
            <div className="flex flex-col md:flex-row gap-6 mb-10 justify-between">
                <form onSubmit={handleSearch}>
                    <div className="border-2 border-amber-500 rounded-lg py-2 px-4" >
                        <input type="text" ref={searchRef} name='search' placeholder="Find best product" className="outline-none" />
                        <input type="submit" value="search" className=" btn btn-sm" />
                    </div>
                </form>
                <select
                    className="border-2 border-amber-500 py-2 px-4"
                    value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {
                        allProducts.map(productCategory => <option key={productCategory._id} value={productCategory.category}>{productCategory.category}</option>)
                    }
                </select>
                {/* sort */}
                <select
                    className="border-2 border-amber-500 py-2 px-4"
                    value={sort} onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateDesc">Newest First</option>
                </select>
                {/* resetbutton */}
                <button onClick={(handleReset)} className="btn bg-amber-500 text-white">Reset all</button>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 ">
                {allProducts.map((product, index) => (
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
            <div className="pagination mt-10 text-center">
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map((page) => <button
                        className={currentPage === page ? 'selected' : ''}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >
                        {page + 1}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default AllProducts;