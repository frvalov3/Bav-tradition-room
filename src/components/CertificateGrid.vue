<template>
  <div id="certificate-container">
    <div id="certificate-grid">
      <div v-for="cert in displayedCertificates" :key="cert.id" class="certificate" @click="openPopup(cert)">
        <img :src="cert.img" :alt="cert.title" />
      </div>
    </div>
    <button v-if="currentPage > 0" @click="prevPage">← Previous</button>
    <button v-if="hasNextPage" @click="nextPage">Next →</button>
  </div>
  <PopupComponent v-if="selectedCertificate" :certificate="selectedCertificate" @close="selectedCertificate = null" />
</template>

<script>
import { ref, computed } from "vue";
import PopupComponent from "./PopupComponent.vue";

const certificates = [
  { id: 1, img: "/assets/certificate1.jpg", title: "Cert 1", description: "Description of Certificate 1" },
  { id: 2, img: "/assets/certificate2.jpg", title: "Cert 2", description: "Description of Certificate 2" },
  { id: 10, img: "/assets/certificate10.jpg", title: "Cert 10", description: "Description of Certificate 10" }
];

export default {
  components: { PopupComponent },
  setup() {
    const currentPage = ref(0);
    const selectedCertificate = ref(null);
    const certificatesPerPage = 9;

    const displayedCertificates = computed(() => {
      const start = currentPage.value * certificatesPerPage;
      return certificates.slice(start, start + certificatesPerPage);
    });

    const hasNextPage = computed(() => (currentPage.value + 1) * certificatesPerPage < certificates.length);

    const nextPage = () => currentPage.value++;
    const prevPage = () => currentPage.value--;
    const openPopup = (cert) => { selectedCertificate.value = cert; };

    return { displayedCertificates, currentPage, hasNextPage, nextPage, prevPage, selectedCertificate, openPopup };
  }
};
</script>
