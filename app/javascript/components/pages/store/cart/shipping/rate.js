import {useState} from "react";
import {setShippingRate} from "app/actions/cart";
import useAppContext from "lib/hooks/use-app-context";
import useDidUpdate from "lib/hooks/use-did-update";

export default function ShippingRate() {
  const [{cart: {shipping: {rate, rates}}}, dispatch] = useAppContext();
  const [open, setOpen] = useState(!rate);

  useDidUpdate(() => { setOpen(true); }, [rates]);

  if(!rates) { return null; }
  if(!open) {
    return (
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="m-0">Shipping Rates</h2>
          <button className="btn btn-themed" onClick={() => setOpen(true)} type="button">Edit</button>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>{rate.name}</div>
          <div>${rate.rate}</div>
        </div>
      </div>
    );
  }

  const onClick = (record) => {
    dispatch(setShippingRate(record));
    setOpen(false);
  };

  return (
    <div className="mb-4">
      <h2>Shipping Rates</h2>
      {rates.map((record) => (
        <div key={record.id} className="d-flex align-items-center justify-content-between my-2">
          <div>{record.name}</div>
          <div className="d-flex align-items-center">
            <div className="mx-3">${record.rate}</div>
            <button className="btn btn-sm btn-primary" onClick={() => onClick(record)} type="button">Select</button>
          </div>
        </div>
      ))}
    </div>
  );
}
