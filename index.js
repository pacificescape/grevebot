require('dotenv').config()
const { Airgram, Auth, prompt, toObject } = require('airgram')

const airgram = new Airgram({
    command: process.env.TDLIB_LOCATION,
    apiId: process.env.APP_ID,
    apiHash: process.env.APP_HASH
})

airgram.use(new Auth({
    token: process.env.BOT_TOKEN
}))

void (async function () {
  const me = toObject(await airgram.api.getMe())
  console.log('[Me] ', me)
})()

// Getting all updates
airgram.use((ctx, next) => {
  if ('update' in ctx) {
    console.log(`[all updates][${ctx._}]`, JSON.stringify(ctx.update))
  }
  return next()
})

// Getting new messages
airgram.on('updateNewMessage', async ({ update }) => {
  const { message } = update
  console.log('[new message]', message)
})
