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
          <a v-if="'name' in file"
            class="fancy-link"
            :href="`/api/${file.url_private}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img v-if="file.mimetype.includes('image')"
                 :src="`/api/${file.url_private}`" class="max-h-[600px]"/>
            <video v-else-if="file.mimetype.includes('video')"
                   :src="`/api/${file.url_private}`"
                   :type="file.mimetype"
                   controls
                   class="max-h-[600px]"
            />
            <span v-else>
              <FileIcon class="w-8 h-8" />
              <span>{{ file.name }}</span>
            </span>
          </a>
          <span v-else>{{ file.mode }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
