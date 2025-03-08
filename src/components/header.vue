<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
const links = [{ name: "Home", path: "/" }];

const isOpen = ref(false);
</script>

<template>
  <header class="bg-black text-white shadow-md">
    <div class="container mx-auto flex items-center justify-between p-4">
      <h1 class="text-2xl font-bold cursor-pointer" @click="router.push('/')">
        Purple Cross Ltd
      </h1>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex gap-6">
        <Button
          v-for="link in links"
          :key="link.path"
          variant="ghost"
          @click="router.push(link.path)"
        >
          {{ link.name }}
        </Button>
      </nav>

      <!-- Mobile Menu Button -->
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Button variant="ghost" class="md:hidden">
            <Menu class="w-6 h-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="bg-white w-64 p-4">
          <h2 class="text-xl font-semibold text-black mb-4">
            Purple Cross Ltd
          </h2>
          <nav class="flex flex-col gap-4">
            <Button
              v-for="link in links"
              :key="link.path"
              variant="ghost"
              @click="
                router.push(link.path);
                isOpen = false;
              "
            >
              {{ link.name }}
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>
</template>
