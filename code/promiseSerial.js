/**
 * 并行: 多个异步请求同时进行
 */

function promiseSerial(list, maxNum) {
    // promise成功结果存储
    const result = new Array(list.length).fill(false)
    let len = list.length - 1
        // 当前完成的数量
    let count = 0

    return new Promise((resolve, reject) => {
        if (count < maxNum) {
            next()
        }

        function next() {
            let curent = count++;
            if (curent >= len) {
                resolve(result)
                return
            }
            const cur = list[curent]
            fetch(cur).then(res => {
                result[current] = res
                if (current <= len) {
                    next()
                }
            }, (error) => {
                result[current] = error
                if (current <= len) {
                    netx()
                }
            })

        }

    })
}

function promiseSerial(list, maxNum) {
    const len = list.length
    const result = new Array(len).fill(false)

    const asyncList = []
    let startIndex = 0


    const fetch = (i) => {
        const url = list[i]
        fetch(url).then(res => {
            result[i] = res
            asyncList.splice(i, 1)
        })
    }


    while (startIndex < len) {

        if (asyncList.length < maxNum) {
            asyncList.push(fetch(startIndex))
        }

    }


}