import { Application, Graphics, Text } from 'pixi.js'
import { io } from 'socket.io-client'

async function init() {
  // 1. WebSocket Setup
  const socket = io('http://localhost:3000') // Make sure this matches your server port
  socket.on('connect', () => {
    console.log('🟢 Connected:', socket.id)
  })
  socket.on('connected', (msg) => {
    console.log('📩 Server says:', msg)
  })

  // 2. PixiJS Application Init (v8+)
  const app = new Application()
  await app.init({
    width: 1000,
    height: 800,
    backgroundColor: 0x1d1d1d,
    antialias: true,
  })
  document.body.appendChild(app.canvas)

  // 3. Title Text
   const title = new Text('🎮 PixiJS Game Client v5', {
    fill: '#ffffff',
    fontSize: 32,
  })
  title.position.set(200, 50)
  app.stage.addChild(title)

  // 4. Player (Green Square)
  const player = new Graphics()
  player.beginFill(0x00ff00).drawRect(0, 0, 50, 50).endFill()
  player.position.set(375, 275)
  app.stage.addChild(player)

  // 5. Move Player with Arrow Keys
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      player.x += 10
      socket.emit('player-move', { direction: 'right' })
    } else if (e.key === 'ArrowLeft') {
      player.x -= 10
      socket.emit('player-move', { direction: 'left' })
    }
  })
}

init().catch((err) => console.error('Init Error:', err))
