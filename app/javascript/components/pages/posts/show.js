import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {createNotification} from "app/actions/notifications";
import {get as getPost, subscribe, unsubscribe} from "app/requests/posts";
import {ActionText, AudioLinks, Citation} from "components/helpers";
import {Share as ShareModal} from "components/helpers/modal";
import {Loading} from "components/pages";
import useAppContext from "lib/hooks/use-app-context";
import {displayDateTime} from "lib/string";
import Comments from "./comments";

export default function PostsShow() {
  const [{user}, dispatch] = useAppContext();
  const {uid} = useParams();
  const [post, setPost] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [subscribed, setSubscribed] = useState(null);

  useEffect(() => {
    getPost(uid).then((data) => setPost(data.post));
  }, [uid]);

  useEffect(() => {
    if(!post || !user) { return; }

    setSubscribed(!!user.comment_notifications.find(({post_id: id}) => id === post.id));
  }, [post, user]);

  if(!post) { return <Loading />; }

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
        <div className="col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1>{post.title}</h1>
                {post.public_tags.length > 0 && (
                  <div className="my-2">
                    {post.public_tags.map((tag) => (
                      <a key={tag} className="badge badge-pill badge-themed m-1" href={`/?search=${tag}`}>{tag}</a>
                    ))}
                  </div>
                )}
                {post.episode && (
                  <>
                    {post.episode.author && <div>By {post.episode.author}</div>}
                    <small>Published on {displayDateTime(post.published_at) || "Unpublished"}</small>
                    <AudioLinks episode={post.episode} />
                  </>
                )}
              </div>
              <div className="custom-html">
                <ActionText.Content html={post.content} />
              </div>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-12">
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
          </div>
          <div className="card bg-light my-3 text-center">
            <div className="card-body">
              <h3>Cite this post as</h3>
              <small><Citation post={post} /></small>
            </div>
          </div>
          <div className="mb-1 row small">
            <div className="col-md-6">Published on {displayDateTime(post.published_at) || "Unpublished"}</div>
            <div className="col-md-6 text-right">
              {user ? (
                <button onClick={subscribed ? onUnsubscribe : onSubscribe} type="button">
                  {subscribed ? "unsubscribe" : "subscribe"} to comments ({post.comments.length})
                </button>
              ) : (
                `comments (${post.comments.length})`
              )}
            </div>
          </div>
          <Comments post={post} />
        </div>
      </div>
      <ShareModal show={showShare} onClose={() => setShowShare(false)} />
    </div>
  );
}
