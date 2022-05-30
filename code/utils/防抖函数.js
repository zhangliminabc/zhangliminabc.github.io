/**
 * 防抖: 持续触发事件，在一定时间内没有在触发事件就会执行
 */
function shake(fn, deley) {
    let timer = null
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, deley)
    }
}