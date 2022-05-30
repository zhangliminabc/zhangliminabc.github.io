// // function repeat(fn, num, time) {

// //     return function() {
// //         let count = num
// //         const args = arguments

// //         const formaetFn = () => {
// //             // if (!timer) {
// //             //     fn.apply(this, args)
// //             // }

// //             // timer = setTimeout(() => {
// //             //     console.log(new Date().getTime())
// //             //     fn.apply(this, args)
// //             // }, time)
// //         }

// //         while (count > 0) {
// //             formaetFn()
// //             count--
// //         }
// //     }
// // }

// // const repeatFunc = repeat(console.log, 4, 1000);
// // repeatFunc("helloworld");
// // repeatFunc("helloworld2");


// sum(1, 2, 3).valueOf(); // 6
// sum(2, 3)(2).valueOf(); // 7
// sum(1)(2)(3)(4).valueOf(); // 10
// sum(2)(4, 1)(2).valueOf(); // 9

// function sum(fn, ...args) {
//     const params = Array.prototype.slice.call(arguments, 1);
//     if (params.length >= fn.length) {
//         return fn(...args)
//     } else {
//         return (args) => curry(fn, ...params, args)
//     }
// }

// promise.then / MutationObserver


// // offset -> dom

// // tree -> next()

// promise.resolve

new Promise((resolve, reject) => {}).then(() => {
    console.log('data')
})
promise - > resolve
promise - > promise - > defer - >