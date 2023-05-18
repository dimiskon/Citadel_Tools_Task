<template>
  <div>
    <form @submit="addTeam">
      <table class="table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.team_id">
            <router-link :to="'/teams/' + team.team_id + '/players'">{{
              team.team_name
            }}</router-link>
            <!-- <a href="/teams">{{ team.team_name }}</a> -->
            <td>
              <button class="btn btn-danger" @click="deleteTeam(team.team_id)">
                Delete
              </button>
            </td>
          </tr>
          <tr key="newTeam">
            <td><input v-model="newTeamName" /></td>
            <td>
              <button class="btn btn-primary" type="submit">Add Team</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const teams = ref([]);
const newTeamName = ref("");

onMounted(async () => {
  const { data } = await axios.get("/teams");
  console.log(data);
  teams.value = data;
});

const addTeam = async () => {
  await axios.post("/teams", { team_name: newTeamName.value });
};
const deleteTeam = async (team_id) => {
  console.log("Delete Team");
  console.log({ team_id });
  await axios.delete(`/teams/${team_id}`);
};
</script>
