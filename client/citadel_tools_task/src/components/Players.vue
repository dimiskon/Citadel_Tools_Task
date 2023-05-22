<template>
  <div class="container">
    <div class="card" style="background-color: lightgray">
      <div>
        <h2 class="card-header" style="background-color: black">
          {{ "Team " + team.team_name }}
        </h2>
      </div>
      <div class="p-3 mt-2">
        <input
          type="search"
          style="font-size: 1.3rem"
          placeholder="Search Player..."
          class="form-control"
          v-model="searchTerm"
        />
      </div>
      <div class="card-body">
        <div class="card-text"></div>
        <table class="table table-bordered" style="background-color: white">
          <thead style="background-color: lightslategray; color: white">
            <tr>
              <th>Player Name</th>
              <th>Signed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players" :key="player.player_id">
              <td>
                <h4>{{ player.player_name }}</h4>
              </td>
              <td class="text-center" style="position: relative; top: 5px">
                <input
                  class="form-check-input"
                  type="checkbox"
                  @click="onSignPlayer(player)"
                  :checked="player.signed"
                />
              </td>
              <td class="text-center">
                <button
                  class="btn btn-danger"
                  @click="deletePlayer(player.player_id)"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr style="background-color: lightslategray">
              <td>
                <input
                  class="form-control-sm w-75"
                  v-model="newPlayer.player_name"
                />
              </td>
              <td class="text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="newPlayer.signed"
                />
              </td>
              <td class="text-center">
                <button
                  :disabled="enableAddButton"
                  @click="addPlayer()"
                  class="btn btn-primary"
                >
                  Add Player
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
import _ from "lodash";
import { ref, onMounted, reactive, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const team = reactive({
  team_name: "",
  team_id: ""
});
const team_id = route.params["team_id"];
const apiGetPlayersURL = `/teams/${team_id}/players`;

const players = ref([]);

const newPlayerDefaultValues = {
  player_name: "",
  signed: false
};
const newPlayer = reactive({ ...newPlayerDefaultValues });
const resetNewPlayerValues = () => {
  Object.assign(newPlayer, newPlayerDefaultValues);
};

const enableAddButton = computed(() => {
  return !newPlayer.player_name;
});

const searchTerm = ref("");

watch(searchTerm, async (searchText) => {
  const player_name = _.inRange(searchText.length, 0, 2) ? "" : searchText;
  await fetchPlayers(player_name);
});

const fetchPlayers = async (player_name = "") => {
  const { data } = await axios.get(apiGetPlayersURL, {
    params: { player_name }
  });

  team.team_id = data.team_id;
  team.team_name = data.team_name;
  players.value = _.get(data, "Players", []);

  // Reset values - Players array and searchTerm field
  resetNewPlayerValues();
};

const onSignPlayer = async (player) => {
  await axios.put(`/teams/${team_id}/players/${player.player_id}`, {
    signed: !player.signed
  });
  await fetchPlayers();
};

const addPlayer = async () => {
  await axios.post(apiGetPlayersURL, newPlayer);
  await fetchPlayers();
};
const deletePlayer = async (player_id) => {
  await axios.delete(`/teams/${team_id}/players/${player_id}`);
  await fetchPlayers();
};

// API call to fetch Players on component mount (1st call)
onMounted(fetchPlayers);
</script>
