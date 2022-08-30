import { InputHandler } from './InputHandler.js'
import { Raven } from './Raven.js'
import { UI } from './UI.js'
import { Collision } from './Collision.js'

export class Game {
    constructor(width, height, collisionContext) {
        this.width = width
        this.height = height
        this.collisionContext = collisionContext
        this.input = new InputHandler(this)
        this.UI = new UI(this)
        this.ravens = []
        this.fps = 5
        this.ravensInterval = 5000 / this.fps
        this.timeToNextRaven = 0
        this.speed = 1
        this.score = 0
        this.level = 1
        this.gameOver = false
        this.target = target
        this.targetWidth = 64
        this.targetHeight = 64
        this.targetSelected = null
        this.backgroundMusic = new Audio('../assets/music/background.mp3')
        this.shotSound = new Audio('../assets/music/gun.wav')
        this.levelUpSound = new Audio('../assets/music/levelup.wav')
        this.shotSound.volume = 0.3
        this.backgroundMusic.play()
        this.frame = 0
        this.gameFrameInterval = 1000
        this.gameTimer = 0
        this.levelUp = 5
    }

    checkMouseOverRaven() {
        this.targetSelected = null
        this.ravens.forEach(raven => {
            if (
                this.input.mouseOnX &&
                this.input.mouseOnY &&
                this.input.mouseOnX >= raven.x &&
                this.input.mouseOnX <= raven.x + raven.width &&
                this.input.mouseOnY >= raven.y &&
                this.input.mouseOnY <= raven.y + raven.height
            ) {
                this.targetSelected = {
                    x: this.input.mouseOnX - 32,
                    y: this.input.mouseOnY - 32,
                }
            }
        })
    }

    checkCollision() {
        this.input.pixelData &&
            this.ravens.forEach(raven => {
                if (
                    raven.colorRed === this.input.pixelData[0] &&
                    raven.colorGreen === this.input.pixelData[1] &&
                    raven.colorBlue === this.input.pixelData[2]
                ) {
                    /** Acierto! */
                    raven.markedForDeletion = true
                    ++this.score
                    this.shotSound.play()

                    /** Animación */
                    this.collisionObject = new Collision(this, raven.x, raven.y)
                }
            })
    }

    drawBackground(context) {
        context.drawImage(background, 0, 0, canvas.width, canvas.height)
    }

    update(deltaTime) {
        this.checkMouseOverRaven()
        this.checkCollision(deltaTime)

        this.timeToNextRaven += deltaTime
        if (this.timeToNextRaven > this.ravensInterval) {
            this.timeToNextRaven = 0
            this.ravens.push(new Raven(this))
        }

        /** Ordenamos los cuervos para que se salgan los más pequeños primero,
         *  y así damos sensación de profundidad
         */
        this.ravens.sort((a, b) => {
            return a.width - b.width
        })
        this.collisionObject && this.collisionObject.update(deltaTime)

        this.ravens.forEach(raven => raven.update(deltaTime))
        this.ravens = this.ravens.filter(raven => !raven.markedForDeletion)
        if (this.gameOver) {
            this.backgroundMusic.pause()
            this.backgroundMusic.currentTime = 0
        }

        this.gameTimer += deltaTime
        if (this.gameTimer > this.gameFrameInterval) {
            this.gameTimer = 0
            ++this.frame
            if (this.frame % this.levelUp === 0) {
                ++this.level
                this.levelUpSound.play()
                this.speed += 0.1
            }
        }
    }

    draw(ctx) {
        this.drawBackground(ctx)
        this.ravens.forEach(raven => raven.draw(ctx, this.collisionContext))
        this.UI.draw(ctx)

        /** Mostramos la animación de la colisión */
        this.collisionObject && this.collisionObject.draw(ctx)
        this.targetSelected &&
            ctx.drawImage(
                this.target,
                this.targetSelected.x,
                this.targetSelected.y,
                this.targetWidth,
                this.targetHeight
            )
    }
}
