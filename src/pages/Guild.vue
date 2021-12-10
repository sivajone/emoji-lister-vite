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
      }).then((r) =>
        r.json().then((data) => {
          this.emojis = data.emojis;
          this.loading = false;
        })
      );
    },
  },
  props: ["id"],
};
</script>

<template>
  <div class="q-pa-xl">
    <div class="row justify-center">
      <div class="q-gutter-md col-12 row justify-center">
        <q-card v-for="emoji in emojis" :key="emoji.id" class="emoji-card">
          <a
            rel="noopener noreferrer nofollow"
            :href="
              'https://cdn.discordapp.com/emojis/' + emoji.id + '?size=256'
            "
            target="_blank"
          >
            <q-img
              class="emoji_img"
              fit="contain"
              :src="
                'https://cdn.discordapp.com/emojis/' + emoji.id + '?size=256'
              "
            >
              <div class="absolute-bottom text-subtitle2 text-center">
                <p class="text-h6 no-margin">{{ emoji.name }}</p>
              </div>
            </q-img>
          </a>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="top-left" :offset="[18, 18]">
      <q-btn fab icon="keyboard_return" to="/" color="secondary" />
    </q-page-sticky>
  </div>
</template>

<style lang="sass">
.emoji-card
  width: 100%
  min-height: 256px
  max-width: 256px
  transition: transform 0.2s ease-in-out
  &:hover
    transform: scale(1.02)
.emoji_img
  width: 256px
  height: 256px
</style>
