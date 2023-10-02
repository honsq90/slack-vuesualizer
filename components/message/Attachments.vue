<script lang="ts" setup>
import type { Attachment } from '~~/types/Message'

// TODO: link
interface Props {
  attachments: Attachment[]
}

defineProps<Props>()
</script>

<template>
  <div>
    <ul
      v-for="attachment in attachments"
      :key="attachment.id"
      class="flex flex-col gap-2"
    >
      <li>
        <p class="font-bold">{{ attachment.fallback }}</p>
        <p class="italic" v-if="attachment.title">{{ attachment.title }}</p>
        <p v-if="attachment.text">{{ attachment.text }}</p>
        <a
          v-if="attachment.title_link"
          class="fancy-link"
          :href="attachment.title_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ attachment.title_link }}</span>
        </a>

      </li>
    </ul>
  </div>
</template>
