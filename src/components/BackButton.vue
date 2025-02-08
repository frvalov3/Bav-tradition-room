<template>
  <button class="back-button" @click="store.switchScene('scene1')">Back</button>
</template>

<script>
import { useAppStore } from "../store/index.js";

export default {
  setup() {
    const store = useAppStore();
    return { store };
  }
};
</script>

<style>
.back-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: red;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
