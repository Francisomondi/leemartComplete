import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import summeryApi from '../common';
import VerticalSearchProduct from '../components/VerticalSearchProduct';

const ProductCategory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterCategoryList, setFilterCategoryList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [showFilters, setShowFilters] = useState(false); // Toggle for mobile filters

    const navigate = useNavigate();
    const location = useLocation();
    const searchUrl = new URLSearchParams(location.search);
    const categoryListUrlInArray = searchUrl.getAll('category');

    const categoryListObject = categoryListUrlInArray.reduce((acc, el) => {
        acc[el] = true;
        return acc;
    }, {});

    const [selectCategory, setSelectCategory] = useState(categoryListObject);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(summeryApi.filterProduct.url, {
            method: summeryApi.filterProduct.method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ category: filterCategoryList }),
        });
        const responseData = await response.json();
        setData(responseData?.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [filterCategoryList]);

    useEffect(() => {
        const arrayOfCategories = Object.keys(selectCategory)
            .filter((key) => selectCategory[key]);

        setFilterCategoryList(arrayOfCategories);
        const urlFormat = arrayOfCategories.map((el) => `category=${el}`).join('&');
        navigate('/product-category?' + urlFormat);
    }, [selectCategory]);

    const handleSelectCategory = (e) => {
        const { value, checked } = e.target;
        setSelectCategory((prev) => ({ ...prev, [value]: checked }));
    };

    const handleSortByOnChange = (e) => {
        const { value } = e.target;
        setSortBy(value);
        setData((prev) =>
            [...prev].sort((a, b) =>
                value === 'asc' ? a.sellingPrice - b.sellingPrice : b.sellingPrice - a.sellingPrice
            )
        );
    };

    return (
        <div className="container mx-auto p-4">
            {/* Mobile Filters Toggle Button */}
            <div className="lg:hidden flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-4">
                {/* Sidebar Filters (Hidden on Mobile) */}
                <div
                    className={`bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-scroll shadow-lg lg:block ${
                        showFilters ? 'block' : 'hidden'
                    }`}
                >
                    {/* Sorting */}
                    <div>
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                            Sort By
                        </h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === 'asc'}
                                    value="asc"
                                    onChange={handleSortByOnChange}
                                />
                                Price - Low to High
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="sortBy"
                                    checked={sortBy === 'dsc'}
                                    value="dsc"
                                    onChange={handleSortByOnChange}
                                />
                                Price - High to Low
                            </label>
                        </form>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
                            Category
                        </h3>
                        <form className="text-sm flex flex-col gap-2 py-2">
                            {productCategory.map((categoryName, index) => (
                                <label key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="category"
                                        checked={selectCategory[categoryName?.value]}
                                        value={categoryName?.value}
                                        onChange={handleSelectCategory}
                                    />
                                    {categoryName?.label}
                                </label>
                            ))}
                        </form>
                    </div>
                </div>

                {/* Product List */}
                <div>
                    <p className="font-medium text-slate-800 text-lg my-2">
                        Search Results: {data.length}
                    </p>
                    <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
                        {data.length !== 0 && <VerticalSearchProduct loading={loading} data={data} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;
