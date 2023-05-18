<template>
  <tr v-for="player in props.players" :key="player.player_id">
    <td>
      <h2>{{ player.player_name }}</h2>
    </td>
    <td>
      <input
        type="checkbox"
        @click="onSignPlayer(player.player_id)"
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
</template>

<script setup>
import { defineProps } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();

const team_id = route.params["team_id"];

const props = defineProps({
  players: {
    type: Array,
    required: true
  },
  signed: {
    type: Boolean,
    required: true
  }
});

const onSignPlayer = async (player_id) => {
  await axios.put(`/teams/${team_id}/players/${player_id}`, {
    signed: props.signed
  });
};

const deletePlayer = async (player_id) => {
  await axios.delete(`/teams/${team_id}/players/${player_id}`);
  window.location.reload();
};
</script>
