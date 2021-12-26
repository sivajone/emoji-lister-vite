<script>
import { ref, inject } from "vue";
import { useQuasar } from "quasar";
export default {
  props: ["id"],
  setup(props) {
    const axios = inject("axios");
    const $q = useQuasar();

    const emojis = ref("");
    const token = ref(sessionStorage.getItem("token"));
    const loading = ref(true);

    const fetchEmojis = async () => {
      try {
        await axios
          .get(`https://discord.com/api/v9/guilds/${props.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token.value,
            },
          })
          .then((response) => {
            emojis.value = response.data.emojis;
            emojis.value.forEach((obj) => {
              obj["dialog"] = false;
            });
          });
      } catch (error) {
        $q.notify({
          color: "negative",
          textColor: "white",
          icon: "error",
          message: error.message,
        });
      } finally {
        loading.value = false;
      }
    };

    fetchEmojis();

    return {
      fetchEmojis,
      emojis,
      loading,
    };
  },
};
</script>

<template>
  <div class="q-pa-lg">
    <div class="row justify-center">
      <section v-if="loading">
        <q-spinner-ios :loading="loading" color="primary" size="6em" />
      </section>
      <section v-else>
        <section
          class="q-gutter-sm col-12 row justify-center"
          v-if="emojis.length > 0"
        >
          <transition-group
            appear
            enter-active-class="animate__animated animate__zoomIn"
          >
            <q-card v-for="emoji in emojis" :key="emoji.id" class="emoji-card">
              <q-img
                class="emoji_img"
                fit="contain"
                :src="
                  'https://cdn.discordapp.com/emojis/' + emoji.id + '?size=256'
                "
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
                      spinner-color="primary"
                    >
                    </q-img>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </q-card>
          </transition-group>
        </section>

        <section v-else>
          <h2>No emojis 😔</h2>
        </section>
      </section>
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
