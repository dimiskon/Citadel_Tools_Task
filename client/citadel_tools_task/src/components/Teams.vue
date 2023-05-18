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
                type="button"
                class="btn btn-danger"
                @click="deleteTeam(team.team_id)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr class="table-secondary">
            <td><input v-model="newTeamName" /></td>
            <td class="text-center">
              <button
                :disabled="enableAddButton"
                class="btn btn-primary"
                type="submit"
              >
                Add Team
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
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

onMounted(async () => {
  const { data } = await axios.get("/teams");
  teams.value = data;
});

const addTeam = async () => {
  await axios.post("/teams", { team_name: newTeamName.value });
};
const deleteTeam = async (team_id) => {
  await axios.delete(`/teams/${team_id}`);
  window.location.reload();
};
</script>
