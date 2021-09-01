// 从未排序中找到最大最小值，存放到排序序列的起始位置； 然后在从剩余未排序中继续寻找最大最小值，然后放在已排序的未尾

const selectionSort = (list) => {
    let minIndex = 0;

    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        minIndex = index

        for (let j = index + 1; j < list.length; j++) {
            const cur = list[j];
            if (cur < list[minIndex]) {
                minIndex = j
            }
        }
        if (minIndex !== index) {
            const temp = list[index]
            const min = list[minIndex]
            list[minIndex] = temp
            list[index] = min
        }
    }

    return list

}
const data = [4, 6, 7, 3, 1, 0]
console.log(selectionSort(data))