import {useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Context} from "app";
import {createNotification, deleteNotification} from "app/actions/notifications";
import {Notification} from "components/helpers";
import {useQueryParams} from "lib/hooks";

export default function Notifications() {
  const [{notifications}, dispatch] = useContext(Context);
  const location = useLocation();
  const params = useQueryParams();

  useEffect(() => {
    const content = params.get("message");

    if(content) { dispatch(createNotification({content, type: params.get("type")})); }
  }, [params.get("message")]);

  useEffect(() => {
    const state = location.state || {};
    const {message: content, type} = state;

    if(content) { dispatch(createNotification({content, type})); }
  }, [location.state && location.state.message]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      const now = Date.now();

      notifications
        .filter(({createdAt}) => now - createdAt >= 5000)
        .map(({id}) => dispatch(deleteNotification({id})));
    }, 1000);

    return () => clearInterval(intervalID);
  }, [notifications]);

  return (
    <div className="notifications">
      {notifications.map(({content, id, type}) => (
        <Notification
          key={id}
          content={content}
          onClose={() => dispatch(deleteNotification({id}))}
          type={type}
        />
      ))}
    </div>
  );
}
