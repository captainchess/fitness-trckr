import { useAuth } from "../auth/AuthContext";

export default function ActivityList({ activities }) {
  const { token } = useAuth();
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          {activity.name} 
          <button onClick={deleteActivity(activity.id, token)}>DELETE</button> 
        </li>
      ))}
    </ul>
  );
}
