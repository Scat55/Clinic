<script setup lang="ts">
import Sidebar from '@/components/sidebar/index.vue'
</script>

<template>
  <div class="grid lg:flex items-start">
    <div>
      <sidebar />
    </div>
    <div class="p-4 w-full">
      <slot />
    </div>
  </div>
</template>
