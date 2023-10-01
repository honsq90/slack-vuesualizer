import { mongo } from '~~/server/utils/mongo'
import mime from "mime-types";

export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params!.channel)
  const filename = decodeURIComponent(event.context.params!.filename)
  const files = await readMultipartFormData(event);
  const db = await mongo(event.context.mongouuid)

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
      const type = mime.lookup(filename);

      await db
          .collection('attachments')
          .insertOne({channel, data, filename, type})

    }
  }
  event.node.res.statusCode = 201
  return 'ok'
})
