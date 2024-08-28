const ProductCard = ({ product }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-90"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 truncate">{product.title}</h3>
                <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
                <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;