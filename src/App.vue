<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Header from "@/components/header.vue";
</script>

<template>
  <Toaster />
  <Header />
  <div class="container py-10 mx-auto">
    <router-view />
  </div>
</template>
