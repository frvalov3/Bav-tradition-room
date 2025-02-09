import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCertificationStore = defineStore("certification", () => {
  const certifications = ref([
    // { id: 1, img: "/assets/certificate1.jpg", title: "Cert 1", description: "Description of Cert 1" },
    // { id: 2, img: "/assets/certificate2.jpg", title: "Cert 2", description: "Description of Cert 2" },
    // { id: 3, img: "/assets/certificate3.jpg", title: "Cert 3", description: "Description of Cert 3" },
    // { id: 4, img: "/assets/certificate4.jpg", title: "Cert 4", description: "Description of Cert 4" },
    // { id: 5, img: "/assets/certificate5.jpg", title: "Cert 5", description: "Description of Cert 5" },
    // { id: 6, img: "/assets/certificate6.jpg", title: "Cert 6", description: "Description of Cert 6" },
    // { id: 7, img: "/assets/certificate7.jpg", title: "Cert 7", description: "Description of Cert 7" },
    // { id: 8, img: "/assets/certificate8.jpg", title: "Cert 8", description: "Description of Cert 8" },
    // { id: 9, img: "/assets/certificate9.jpg", title: "Cert 9", description: "Description of Cert 9" },
    // { id: 10, img: "/assets/certificate10.jpg", title: "Cert 10", description: "Description of Cert 10" }
  ]);

  const currentPage = ref(0);
  const certificationsPerPage = 9;

  const displayedCertifications = computed(() => {
    const start = currentPage.value * certificationsPerPage;
    return certifications.value.slice(start, start + certificationsPerPage);
  });

  const hasNextPage = computed(() => (currentPage.value + 1) * certificationsPerPage < certifications.value.length);

  const nextPage = () => {
    if (hasNextPage.value) currentPage.value++;
  };

  const prevPage = () => {
    if (currentPage.value > 0) currentPage.value--;
  };

  const selectedCertificate = ref(null);

  const selectCertificate = (cert) => {
    selectedCertificate.value = cert;
  };

  const closePopup = () => {
    selectedCertificate.value = null;
  };

  return {
    certifications,
    displayedCertifications,
    currentPage,
    hasNextPage,
    nextPage,
    prevPage,
    selectedCertificate,
    selectCertificate,
    closePopup
  };
});
