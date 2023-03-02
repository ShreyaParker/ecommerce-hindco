import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './components/ProductCard';
import {SearchOutlined} from "@mui/icons-material";

const ProductShop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(false);
    const lastProductRef = useRef();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`
            );
            const data = await response.json();
            if (search !== "") {
               const api= await fetch("https://api.escuelajs.co/api/v1/products")
                const apiProducts= await api.json();
                const filteredData = apiProducts.filter((product) =>
                    product.title.toLowerCase().includes(search.toLowerCase())
                );
                setProducts((prevProducts) => {
                    setFilteredProducts(true);
                    return [ ...filteredData];
                });
                setHasMore(filteredData.length > 0);
                setLoading(false);
            }else {
                setProducts((prevProducts) => {
                    console.log(data)
                    return [...prevProducts,...data];
                });
            }

            if(data.length > 0) {
                setHasMore(true);
            }

            setLoading(false);
        };
        fetchProducts();
    }, [page, search]);

    const handleScroll = () => {
        if (lastProductRef.current) {
            const { top } = lastProductRef.current.getBoundingClientRect();
            if (top < window.innerHeight) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };



    return (
        <div >
            <div className="flex justify-center p-3">
                <input type="text" value={search} onChange={handleSearch} placeholder="Search"  />
                <SearchOutlined/>
            </div>
            <div className="grid grid-rows-3  md:grid-cols-4 gap-4 ">
                {products.map((product, index) => (
                    <div className="border rounded-lg" key={index} ref={products.length === index + 1 ? lastProductRef : null}>
                        <ProductCard product={product} />
                    </div>
                ))}
                {hasMore && !filteredProducts && <h1>scroll down to load more...</h1>}
                {loading && !filteredProducts && <h1>Loading...</h1>}
            </div>
        </div>
    );
};

export default ProductShop;

