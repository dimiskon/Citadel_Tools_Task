<template>
  <div>
    <form @submit.prevent="addTeam">
      <table class="table">
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teams" :key="team.id">
            <td>{{ team.name }}</td>
            <td>
              <button class="btn btn-danger" @click="deleteTeam(team.id)">Delete</button>
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
  // const { data } = await axios.get("/users/:username/teams");
  // teams.value = data.teams;
});

const addTeam = async () => {
  console.log("Add Team");
  teams.value.push({ name: newTeamName.value });
};
const deleteTeam = async () => {
  teams.value.pop();
  console.log("Delete Team");
};
</script>
