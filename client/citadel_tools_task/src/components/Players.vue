<template>
  <div class="container">
    <div class="card">
      <h2 class="card-header" style="background-color: black">
        {{ "Team " + team.team_name }}
      </h2>
      <div class="card-body">
        <div class="card-text"></div>
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
                  <input
                    type="checkbox"
                    @click="onSignPlayer(player)"
                    :checked="player.signed"
                  />
                </td>
                <td>
                  <button
                    class="btn btn-danger"
                    type="button"
                    @click="deletePlayer(player.player_id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr class="table-secondary">
                <td><input v-model="formData.player_name" /></td>
                <td><input type="checkbox" v-model="formData.signed" /></td>
                <td>
                  <button
                    :disabled="enableAddButton"
                    class="btn btn-primary"
                    type="submit"
                  >
                    Add Player
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import _ from "lodash";
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const team = ref({
  team_name: "",
  team_id: ""
});
const team_id = route.params["team_id"];
const apiGetPlayersURL = `/teams/${team_id}/players`;

const players = ref([]);
const formData = reactive({
  player_name: "",
  signed: false
});

const enableAddButton = computed(() => {
  return !formData.player_name;
});

onMounted(async () => {
  const { data } = await axios.get(apiGetPlayersURL);
  team.value.team_id = data.team_id;
  team.value.team_name = data.team_name;

  players.value = _.get(data, "Players", []);
});

const onSignPlayer = async (player) => {
  await axios.put(`/teams/${team_id}/players/${player.player_id}`, {
    signed: !player.signed
  });
  window.location.reload();
};

const addPlayer = async () => {
  await axios.post(apiGetPlayersURL, formData);
};
const deletePlayer = async (player_id) => {
  await axios.delete(`/teams/${team_id}/players/${player_id}`);
  window.location.reload();
};
</script>
