const ProductCard = ({ product }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
            <h3 className="mt-4 font-bold text-lg">{product.title}</h3>
            <p className="text-gray-500 mt-2">${product.price}</p>
        </div>
    );
};

export default ProductCard;
