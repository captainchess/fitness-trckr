import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  /*const tryDelete = async (id) => {
    try {
      await deleteActivity({id}, token);
    } catch (e) {
      setError(e.message);
    }
  };*/

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity}>
        </ActivityListItem>
      ))}
    </ul>
  );

  function ActivityListItem({ activity, syncActivities}) {
    const tryDelete = async (id) => {
      try {
        await deleteActivity({id}, token);
      } catch (e) {
        setError(e.message);
      }
    };

    return (
      <>
        <li>
          {activity.name}
          <button onClick={()=> tryDelete(activity.id)}>DELETE</button>
          {error && <p role="alert">{error}</p>}
        </li>
      </>
    );
  }
}
