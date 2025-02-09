<script setup lang="ts">
import type SidebarMenu from '~/types/sidebar-menu'

const items = ref<SidebarMenu[]>([
  { title: 'Записи', link: '/cabinet/records', icon: 'pi pi-database' },
  { title: 'Финансы', link: '/cabinet/finance', icon: 'pi pi-wallet' },
  { title: 'Склад', link: '/cabinet/warehouse', icon: 'pi pi-warehouse' },
  { title: 'Клиенты', link: '/cabinet/clients', icon: 'pi pi-users' },
  { title: 'Аналитика', link: '/cabinet/analytics', icon: 'pi pi-chart-bar' }
])
defineEmits([
  'close'
])
</script>

<template>
  <div>
    <header class="flex items-center gap-2 p-4 hover:scale-[101%] transition cursor-pointer">
<!--      <Logo class="text-blue-700" />-->
      <nuxt-link to="/cabinet" class="font-bold lg:text-xl text-zinc-400" @click="$emit('close')">
        Клиника Доверие
      </nuxt-link>
    </header>
    <div class="px-4 grow">
      <div class="grid gap-4">
        <nuxt-link
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-zinc-700"
            @click="$emit('close')"
        >
          <i :class="[item.icon, 'text-zinc-400']" style="font-size: 1.25rem" />
          <span class="text-zinc-400">{{ item.title }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
