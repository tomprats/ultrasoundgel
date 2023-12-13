import {useEffect, useState} from "react";
import {setItems} from "app/actions/cart";
import {createNotification} from "app/actions/notifications";
import {getAll} from "app/requests/store/products";
import Loading from "components/pages/loading";
import useAppContext from "lib/hooks/use-app-context";

export default function Store() {
  const [{cart}, dispatch] = useAppContext();
  const [records, setRecords] = useState(null);
  const items = cart.items || {};

  useEffect(() => {
    getAll().then((data) => setRecords(data.records));
  }, []);

  if(!records) { return <Loading />; }

  const modifyCart = (variant, change) => {
    const updatedItems = {...items};
    if(!updatedItems[variant.id]) { updatedItems[variant.id] = {...variant, quantity: 0}; }
    updatedItems[variant.id].quantity += change;
    if(updatedItems[variant.id].quantity <= 0) { delete updatedItems[variant.id]; }

    dispatch(setItems(updatedItems));
  };
  const removeFromCart = (variant) => {
    const updatedItems = {...items};
    delete updatedItems[variant.id];

    dispatch(createNotification({content: `${variant.name} removed from cart`, type: "danger"}));
    dispatch(setItems(updatedItems));
  };
  const addToCart = (variant) => {
    dispatch(createNotification({content: `${variant.name} added to cart`, type: "success"}));
    modifyCart(variant, 1);
  };
  const total = Object.keys(items).map((id) => items[id])
    .map((variant) => variant.quantity * +variant.retail_price)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  return (
    <div className="container-fluid">
      {Object.keys(items).length > 0 && (
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2 className="text-center">Store</h2>
            {Object.keys(items).map((id) => items[id]).map((variant) => (
              <div key={variant.id} className="d-flex justify-content-between">
                <div className="d-flex">
                  <div>{variant.name}</div>
                  <button className="mx-2" onClick={() => removeFromCart(variant)} type="button">
                    <i className="fas fa-times" />
                  </button>
                </div>
                <div className="d-flex">
                  <button className="mr-2" onClick={() => modifyCart(variant, -1)} type="button">
                    <i className="fas fa-minus" />
                  </button>
                  <button className="mr-2" onClick={() => modifyCart(variant, 1)} type="button">
                    <i className="fas fa-plus" />
                  </button>
                  <div>{variant.quantity} x ${variant.retail_price}</div>
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <div>Subtotal</div>
              <div>${total}</div>
            </div>
            <div className="text-center">
              <a className="btn btn-themed" href="/store/cart">Continue</a>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        {records.map((record) => (
          <div key={record.id} className="col-md-4 p-4">
            <img alt={record.name} className="img-fluid" src={record.thumbnail_url} />
            <h4 className="mt-2 p-0 text-center">{record.name}</h4>
            {record.variants.map((variant) => (
              <div key={variant.id} className="d-flex justify-content-between">
                <div>{variant.name}</div>
                <div className="d-flex">
                  <div>${variant.retail_price}</div>
                  <button className="ml-2" onClick={() => addToCart(variant)} type="button">
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
