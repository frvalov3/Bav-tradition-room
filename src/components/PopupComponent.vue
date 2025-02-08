<template>
  <div v-if="certificate" class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content">
      <img :src="certificate.img" alt="Certificate Image" class="popup-img" />
      <div class="popup-details">
        <h3>{{ certificate.title }}</h3>
        <p>{{ certificate.description }}</p>
      </div>
      <button class="close-button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    certificate: Object, // ✅ Receive selected certificate as prop
  }
};
</script>

<style scoped>
/* 🔥 Popup Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 🔥 Popup Content */
.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  text-align: center;
  position: relative;
}

/* 🔥 Image Styling */
.popup-img {
  width: 80%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

/* 🔥 Description */
.popup-details {
  margin-top: 10px;
}

/* 🔥 Close Button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
.close-button:hover {
  background: darkred;
}
</style>
