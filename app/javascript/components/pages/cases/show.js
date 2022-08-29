import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {get as getRecord, subscribe, unsubscribe} from "app/requests/cases";
import {ActionText} from "components/helpers";
import Comments from "components/helpers/comments";
import {Share as ShareModal} from "components/helpers/modal";
import {Loading} from "components/pages";
import useAppContext from "lib/hooks/use-app-context";
import {displayDateTime} from "lib/string";

function CasesShow({getCase}) {
  const [{user}, dispatch] = useAppContext();
  const {uid} = useParams();
  const [record, setRecord] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [subscribed, setSubscribed] = useState(null);

  useEffect(() => {
    getCase(uid).then((data) => setRecord({...data.case, type: "Case"}));
  }, [uid]);

  useEffect(() => {
    if(!record || !user) { return; }

    const notification = user.comment_notifications
      .filter(({comment_notificationable_type: type}) => type === "Case")
      .find(({comment_notificationable_id: id}) => id === record.id);

    setSubscribed(!!notification);
  }, [record, user]);

  if(!record) { return <Loading />; }

  const onFacebookShare = () => {
    window.open(
      `http://www.facebook.com/sharer?u=${encodeURIComponent(window.location.href)}`,
      "Ultrasound GEL Sharer",
      "width=400, height=400"
    );
  };
  const onLinkShare = () => setShowShare(true);
  const onSubscribe = () => {
    subscribe(uid).then(({message: content, success}) => {
      dispatch(createNotification({content, type: success ? "success" : "danger"}));
      setSubscribed(success);
    });
  };
  const onTwitterShare = () => {
    window.open(
      `http://twitter.com/share?hashtags=FOAMus&url=${encodeURIComponent(window.location.href)}`,
      "Ultrasound GEL Sharer",
      "width=400, height=400"
    );
  };
  const onUnsubscribe = () => {
    unsubscribe(uid).then(({message: content, success}) => {
      dispatch(createNotification({content, type: "danger"}));
      setSubscribed(!success);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center">
            <h1>{record.title}</h1>
            {record.public_tags.length > 0 && (
              <div className="my-2">
                {record.public_tags.map((tag) => (
                  <a key={tag} className="badge badge-pill badge-themed m-1" href={`/?search=${tag}`}>{tag}</a>
                ))}
              </div>
            )}
          </div>
          <div className="custom-html">
            <ActionText.Content html={record.content} />
          </div>
          <div className="text-center">
            <button aria-label="Share on Facebook" className="btn btn-icon" onClick={onFacebookShare} title="Share on Facebook" type="button">
              <i className="fab fa-2x fa-facebook-square" />
            </button>
            <button aria-label="Share on Twitter" className="btn btn-icon" onClick={onTwitterShare} title="Share on Twitter" type="button">
              <i className="fab fa-2x fa-twitter-square" />
            </button>
            <button aria-label="Share by Link" className="btn btn-icon" onClick={onLinkShare} title="Share by Link" type="button">
              <i className="fas fa-2x fa-share-alt-square" />
            </button>
          </div>
          <div className="mb-1 row small">
            <div className="col-md-6">Published on {displayDateTime(record.published_at) || "Unpublished"}</div>
            <div className="col-md-6 text-right">
              {user ? (
                <button onClick={subscribed ? onUnsubscribe : onSubscribe} type="button">
                  {subscribed ? "unsubscribe" : "subscribe"} to comments ({record.comments.length})
                </button>
              ) : (
                `comments (${record.comments.length})`
              )}
            </div>
          </div>
          <Comments record={record} />
        </div>
      </div>
      <ShareModal show={showShare} onClose={() => setShowShare(false)} />
    </div>
  );
}

CasesShow.defaultProps = {getCase: getRecord};
CasesShow.propTypes = {
  getCase: PropTypes.func
};

export default CasesShow;
