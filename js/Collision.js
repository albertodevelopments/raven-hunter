export class Collision {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.image = boom
        this.collisionInterval = 80
        this.collisionTimer = 0
        this.frameX = 0
        this.maxFrame = 4
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.width = this.spriteWidth
        this.height = this.spriteHeight
    }

    update(deltaTime) {
        this.collisionTimer += deltaTime
        if (this.collisionTimer > this.collisionInterval) {
            this.collisionTimer = 0
            ++this.frameX
            if (this.frameX > this.maxFrame)
                this.game.collisionAnimation = false
        }
    }

    draw(context) {
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
