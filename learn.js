// const insertionSort = function (array) {
//   console.log('****************')
//   console.log('array: ' + array)
//   for (let i = 1; i < array.length; i++) {
//     console.log('i is ' + i)
//     for (let j = 0; j < i; j++) {
//       if (array[i] < array[j]) {
//         console.log('i is ' + i)
//         console.log('j is ' + j)
//         console.log('array[i]: ' + array[i])
//         console.log('array[j]: ' + array[j])
//         const temp = array.splice(i, 1)
//         console.log(temp)
//         console.log(array)
//         console.log('------------------')
//         array.splice(j, 0, temp[0])
//         console.log(temp[0])
//         console.log(array)
//         console.log('------------------')
//         console.log('------------------')
//       }
//     }
//   }
//   return array
// }
// ********************
// ********************
// ********************
// const arrayNum = [5, 41, 32, 29, 10]
// insertionSort(arrayNum)
// const array = [5, 41, 32, 29, 10]
// for (let i = 1; i < array.length; i++) {
//   console.log('i is ' + i)
//   for (let j = 0; j < i; j++) {
//     if (array[i] < array[j]) {
//       console.log('i is ' + i)
//       console.log('j is ' + j)
//       console.log('array[i]: ' + array[i])
//       console.log('array[j]: ' + array[j])
//       const temp = array.splice(i, 1)
//       console.log(temp)
//       console.log(array)
//       console.log('------------------')
//       array.splice(j, 0, temp[0])
//       console.log(temp[0])
//       console.log(array)
//       console.log('------------------')
//       console.log('------------------')
//     }
//   }
// }

var promise1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('foo')
  }, 300)
})

promise1.then(function (value) {
  console.log(value)
  // expected output: "foo"
})

console.log(promise1)
