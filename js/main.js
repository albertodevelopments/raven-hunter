import { Game } from './Game.js'

addEventListener('load', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    collisionCanvas.width = innerWidth
    collisionCanvas.height = innerHeight
    const ctx = canvas.getContext('2d')
    const collisionContext = collisionCanvas.getContext('2d')
    const game = new Game(canvas.width, canvas.height, collisionContext)
    let lastTime = 0

    addEventListener('keydown', e => {
        if (e.key === 'Enter') restart()
    })

    const animate = timeStamp => {
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        collisionContext.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)

        !game.gameOver && requestAnimationFrame(animate)
    }

    const restart = () => {
        game.gameOver = false
        game.score = 0
        game.level = 1
        game.ravens = []
        game.backgroundMusic.play()

        animate(0)
    }

    animate(0)
})
