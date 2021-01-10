import {usePage} from "lib/hooks";

export default function NotFound() {
  usePage({heading: "Not Found"});

  return (
    <div className="container-fluid">
      <p>There's no page at this URL.</p>
    </div>
  );
}
