<template>
  <div>
    <form @submit="addTeam">
      <table class="table">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Signed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in players" :key="team.team_id">
            <router-link :to="'/players/' + team.team_id + '/players'">{{
              team.team_name
            }}</router-link>
            <!-- <a href="/players">{{ team.team_name }}</a> -->
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
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();

const players = ref([]);
const team_id = ref(route.params["team_id"]);
console.log({ team_id });
const formData = reactive({
  player_name: "",
  signed: false
});

onMounted(async () => {
  const { data } = await axios.get(`/teams/${team_id.value}/players`);
  console.log(data);
  players.value = data;
});

const addTeam = async () => {
  await axios.post("/players", formData);
};
const deleteTeam = async (player_id) => {
  console.log("Delete Player");
  console.log({ player_id });
  await axios.delete(`/teams/${team_id.value}/players/${player_id}`);
};
</script>
