const introduction = "The Ultrasound G.E.L. podcast appreciates the opportunity to highlight businesses that align with its goal of improving patient care through medical education and research. We are one of the top ultrasound podcasts targeted at physicians and other clinical sonographers and is available through all major podcatcher outlets. Each podcast is downloaded 1 to 2,000 times, most of which comes from the first week of publication. As none of the podcast employees are full-time podcasters, the podcast is not dependent upon advertisement support to function. As such, we are selective about which companies we allow to advertise, ensuring that we can genuinely partner with the business. Podcasts are released approximately every 2-4 weeks year round.";
const philosophy = "We aim to provide high-quality information and engaging advertisements catered to the content you want to deliver. This is a relatively short-length podcast (< 20 minutes) so we try to maintain smooth transitions. For this reason, we do not offer mid-roll podcasts. In addition, we try to avoid specific personal endorsements of products, preferring to report the facts and highlights in accordance with your needs. The advertisements will be seamlessly edited into the podcast by our audio engineers. In the event that we are discussing a funded research article on the podcast, we would prefer not to have that specific episode supported by that same company to avoid potential bias in our review.";
const pricing = "Pricing is based on the projected number of downloads from our recent monthly averages. You will find that our podcast pricing is higher than the general market standard. That is because due to our hyper-niche content, we offer a very focused audience who will hopefully be interested in your product. We offer two options for ads. “Scripted” means that you would provide an advertisement that would be read verbatim by one of the hosts. “Host-written” means that you would provide information and the host would author a unique advertisement that they would send back for approval prior to recording.";

export default function Ads() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Podcast Advertising Information</h2>
          <p>{introduction} Find out more about our podcast at <a href="/about">ultrasoundgel.org/about</a>.</p>
          <h3>General Advertisement Philosophy</h3>
          <p>{philosophy}</p>
          <p>{pricing}</p>
          <h3>Pricing Options (per 1 advertisement*, USD)</h3>
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between">
                <div>Pre Roll 30 seconds Scripted</div>
                <div>$400</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Pre Roll 30 seconds Host-Written</div>
                <div>$500</div>
              </div>
            </div>
          </div>
          <small>*Discount pricing available to long-term supporters ( ≥ 5 episodes)</small>
        </div>
      </div>
    </div>
  );
}
