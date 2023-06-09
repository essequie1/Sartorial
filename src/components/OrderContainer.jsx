import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { OrderProduct, Loading } from './componentsIndex';
import { getOrderByID } from '../services/firestore';
import { toast } from 'react-toastify';
import '../scss/OrderContainer.scss';

export const OrderContainer = () => {
  const [orderProducts, setOrderProducts] = useState([]);
  const [ETA, setETA] = useState();
  const { oid } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    getOrderByID(oid)
      .then(({ orderProducts, ETA }) => {
        setOrderProducts(orderProducts);
        setETA(new Date(ETA));
      })
      .catch(() => {
        toast.warning("The order you're looking for doesn't exist or has been deleted.");
        navigation('/');
      });
  }, [oid]);

  return (
    <div className="order-container">
      <div className="order">
        <span>
          <strong>ORDER: {oid}</strong>
          <small>
            Save this code to request order information in this{' '}
            <Link target="_blank" to={`/ordersearch`}>
              link
            </Link>
            .
          </small>
        </span>
        <span>
          <strong>ARRIVING:</strong>
          <p>{ETA?.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </span>
        <div className="order__products">
          {orderProducts.length > 0 ? orderProducts.map(product => <OrderProduct key={product.id} product={product} />) : <Loading />}
        </div>
        <div className="order__total">
          <p>TOTAL</p>
          <p>${orderProducts.reduce((acc, p) => acc + p.price * p.selectedQuantity, 0).toFixed(2)}</p>
        </div>
        <Link className="order__link" to={'/'}>
          Continue Shopping<span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};
