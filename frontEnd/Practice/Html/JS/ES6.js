// i create a simple html file to run js on browser


let array = ["Azeem", "Ali", "Usman", "dawood", "usamashabirbhatti"]
var newArray = array
console.log(newArray)

console.log('//------------------arrow function------------------')

console.log(array.map((ele) => ele.length))

var value = () => array.length * 10 //not reqired return
var value = () => {
    console.log('function run')
    return array.length * 10
}
console.log('//----------------------rest operator----------------------')
var value = (...args) => args.map((ele) => ele += ele)//rest operator
var value = (...args) => {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i]
    }
    return sum
}
console.log(value(1, 2, 3, 4, 5, 6))

console.log('//----------------------spread Operator----------------------')
let arr1 = [1, 2, 3, 4, 5]
let arr2 = ['azeem', 'azam', 'ali', 'usman']

arr3 = [...arr1, ...arr2]
console.log(arr3)

var obj1 = {
    title: 'The lion',
    image: 'http//:lionstoryimage.org',
    story: 'a lion live happily',
    level: 5,
}

var color = "#fffff"

finalObject = { ...obj1, color }
console.log(finalObject)

console.log('//----------------------destructring----------------------')
var { title, story } = obj1 //use same name(different name cause error)
// console.log(title)
// console.log(story)
obj2 = {
    title, //using same name access the value
    story
}
console.log(obj2)

const genresString = "nature moral funny horror"
genres = genresString.split(" ")

finalObject = { ...obj1, color, genres }
console.log(finalObject)

console.log('//-------------------array function: map-------------------')
var newObj = arr3.map((element) => {
    if (isNaN(element)) {
        return "my name is " + element
    }
    else return element
})

console.log(newObj)
console.log(arr3)//remain same previous values not update



console.log('//-------------------split function-------------------')
const genresString1 = "nature moral funny horror"
genres = genresString1.split(" ")



console.log('//-------------------function: reduce-------------------')
//return a value and we use previous value
var sum = ([1, 2, 3, 4, 5]).reduce((acc, element) => acc + element, 0)
console.log(sum)

multiObject = [{
    title: 'The lion',
    image: 'http//:lionstoryimage.org',
    story: 'a lion live happily',
    level: 5,
},
{
    title: 'The crow',
    image: 'http//:crowstoryimage.org',
    story: 'a crow live happily',
    level: 10,
}]
console.log(multiObject)
var totalLevel = multiObject.reduce((acc, ele) => acc + ele.level, 0)
console.log(totalLevel)


console.log('//-------------------function:  filter-------------------')
//if the function return true value it add the item in array and not if false
filterArray = multiObject.filter(item => item.level >= 10)
console.log(filterArray)

console.log('//-------------------function:  findIndex and find()-------------------')
const numArray = [-1, -2, -3, -4, 1, 2, 3, 4, 5]
const result = numArray.find(item => item % 2 === 0 && item >= 0)
console.log(result)

const index = numArray.findIndex(item => item % 2 === 0 && item >= 0)
console.log(index)

console.log('//-------------------function:  splice-------------------')
const fruits=['apple','banana','mango','lemon','kiwi']

fruits.splice(2,0,'orange','watermelon')
console.log(fruits)


console.log('//-------------------classes and oop-------------------')
//    using function
function Person(name, dateOfBirth) {
    this.name = name
    this.dateOfBirth = dateOfBirth
    this.getDetail = () => `Name: ${name}\nAge: ${2024 - dateOfBirth}`
}

var john = new Person('john', 1913)
console.log(john.getDetail())

//    using classes
class PersonNew {
    constructor(name, birthYear) {
        this.name = name
        this.birthYear = birthYear
    }
    getDetail = () => `Name: ${this.name}\nAge: ${2024 - this.birthYear}`
}

var ali = new PersonNew('Ali', 1990)
console.log(ali.getDetail())

//inheritence
class pilot extends PersonNew{
    constructor(name,birthYear,exp,type,license){
        super(name,birthYear);
        this.experience=exp
        this.type=type
        this.license=license
    }
    getData=()=>`${this.getDetail()}\nExperience: ${this.experience}\nType: ${this.type}\nLicense: ${this.license}`
}

var rashid=new pilot('Rashid',1985,10,'Fighter','PAF11001')
console.log(rashid.getData())


console.log('//----------------------------iterables----------------------------')
let arr4=[]
for (const x of "w3Schools"){
    arr4.push(x)
}
console.log(arr4)