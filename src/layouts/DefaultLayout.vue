<template>
    <div>
      <header>My Virtual Tour</header>
      <slot />
      <footer>© 2024 BAV Tradition Room</footer>
    </div>
  </template>
  
  <style scoped>
  header {
    background: black;
    color: white;
    padding: 10px;
    text-align: center;
  }
  footer {
    background: gray;
    color: white;
    padding: 5px;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  </style>
  