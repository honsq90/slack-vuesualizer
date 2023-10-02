<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import type { Reaction } from '~/types/Message'

interface Props {
  reaction: Reaction
}

const props = defineProps<Props>()

const name = computed(() => props.reaction.name)

const { emojiUnicode } = useEmoji(name)

const users = useUsers()

const userNames = computed(() =>
  props.reaction.users.map(
    user => users.value.find(({ id }) => id === user)?.profile.display_name,
  ),
)
</script>

<template>
  <Popover class="relative">
    <PopoverButton class="badge badge-ghost align-middle">
      <img v-if="emojiUnicode.includes(name)" :src="`http://localhost:5000/static/emojis/${name}.png`" class="max-h-[14px]" :title="name" :alt="name">
      <span v-else v-html="emojiUnicode" />
      <span class="ml-1">{{ reaction.count }}</span>
    </PopoverButton>
    <Transition name="slide-y">
      <PopoverPanel
        class="absolute z-10 text-sm left-1/2 -translate-x-1/2 px-2 bg-base-100 text-base-content rounded-lg shadow-lg leading-relaxed ring-1 ring-black/10 dark:ring-slate-300/25"
      >
        <div class="whitespace-nowrap" v-for="user in userNames" :key="user">
          {{ user }}
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>
