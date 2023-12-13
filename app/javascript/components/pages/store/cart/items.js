import useAppContext from "lib/hooks/use-app-context";

export default function Items() {
  const [{cart}] = useAppContext();
  const items = cart.items || {};
  const total = Object.keys(items).map((id) => items[id])
    .map((variant) => variant.quantity * +variant.retail_price)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  if(Object.keys(items).length === 0) { return null; }

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-6 text-left mb-1">
          <h2>Cart</h2>
        </div>
        <div className="col-6 text-right mb-1">
          <a className="btn btn-themed" href="/store">Edit</a>
        </div>
      </div>
      {Object.keys(items).map((id) => items[id]).map((variant) => (
        <div key={variant.id} className="d-flex justify-content-between">
          <div>{variant.name}</div>
          <div>{variant.quantity} x ${variant.retail_price}</div>
        </div>
      ))}
      <hr />
      <div className="d-flex justify-content-between">
        <div>Subtotal</div>
        <div>${total}</div>
      </div>
    </div>
  );
}
