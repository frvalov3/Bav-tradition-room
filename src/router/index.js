import { createRouter, createWebHashHistory } from "vue-router";
import MarzipanoViewer from "@/components/MarzipanoViewer.vue";
import CertificationGrid from "@/components/CertificationGrid.vue";

const routes = [
  { path: "/", component: MarzipanoViewer },
  { path: "/certificates", component: CertificationGrid },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
