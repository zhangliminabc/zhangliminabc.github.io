// [] -> push function -> 监控数据每次push进入的callback


let data = [];

let proxy = new Proxy(data, {
    set(target, key, value, receiver) {
        // console.log(target, key, value, receiver);
        if (typeof value === 'function') {
            value(key)
        }
        Reflect.set(target, key, value, receiver);
        return true
    },
})
proxy.push(function(key) {
    console.log(key);
})

proxy.push(function(key) {
    console.log(key);
})


//数据源
// let vm = {
//     list: [1, 2, 3, 4]
// }

// let vmProxy = new Proxy(vm.list, {
//     set(target, prop, value) {
//         console.log(`Setting: ${value}`);
//         Reflect.set(target, prop, value);
//         return true;
//     }
// })

// vmProxy.push("d")

// const data = [1, 2, 3, 4, [7, 8]]

// function formatData(data, result = []) {
//     for (let i = 0; i < data.length; i++) {
//         const value = data[i]
//         if (Array.isArray(value)) {
//             formatData(value, result)
//         } else {
//             result.push(value)
//         }
//     }
//     return result
// }

// console.log(formatData(data))

// object: { key: value },
// object[key]

// Map: { key: any}
// map.set(key, value)
// map.has(key)

// localStorage:
// sessionStorage

// 
// var any
// null - typeof -> property

// function handler(fn, deleyTime) {
// 	let timer = null
// 	return function () {
// 		const args = arguments
// 		if (timer) {
// 			window.clearTimeout(timer)
// 		}
// 		timer = setTimeout(fn.call(this, ...args), deleyTime)
// 	}
// }


// const list = [
//     { id: 1, name: 'a' },
//     { id: 2, name: 'b' },
//     { id: 1, name: 'c' },
//     { id: 4, name: 'd' },
// ]

// function formatData(data) {
//     const result = []
//     const map = {}
//     for (let i = 0; i < data.length; i++) {
//         const item = data[i]
//         const { id } = item
//         if (map[id]) {
//             continue
//         } else {
//             result.push(item)
//             map[id] = item
//         }
//     }
//     return result
// }

// console.log(formatData(list))

// 10w + -> 


// 	div -> totalheight

// height / 100 = nums

// div -height  = 0 -nums * 100
// div 
// div -> height = nums - total * 100

// offset -> 100px -> 50 - 150

// page -> requestAnimationFrame()

// 并行 3promise -> 2promise -> 3promsie
// function addTesk(plist, maxNum = 2) {
//     const len = plist.length;
//     let count = 0
//     const result = new Array(len).fill(false)

//     return new Promise((resolve, reject) => {
//         while (count < maxNum) {
//             next()
//         }

//         function next() {
//             let start = count++;
//             if (count >= len) {
//                 resolve(result)
//             }
//             console.log("开始", start)
//             const cur = plist[start]
//             cur.then((data) => {
//                 console.log('结束', start, data)
//                 result[start] = data
//                 if (count < len) {
//                     next()
//                 }
//             }, (err) => {
//                 result[start] = err
//                 if (count < len) {
//                     next()
//                 }
//             })
//         }

//     })
// }

// const plist = [1, 2, 3, 4].map(value => {
//     return new Promise((resolve, reject) => {
//         resolve(value)
//     })
// })

// addTesk(plist).then(res => {
//     console.log(res)
// })