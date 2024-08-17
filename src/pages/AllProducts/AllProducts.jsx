import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";


const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    console.log(search);
    useEffect(() => {
        fetch(`http://localhost:5000/allProducts?sort=${sort}&search=${search}`)
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
                setTotalPages(totalPages)
            })
    }, [page, search, sort, totalPages])
    const handleSearch = e => {
        e.preventDefault()
        const searchText = e.target.search.value
        setSearch(searchText)
    }
    return (
        <div className="max-w-6xl mx-auto my-20">
            <div className="flex gap-6">
                {/* <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." /> */}
                <form onSubmit={handleSearch}>
                    <div className="border-2 border-red-700 rounded-lg py-2 px-4" >
                        <input type="text" name='search' className="outline-none" />
                        <input type="submit" value="search" className="" />
                    </div>
                </form>
                {/* sort */}
                <select
                    className="border-2 border-red-700 py-2 px-4"
                    value={sort} onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="dateDesc">Newest First</option>
                </select>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 p-2">
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
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <span>{page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default AllProducts;