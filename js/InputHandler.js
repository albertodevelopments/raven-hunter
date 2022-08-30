export class InputHandler {
    constructor(game) {
        this.game = game

        addEventListener('click', e => {
            this.pixelData = this.game.collisionContext.getImageData(
                e.x,
                e.y,
                1,
                1
            ).data
        })

        addEventListener('mousemove', e => {
            this.mouseOnX = e.pageX
            this.mouseOnY = e.pageY
        })
    }
}
