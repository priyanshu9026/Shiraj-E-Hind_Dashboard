import { useEffect, useState } from "react";
import axios from "axios";

const TeamTable = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get("https://shiraj-e-hind-backend.onrender.com/team_members")
      .then((res) => setTeam(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Team Members</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member, index) => (
            <tr key={index}>
              <td>{member.first_name} {member.last_name}</td>
              <td>{member.role}</td>
              <td><img src={member.photoUrl} alt="member" width="50" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
