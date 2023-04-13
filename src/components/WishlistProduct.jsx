import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userContext } from '../context/userContext';
import { productsContext } from '../context/productsContext';
import { removeItemFromWishlist } from '../services/firestore';
import '../scss/WishlistProduct.scss';

const WishlistProduct = ({ product }) => {
  const { userData, removeFromWishlist } = useContext(userContext);
  const { addToCart } = useContext(productsContext);

  const handleRemove = () => {
    const notification = toast.loading('Removing...');
    removeItemFromWishlist(userData.uid, product)
      .then(() => removeFromWishlist(product.id))
      .then(() => toast.update(notification, { render: 'Product removed from wishlist', type: 'success', autoClose: 3000, isLoading: false }));
  };

  const handleAddToCart = () => {
    const itemToAdd = { ...product, selectedSize: '' };
    addToCart(itemToAdd);
    toast.success('Product added to bag');
  };

  return (
    <div className="wishlist-product">
      <img src={product.image} alt="" />
      <h6>{product.title}</h6>
      <p>$ {product.price.toFixed(2)}</p>
      <div className="wishlist-buttons">
        <button onClick={handleRemove}>
          <span className="material-symbols-outlined">heart_minus</span>
        </button>
        <button onClick={handleAddToCart}>
          <span className="material-symbols-outlined">shopping_bag</span>
        </button>
      </div>
    </div>
  );
};
export default WishlistProduct;