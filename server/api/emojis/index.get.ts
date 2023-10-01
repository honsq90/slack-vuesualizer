import { mongo } from '~/server/utils/mongo'
import type { Slackmoji } from "~/types/Slackmoji";

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid)
  const slackmojis = await db
    .collection<Slackmoji>('emojis')
    .countDocuments()

  return slackmojis
})
