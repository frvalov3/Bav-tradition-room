<template>
    <div class="pagination">
      <button @click="store.prevPage" :disabled="store.currentPage === 0">
        Previous
      </button>
      <span>Page {{ store.currentPage + 1 }}</span>
      <button @click="store.nextPage" :disabled="!store.hasNextPage">
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  import { useCertificationStore } from "@/store/modules/certificationStore.js";
  
  const store = useCertificationStore();
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  </style>
  