<script>
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      emojis: null,
      loading: null,
    };
  },
  created() {
    this.fetchServers();
  },
  methods: {
    async fetchServers() {
      this.loading = true;
      await fetch(`https://discord.com/api/v9/guilds/${this.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      })
        .then((r) =>
          r.json().then((data) => {
            this.emojis = data.emojis;
            this.emojis.forEach((obj) => {
              obj["dialog"] = false;
            });
          })
        )
        .finally(() => (this.loading = false));
    },
  },
  props: ["id"],
};
</script>

<template>
  <div class="q-pa-lg">
    <div class="row justify-center">
      <div class="q-gutter-sm col-12 row justify-center">
        <q-spinner-ios v-if="loading" color="primary" size="6em" />
        <q-card v-for="emoji in emojis" :key="emoji.id" class="emoji-card">
          <q-img
            class="emoji_img"
            fit="contain"
            :src="'https://cdn.discordapp.com/emojis/' + emoji.id + '?size=256'"
            @click="emoji.dialog = true"
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              <p class="text-h6 no-margin">{{ emoji.name }}</p>
            </div>
          </q-img>
          <q-dialog v-model="emoji.dialog">
            <q-card class="emoji__dialogCard">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">{{ emoji.name }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                <q-img
                  :src="
                    'https://cdn.discordapp.com/emojis/' +
                    emoji.id +
                    '?size=2048'
                  "
                >
                </q-img>
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn fab icon="keyboard_return" to="/" color="primary" />
    </q-page-sticky>
  </div>
</template>

<style lang="sass">
.emoji-card
  height: 15rem
  width: 15rem
  transition: transform 0.2s ease-in-out
  &:hover
    transform: scale(1.02)
.emoji_img
  width: 100%
  height: 100%
.emoji__dialogCard
  min-width: 20em
  min-height: 20em
</style>
