// 冒泡排序： 比较相邻两个元素之间的大小，前者大于后者两个交换位置，经过n-1轮之后得出排序

const bubbleSort = (list) => {

    const len = list.length;
    let isSwapped

    do {
        isSwapped = false;
        for (let i = 1; i < len; i++) {
            if (list[i - 1] > list[i]) {
                const temp = list[i - 1]
                list[i - 1] = list[i]
                list[i] = temp
                isSwapped = true
            }
        }
    } while (isSwapped);
}