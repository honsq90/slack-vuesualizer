<script lang="ts" setup>
import FileIcon from '~icons/mdi/file'
import type { File } from '~~/types/File'

interface Props {
  files: File[]
}

defineProps<Props>()
</script>

<template>
  <div class="p-2 flex gap-2">
    <div>
      <ul v-for="file in files" :key="file.id">
        <li>
          <video v-if="'mimetype' in file && file.mimetype.includes('video')"
                 :src="`/${file.url_private}`"
                 :type="file.mimetype"
                 controls
          />
          <img v-else-if="'mimetype' in file && file.mimetype.includes('image')"
               :src="`/${file.url_private}`"/>
          <a v-else-if="'name' in file"
            class="fancy-link"
            :href="`/${file.url_private}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileIcon class="w-8 h-8" />
            <span>{{ file.name }}</span>
          </a>
          <span v-else>{{ file.mode }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
