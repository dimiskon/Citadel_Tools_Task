<template>
  <div>
    <h1 class="mb-4" style="font-size: 3rem">Teams</h1>
    <form @submit="addTeam">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="team in teams" :key="team.team_id">
            <router-link :to="'/teams/' + team.team_id + '/players'">
              {{ team.team_name }}
            </router-link>
            <td class="text-center">
              <button
                class="btn btn-danger"
                style="width: 5rem"
                @click="deleteTeam(team.team_id)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr class="table-secondary">
            <td><input v-model="newTeamName" /></td>
            <td class="text-center">
              <button style="width: 5rem" class="btn btn-primary" type="submit">
                Add
              </button>
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
