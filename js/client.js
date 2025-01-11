const socket = io("http://192.168.100.47:8000")
// 

var audio =  new Audio('../noti.mp3')

const form  = document.getElementById("form")
const button  = document.getElementById("button")
const input  = document.getElementById("input")
const messageContainer = document.querySelector(".container")

form.addEventListener("submit",(e)=>{
e.preventDefault();
const message = input.value;
append(`You: ${message}`,'right')
socket.emit("send",message)
input.value=''
})


const append = (message,position)=>{
const messageElement = document.createElement('div')
messageElement.innerText = message
messageElement.classList.add(position)
messageContainer.append(messageElement)
if(position == "left"){
    audio.play()
}
}

let text = prompt("Enter Your Name to join");
socket.emit("new-user-joined",  text)
socket.on("user-joined",text=>{
append(`${text} Joined the chat`,"right")
})
socket.on("received",data =>{
    // append(`")
    append(`${data.name} :${data.message} `,"left")
    })
socket.on("left",name=>{
    append(`${name} Left the chat`,"right")
})