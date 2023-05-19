<template>
  <div class="container">
    <div class="card" style="background-color: lightgrey">
      <h2 class="card-header" style="background-color: black">Teams</h2>
      <div class="card-body">
        <div class="card-text"></div>
        <table class="table table-bordered">
          <thead
            style="background-color: slategrey; color: white; font-size: large"
          >
            <tr>
              <th>Team Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style="background-color: white">
            <tr v-for="team in teams" data- :key="team.team_id">
              <router-link
                style="font-size: 1.5rem"
                :to="'/teams/' + team.team_id + '/players'"
              >
                {{ team.team_name }}
              </router-link>
              <td class="text-center">
                <button
                  class="btn btn-danger"
                  @click="deleteTeam(team.team_id)"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr style="background-color: lightslategray">
              <td>
                <input
                  class="form-control-sm w-75 text-center"
                  v-model="newTeamName"
                />
              </td>
              <td class="text-center">
                <button
                  :disabled="enableAddButton"
                  @click="addTeam()"
                  class="btn btn-primary"
                >
                  Add Team
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const teams = ref([]);
const newTeamName = ref("");

const enableAddButton = computed(() => {
  return !newTeamName.value;
});

const fetchTeams = async () => {
  const { data } = await axios.get("/teams");
  teams.value = data;
  // Reset newTeamName input value to empty string
  newTeamName.value = "";
};

const addTeam = async () => {
  await axios.post("/teams", { team_name: newTeamName.value });
  await fetchTeams();
};
const deleteTeam = async (team_id) => {
  await axios.delete(`/teams/${team_id}`);
  await fetchTeams();
};

onMounted(fetchTeams);
</script>
