<template>
  <div class="container-sm" style="max-width: 500px">
    <div class="card">
      <h2 class="card-header">Register</h2>
      <div class="card-body">
        <div
          v-if="componentData.errorMessage"
          role="alertdialog"
          class="alert alert-danger my-2"
          style="font-size: larger; color: brown"
        >
          {{ componentData.errorMessage }}
        </div>
        <div class="card-text">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model="componentData.username" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" v-model="componentData.password" />
            </div>
            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" v-model="componentData.confirmPassword" />
            </div>
            <div class="text-center">
              <img alt="qrCodeImgURL" class="img-thumbnail" :src="componentData.qrCodeImgURL" />
            </div>
            <div class="mb-3">
              <label class="form-label">2FA</label>
              <input class="form-control" type="number" v-model="componentData.token2FA" />
            </div>
            <div class="d-grid gap-2 d-flex justify-content-center">
              <button class="btn btn-primary" style="font-size: 1.3rem" type="submit">
                Register
              </button>
            </div>
            <div class="text-center mt-2">
              <router-link to="/login">Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import _ from "lodash";
import { ref, onMounted, reactive } from "vue";

const componentData = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  qrCodeImgURL: "",
  secret: "",
  token2FA: "",
  errorMessage: ""
});
// const { username, password, confirmPassword, qrCodeImgURL, secret, token, errorMessage } = ref({
//   username: "",
//   password: "",
//   confirmPassword: "",
//   qrCodeImgURL: "",
//   secret: "",
//   token2FA: "",
//   errorMessage: ""
// });

onMounted(async () => {
  const { data } = await axios.get("/generateQRCode");
  console.log({ data });
  componentData.qrCodeImgURL = data.qrCodeURL;
  componentData.secret = data.secret;
});

const register = async () => {
  if (componentData.password !== componentData.confirmPassword) {
    componentData.errorMessage = "Passwords don't match!";
    return;
  }
  console.log("Submit Register Button!");

  const payload = _.omit(componentData, "confirmPassword", "qrCodeImgURL", "errorMessage");
  console.log({ payload });
  // try {
  //   const response = await axios.post("/users/register", {});
  //   console.log(response.data);
  // } catch (error) {
  //   console.error(error);
  //   componentData.errorMessage = "An error occurred while registering.";
  // }
};
</script>
