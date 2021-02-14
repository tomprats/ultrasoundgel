import PropTypes from "prop-types";
import {ActionText} from "components/helpers";
import {useContent} from "lib/hooks";

function Contact({page}) {
  const email = useContent("Contact", "Email");
  const facebook = useContent("Social", "Facebook");
  const instagram = useContent("Social", "Instagram");
  const twitter = useContent("Social", "Twitter");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center">
            <div className="custom-html mb-3">
              <ActionText.Content html={page.content} />
            </div>
            {email && (
              <p>
                <a href={`mailto:${email}`} rel="noreferrer" target="_blank">
                  <i className="fas fa-paper-plane" /> {email}
                </a>
              </p>
            )}
            {twitter && (
              <p>
                <a href={`https://twitter.com/${twitter}`} rel="noreferrer" target="_blank">
                  <i className="fab fa-twitter" /> {twitter}
                </a>
              </p>
            )}
            {facebook && (
              <p>
                <a href={`https://www.facebook.com/${facebook}`} rel="noreferrer" target="_blank">
                  <i className="fab fa-facebook" /> {facebook}
                </a>
              </p>
            )}
            {instagram && (
              <p>
                <a href={`https://instagram.com/${instagram}`} rel="noreferrer" target="_blank">
                  <i className="fab fa-instagram" /> {instagram}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Contact.propTypes = {
  page: PropTypes.shape({
    content: PropTypes.string.isRequired
  }).isRequired
};

export default Contact;
