import { mongo } from '~~/server/utils/mongo'
import { Slackmoji } from "~/types/Slackmoji";

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params!.name)
  const files = await readMultipartFormData(event);
  const db = await mongo(event.context.mongouuid)

  const slackmoji = await db.collection<Slackmoji>('emojis').findOne({ name });

  if (slackmoji)
    return 'ok'

  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image Not Found',
    });
  }

  for (let i = 0; i < files.length; i++) {
    let multiPartDatum = files[i];
    if (multiPartDatum.name === 'file') {
      const data = multiPartDatum.data.toString("base64");

      await db
          .collection('emojis')
          .insertOne({data, name})

    }
  }
  event.node.res.statusCode = 201
  return 'ok'
})
