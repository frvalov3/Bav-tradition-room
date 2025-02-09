<template>
  <div class="certification-grid">
    <div 
      v-for="cert in store.displayedCertifications" 
      :key="cert.id" 
      class="certification-item"
      @click="store.selectCertificate(cert)"
    >
      <img :src="cert.img" :alt="cert.title" />
      <p>{{ cert.title }}</p>
    </div>
  </div>
  <Pagination />
  <Popup v-if="store.selectedCertificate" />
</template>

<script setup>
import { useCertificationStore } from "@/store/modules/certificationStore.js";
import Pagination from "@/components/Pagination.vue";
import Popup from "@/components/Popup.vue";

const store = useCertificationStore();
</script>

<style scoped>
.certification-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
}

.certification-item {
  text-align: center;
  cursor: pointer;
}

.certification-item img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}
</style>
