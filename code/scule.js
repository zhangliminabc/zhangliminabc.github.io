// 并发请求控制


function promoseMap(plist, maxNum) {
    if (plist.length <= 0) return;
    const result = new Array(maxnum).fill(false);

    const res = (currrentIndex, asyncP) => {
        return asyncP.then((resp) => {
            result[currrentIndex] = resp
        }, (error) => {
            result[currrentIndex] = error
        })
    }

    for (let i = 0; i < plist.length; i++) {
        if (i <= maxNum) {
            res(1, plist[i])
        } else {
            break
        }
    }
}

function multiRequest(urls = [], maxNum) {
    // 请求总数量
    const len = urls.length;
    // 根据请求数量创建一个数组来保存请求的结果
    const result = new Array(len).fill(false);
    // 当前完成的数量
    let count = 0;

    return new Promise((resolve, reject) => {
        // 请求maxNum个
        while (len) {
            if (count < maxNum) {
                next();
            } else {

            }
        }

        function next(i) {
            count++
            const url = urls[i];
            console.log(`开始 ${i}`, new Date().toLocaleString());
            fetch(url)
                .then((res) => {
                    len--
                    // 保存请求结果
                    result[current] = res;
                    console.log(`完成 ${i}`, new Date().toLocaleString());
                })
                .catch((err) => {
                    len--
                    console.log(`结束 ${i}`, new Date().toLocaleString());
                    result[current] = err;
                });
        }
    });
}