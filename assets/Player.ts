import { _decorator, AsyncDelegate, Component, EventKeyboard, Input, input, KeyCode, Node, RigidBody, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(RigidBody)
    body: RigidBody;

    @property(Number)
    speed: number = 0;

    private _rightDown: boolean = false;
    private _leftDown: boolean = false;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(deltaTime: number) {
        let force = new Vec3(0, 0, this.speed * deltaTime);
        this.body.applyForce(force);

        if (this._leftDown) {
            this.body.applyForce(new Vec3(1000 * deltaTime, 0, 0));
        }

        if (this._rightDown) {
            this.body.applyForce(new Vec3(-1000 * deltaTime, 0, 0));
        }
    }

    onKeyDown(event: EventKeyboard) {
        console.log('down ', event.keyCode);
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._leftDown = true;
                break;
            case KeyCode.KEY_D:
                this._rightDown = true;
                break;
        }
        console.log(`left:${this._leftDown}, right:${this._rightDown}`);
    }

    onKeyUp(event: EventKeyboard) {
        console.log('up ', event.keyCode);
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this._leftDown = false;
                break;
            case KeyCode.KEY_D:
                this._rightDown = false;
                break;
        }

        console.log(`left:${this._leftDown}, right:${this._rightDown}`);
    }
}
