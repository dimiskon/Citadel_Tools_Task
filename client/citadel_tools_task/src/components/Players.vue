<template>
  <div>
    <h1 class="mb-4" style="font-size: 3rem">{{ "Team " + team.team_name }}</h1>
    <form @submit="addPlayer">
      <table class="table">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Signed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players" :key="player.player_id">
            <td>
              <h2>{{ player.player_name }}</h2>
            </td>
            <td>
              <div class="btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-primary">
                  <input type="checkbox" /> Text
                </label>
              </div>
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click="deletePlayer(player.player_id)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr class="table-secondary">
            <td><input v-model="formData.player_name" /></td>
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

const team = ref({
  team_name: "",
  team_id: ""
});
const team_id = route.params["team_id"];
console.log({ team_id });

const players = ref([]);
const formData = reactive({
  player_name: "",
  signed: false
});

onMounted(async () => {
  const { data } = await axios.get(`/teams/${team_id.value}/players`);
  console.log(data);
  players.value = data;
});

const addPlayer = async () => {
  await axios.post("/players", formData);
};
const deletePlayer = async (player_id) => {
  console.log("Delete Player");
  console.log({ player_id });
  await axios.delete(`/teams/${player_id.value}/players/${player_id}`);
};
</script>
