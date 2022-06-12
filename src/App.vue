<script lang="ts" setup>
  import Header from "./components/Header.vue";
  import Sidebar from "./components/Sidebar/Sidebar.vue";
  import ActionButtons from "./components/ActionButtons.vue";
</script>

<template>
  <notifications />
  <Header />
  <main class='bg-gray-200 h-screen'>
    <Sidebar />
    <ActionButtons />
  </main>


</template>
