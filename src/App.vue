<template>
  <div>
    <router-view />  <!-- Vue Router loads components dynamically -->
    <BackButton v-if="store.currentScene === 'scene2'" />
  </div>
</template>

<script>
import { useGlobalStore } from "@/store/index.js";
import BackButton from "@/components/BackButton.vue";

export default {
  components: { BackButton },
  setup() {
    const store = useGlobalStore();
    return { store };
  }
};
</script>
