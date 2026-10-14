import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";
import { useState } from "react";

export default function ActivityList({ activities, syncActivities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem
          key={activity.id}
          activity={activity}
          syncActivities={syncActivities}
        ></ActivityListItem>
      ))}
    </ul>
  );

  function ActivityListItem({ activity, syncActivities }) {
    const { token } = useAuth();
    const [error, setError] = useState(null);

    const tryDelete = async () => {
      setError(null);
      try {
        await deleteActivity(activity.id, token);
        syncActivities();
      } catch (e) {
        setError(e.message);
      }
    };

    if (!token) {
      return <li>{activity.name}</li>;
    }

    return (
      <li>
        <p>{activity.name}</p>
        {token && <button onClick={tryDelete}>Delete</button>}
        {error && <p role="alert">{error}</p>}
      </li>
    );
  }
}
