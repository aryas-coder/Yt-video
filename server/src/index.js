const createApp = require('./app')
const config = require('./config')
const { cleanupTemp } = require('./utils/temp')

const app = createApp()

// on startup cleanup incomplete temp files older than 1 day
cleanupTemp()

app.listen(config.port, ()=>{
  console.log(`Yt-video backend running on port ${config.port}`)
})
