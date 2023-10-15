// let swap = document.querySelector("#swap");
let send_btn = document.querySelector("#btn");
let chatbot = document.querySelector(".chatbot");
let chat_input_area = document.querySelector(".chat-input textarea");
let togglerclass= document.querySelector(".chatbot_toggler")
const 
apikey="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";
let phone_btn =document.querySelector(".phone_btn");

//chat banaune.
const createchat = (message, classname) => {
  const chatli = document.createElement("li");
  chatli.classList.add("chat", classname);
  const content =
    classname === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span> <p></p>`;
  chatli.innerHTML = content;
  chatli.querySelector("p").textContent=message;
  return chatli;
};

const bringresponse=(incomingchatli)=>{
    const GPTresponse=incomingchatli.querySelector("p");
    const API_url="https://api.openai.com/v1/chat/completions";
    const requestOption={
    method:"Post",
    headers:{
     "Content-Type": "application/json" ,
    "Authorization": `Bearer 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`
    },
    body:JSON.stringify({
        model: "gpt-3.5-turbo",
        messages:[{role:"user",content:user_message}]
    })
}
fetch(API_url,requestOption).then((Res)=>{
  return Res.json();
})
.then((data)=>{
  console.log(data)
  GPTresponse.textContent=data.choices[0].message.content;
})
.catch((error)=>{
  GPTresponse.textContent="Opps!!! something went wrong"
})
.finally(()=>{
  chatbot.scrollTo(0,chatbot.scrollHeight)
})
}

const handlechat = () => {
  user_message = chat_input_area.value.trim();
  chat_input_area.value = "";
  chatbot.appendChild(createchat(user_message, "outgoing"));

  setTimeout(()=>{
    const incomingchatli=createchat("Wait bitch i'm thinking!!!!", "incoming");
    chatbot.appendChild(incomingchatli);
    bringresponse(incomingchatli);
    chatbot.scrollTo(0,chatbot.scrollHeight)
  },200)
};

send_btn.addEventListener("click", handlechat)

chat_input_area.addEventListener("keypress",function(e){
  if (e.key === 'Enter')
  {
    handlechat();
  }
})
togglerclass.addEventListener("click",()=>{
  document.body.classList.toggle("show_chatbox")
  rotbtn();
  
})
phone_btn.addEventListener("click",()=>{
  document.body.classList.remove("show_chatbox")
 rotbtn();
})
function rotbtn()
{
  if (swap.innerText === "mode_comment") {
    swap.innerHTML = "close";
    swap.classList.add("material-symbols-outlined");
    swap.id = "swap";
    
  } else {
    swap.innerHTML = "mode_comment";
    swap.classList.add("material-symbols-outlined");
    swap.id = "swap";
  
}
}