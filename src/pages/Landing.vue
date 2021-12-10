<script>
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    const token = ref("");
    const list = JSON.parse(sessionStorage.getItem("list")) || ref("");
    const loading = ref(false);

    async function fetchServers() {
      loading.value = true;
      await fetch(`https://discord.com/api/v9/users/@me/guilds`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token.value,
        },
      }).then((r) =>
        r.json().then((data) => {
          list.value = data;
          sessionStorage.setItem("token", token.value);
          sessionStorage.setItem("list", JSON.stringify(list.value));
          loading.value = false;
        })
      );
    }

    return {
      list,
      token,
      loading,
      fetchServers,
      onSubmit() {
        if (!token.value) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You have to enter the token.",
          });
        } else {
          fetchServers();
        }
      },
    };
  },
};
</script>

<template>
  <div class="q-pa-xl">
    <div class="row justify-center">
      <q-form
        @submit="onSubmit"
        class="q-gutter-sm q-my-md col-md-6 col-xs-12"
        key="form"
      >
        <q-input
          filled
          v-model="token"
          label="Token"
          type="password"
          key="input"
        />
        <q-btn
          key="input"
          type="submit"
          push
          size="1rem"
          :loading="loading"
          color="primary"
          label="Fetch"
        />
      </q-form>
      <div class="col-12 row q-gutter-sm justify-center">
        <q-card v-for="guild in list" :key="guild.id" class="guild-card">
          <transition-group appear enter-active-class="animated bounceInRight">
            <router-link :to="guild.id" key="link" class="text-primary">
              <q-img
                key="img"
                v-if="guild.icon"
                :src="
                  'https://cdn.discordapp.com/icons/' +
                  guild.id +
                  '/' +
                  guild.icon +
                  '.png?size=512'
                "
              >
                <div
                  class="absolute-bottom text-subtitle2 text-center"
                  key="guild__name"
                >
                  <p class="text-h6 no-margin">{{ guild.name }}</p>
                </div>
              </q-img>
              <div
                class="nullGuildIcon row justify-center items-center"
                key="null_icon"
                v-else
              >
                <p
                  class="nullGuildIcon__text text-h4 no-margin"
                  key="nullGuild__name"
                >
                  {{ guild.name }}
                </p>
              </div>
            </router-link>
          </transition-group>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.guild-card
  width: 100%
  min-height: 250px
  max-width: 250px
  transition: transform 0.2s ease-in-out
  &:hover
    transform: scale(1.02)

.nullGuildIcon
  height: 100%
  width: 100%

a
  text-decoration: none
</style>
