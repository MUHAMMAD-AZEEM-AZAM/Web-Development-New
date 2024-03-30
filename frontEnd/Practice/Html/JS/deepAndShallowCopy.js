console.log('//---------------------shallow copy---------------------')

const myfruits=['apple','banana','mango','lemon','kiwi']

fruits.splice(2,0,'orange','watermelon')
var newFruit=myfruits
newFruit.push('strawberry')
console.log(newFruit)
console.log(myfruits)


obj3={
    name:'ali',
    class:'C'
}

////uncomment this cause to create shallow copy so the code in deep copy can't work properly
// obj4=obj3
// console.log(obj4)
// obj4['roll']=22
// console.log(obj3)
// console.log(obj4)

console.log('//---------------------deep copy---------------------')
obj4={...obj3}
console.log(obj4)
obj4['roll']=22
console.log(obj3)
console.log(obj4)

deepcopyFruit=[...myfruits]
deepcopyFruit.push('blueBerry')
console.log(deepcopyFruit)
console.log(myfruits)

var a=10
var b=a
b++
console.log(a)//10
console.log(b)//11
