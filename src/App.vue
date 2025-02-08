<template>
  <div>
    <router-view />  <!-- Vue Router loads components dynamically -->
    <BackButton v-if="store.currentScene === 'scene2'" />
  </div>
</template>

<script>
import { useAppStore } from "./store/index.js";
import BackButton from "./components/BackButton.vue";

export default {
  components: { BackButton },
  setup() {
    const store = useAppStore();
    return { store };
  }
};
</script>
