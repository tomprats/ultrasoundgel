import {useEffect, useState} from "react";
import {setShippingRates, setShippingRecipient} from "app/actions/cart";
import {createNotification} from "app/actions/notifications";
import {getShipping} from "app/requests/store/cart";
import {getAll as getCountries} from "app/requests/store/countries";
import Loading from "components/pages/loading";
import useAppContext from "lib/hooks/use-app-context";

export default function ShippingRecipient() {
  const [{cart, user}, dispatch] = useAppContext();
  const [countries, setCountries] = useState(null);
  const [open, setOpen] = useState(!cart.shipping.rates);
  const [record, setRecord] = useState(() => (
    cart.shipping.recipient ? cart.shipping.recipient : {
      address1: "",
      address2: "",
      city: "",
      company: "",
      country_code: "",
      email: user?.email || "",
      name: user ? [user.first_name, user.last_name].join(" ") : "",
      phone: "",
      state_code: "",
      zip: ""
    }
  ));

  useEffect(() => {
    getCountries().then((data) => setCountries(data.records));
  }, []);

  if(!open) {
    return (
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="m-0">Shipping Recipient</h2>
          <button className="btn btn-themed" onClick={() => setOpen(true)} type="button">Edit</button>
        </div>
        <div>{cart.shipping.recipient.name}</div>
      </div>
    );
  }

  if(!countries) { return <Loading />; }

  const country = record.country_code && countries.find(({code}) => code === record.country_code);
  const onChange = ({target: {name, value}}) => setRecord({...record, [name]: value});
  const onCountryChange = ({target: {name, value}}) => {
    setRecord({...record, [name]: value, state_code: ""});
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const shipping = {items: cart.items, recipient: record};

    getShipping({shipping}).then((data) => {
      if(data.error) {
        return dispatch(createNotification({content: data.error, type: "danger"}));
      }

      dispatch(setShippingRates(data.records));
      dispatch(setShippingRecipient({...shipping.recipient}));
      setOpen(false);
    });
  };

  return (
    <form className="mb-4" onSubmit={onSubmit}>
      <h2>Shipping Recipient</h2>
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-name"
          name="name"
          onChange={onChange}
          placeholder="Name"
          required={true}
          type="text"
          value={record.name}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-address1"
          name="address1"
          onChange={onChange}
          placeholder="Address Line 1"
          required={true}
          type="text"
          value={record.address1}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-address2"
          name="address2"
          onChange={onChange}
          placeholder="Address Line 2"
          type="text"
          value={record.address2}
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          id="recipient-country-code"
          name="country_code"
          onChange={onCountryChange}
          value={record.country_code}
        >
          <option value="">Country</option>
          {countries.map(({code, name}) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      {country && country.states && (
        <div className="form-group">
          <select
            className="form-control"
            id="recipient-state-code"
            name="state_code"
            onChange={onChange}
            value={record.state_code}
          >
            <option value="">State</option>
            {country.states.map(({code, name}) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-zip"
          name="zip"
          onChange={onChange}
          placeholder="Zip"
          type="text"
          value={record.zip}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-company"
          name="company"
          onChange={onChange}
          placeholder="Company"
          type="text"
          value={record.company}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-email"
          name="email"
          onChange={onChange}
          placeholder="Email"
          required={true}
          type="email"
          value={record.email}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          id="recipient-phone"
          name="phone"
          onChange={onChange}
          placeholder="Phone"
          type="tel"
          value={record.phone}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary px-5">Continue</button>
      </div>
    </form>
  );
}
