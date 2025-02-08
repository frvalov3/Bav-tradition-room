import { createRouter, createWebHashHistory } from "vue-router";
import MarzipanoViewer from "../components/MarzipanoViewer.vue";
import CertificateGrid from "../components/CertificateGrid.vue";

const routes = [
  { path: "/", component: MarzipanoViewer },
  { path: "/certificates", component: CertificateGrid },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
