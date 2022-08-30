export class UI {
    constructor(game) {
        this.game = game
    }

    draw(context) {
        context.save()
        context.font = '45px Impact'
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'gray'
        context.fillStyle = 'white'
        let levelText = `Level: ${this.game.level}`
        context.fillText(`Score: ${this.game.score}`, 20, 50)
        context.fillText(
            levelText,
            this.game.width - context.measureText(levelText).width - 20,
            50
        )
        context.restore()

        if (this.game.gameOver) {
            context.save()
            context.font = '60px Impact'
            context.shadowOffsetX = 2
            context.shadowOffsetY = 2
            context.shadowColor = 'gray'
            context.fillStyle = 'white'
            let gameOverText = `Game Over! Your score is ${this.game.score}`
            context.fillText(
                gameOverText,
                this.game.width * 0.5 -
                    context.measureText(gameOverText).width * 0.5,
                this.game.height * 0.5 - 40
            )
            context.font = '45px Impact'
            gameOverText = 'Press Enter to restart'
            context.fillText(
                gameOverText,
                this.game.width * 0.5 -
                    context.measureText(gameOverText).width * 0.5,
                this.game.height * 0.5 + 30
            )
            context.restore()
        }
    }
}
