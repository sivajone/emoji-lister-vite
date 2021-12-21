<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    $q.dark.set(true);
  },
};
</script>

<style lang="sass">
body::-webkit-scrollbar
  width: 1em

body
  scrollbar-width: thin
  scrollbar-color: lighten($dark, 5) $dark

body::-webkit-scrollbar-track
  background: $dark

body::-webkit-scrollbar-thumb
  background-color: lighten($dark, 5)
  border-radius: 6px
  border: 3px solid $dark

#app
  font-family: Roboto
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

.scale-enter-active,
.scale-leave-active
  transition: all 0.5s ease


.scale-enter-from,
.scale-leave-to
  opacity: 0
  transform: scale(0.9)
</style>
