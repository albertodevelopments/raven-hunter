export class Raven {
    constructor(game) {
        this.game = game
        this.spriteWidth = 271
        this.spriteHeight = 194
        this.sizeModifier = Math.random() * 0.2 + 0.5
        this.width = this.spriteWidth * this.sizeModifier
        this.height = this.spriteHeight * this.sizeModifier
        this.x = this.game.width + Math.random() * 20
        this.y = Math.random() * (this.game.height - this.height)
        this.markedForDeletion = false
        this.speedModifier = 4
        this.speedX = (Math.random() + this.speedModifier) * this.game.speed
        this.speedY = Math.random() - 0.5
        this.colorRed = Math.floor(Math.random() * 255)
        this.colorGreen = Math.floor(Math.random() * 255)
        this.colorBlue = Math.floor(Math.random() * 255)
        this.image = raven
        this.frameX = 0
        this.maxFrame = 5
        this.fps = 20
        this.flapInterval = 1000 / this.fps
        this.flapTimer = 0
    }

    update(deltaTime) {
        this.x -= this.speedX
        this.y += this.speedY
        if (this.x < -this.width) this.game.gameOver = true
        if (this.y < 0 || this.y > this.game.height - this.height)
            this.speedY = -this.speedY

        /** Animación */
        this.flapTimer += deltaTime
        if (this.flapTimer > this.flapInterval) {
            this.flapTimer = 0
            this.frameX++
            if (this.frameX > this.maxFrame) this.frameX = 0
        }
    }

    draw(context, contextCollision) {
        contextCollision.fillStyle = `RGB(${this.colorRed}, ${this.colorGreen}, ${this.colorBlue})`
        contextCollision.beginPath()
        contextCollision.ellipse(
            this.x + this.width * 0.5,
            this.y + this.height * 0.5,
            this.width / 2 - 10,
            this.height / 2 - 25,
            0,
            0,
            2 * Math.PI
        )
        contextCollision.stroke()
        contextCollision.fill()
        context.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}
