/**
 * 实现一个 arrange 函数，可以进行时间和工作调度
 * 注意，这里的 wait do  均可以无限调用
 *
 * - 具体功能参考下列示例
 * - 在示例中调用到的方法都需要实现
 * - 下面示例中 `>` 表示在控制台中输出 (console.log)
 *
 * --- 示例 ---
 *
 * 示例一:
 * `arrange('William').execute();`
 * > William is notified
 *
 * 示例二:
 * `arrange('William').wait(5).do('commit').wait(5).do('push').execute();`
 * > William is notified
 * 等待 5s...
 * > Start to commit
 * 等待 5s
 * > Start to push
 *
 */

class Arrange {

    constructor(str) {
        this.str = str
        this.deleyTime = 0
    }

    wait(time) {
        this.deleyTime = this.deleyTime + time * 1000
        return this
    }

    do(doStr) {
        const { deleyTime } = this
        setTimeout(() => {
            console.log(`Start to ${doStr}`)
        }, deleyTime);
        return this
    }

    execute() {
        this.deleyTime = 0
        console.log(`${this.str} is notified `)
    }
}

function arrange(str) {
    return new Arrange(str)
}

arrange('William').wait(5).do('commit').wait(1).do('push').execute();