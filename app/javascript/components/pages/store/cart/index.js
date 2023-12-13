import Items from "./items";
import ShippingRate from "./shipping/rate";
import ShippingRecipient from "./shipping/recipient";

export default function Cart() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Items />
          <ShippingRecipient />
          <ShippingRate />
        </div>
      </div>
    </div>
  );
}
