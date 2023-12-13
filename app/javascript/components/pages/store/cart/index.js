import Items from "./items";
import Shipping from "./shipping";

export default function Cart() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Items />
          <Shipping />
        </div>
      </div>
    </div>
  );
}
