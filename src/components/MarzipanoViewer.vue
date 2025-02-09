<template>
  <div ref="pano" id="pano"></div>
  <ToolTip />
  <CertificationGrid v-if="marzipanoStore.currentScene === 'scene2'" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMarzipanoStore } from "@/store/modules/marzipanoStore.js";
import { useMarzipano } from "@/composables/useMarzipano.js";
import CertificationGrid from "@/components/CertificationGrid.vue";
import ToolTip from "@/components/ToolTip.vue";

const pano = ref(null);
const marzipanoStore = useMarzipanoStore();
const { initializeMarzipano } = useMarzipano(pano);

onMounted(initializeMarzipano);
</script>
