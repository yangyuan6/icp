import { FuncClass } from "@dfinity/candid/lib/cjs/idl";
import { microblog } from "../../declarations/microblog";
//post
async function post(){
    let post_button =document.getElementById("post");
    post_button.disabled = true;
    let error = document.getElementById("error");
    error.innerText = "";
    let textarea  = document.getElementById("message");
    let otp = document.getElementById("otp").value;
    let text = textarea.value;
    try{
      await microblog.post(
        /*otp,*/  
        text);
      textarea.value = "";
    } catch (err){
      console.log(err)
      error.innerText= "Post Failed!";
    }
    
    post_button.disabled=false;
}
var num_posts = 0;
async function load_posts(){
  let posts_section = document.getElementById("posts");
  let posts = await microblog.posts(0);
  if (num_posts == posts.length) return ;
  posts_section.replaceChildren([]);
  num_posts =posts.length;
  for (var i=0; i<posts.length; i++){
    let post = document.createElement("p");
    post.innerText = posts[i].text
    posts_section.appendChild(post)
  }
}


//follow
// async function follow(){
//   let post_button =document.getElementById("follow");
//   post_button.disabled = true;
//   //let error = document.getElementById("error");
//   //error.innerText = "";
//   let textarea  = document.getElementById("followee");
//   //let otp = document.getElementById("otp").value;
//   let text = textarea.value;
//   try{
//     await microblog.follow(text);
//     textarea.value = "";
//   } catch (err){
//     console.log(err)
//     //error.innerText= "Post Failed!";
//   }
  
//   post_button.disabled=false;
// }

var num_follows = 0;
async function load_follows(){
  let follows_section = document.getElementById("followedname");
  let follownames = await microblog.followsname();//[Text]
  let allposts_section = document.getElementById("allposts");
  console.log("num_follows:"+num_follows);
  if (num_follows == follownames.length) return ;
  follows_section.replaceChildren([]);
  num_follows =follownames.length;
  
  for (var i=0; i<follownames.length; i++){
    let followname = document.createElement("button");
    followname.innerText = follownames[i];

    followname.onclick = async function(){
      allposts_section.replaceChildren([]);
      let allposts = await microblog.allposts(followname.innerText);//return [Message]
      let clickon = document.createElement("p");
      clickon.innerText = "You clicked on "+followname.innerText+". His posts as followed : " ;
      allposts_section.appendChild(clickon); 
      for (var j=0; j<allposts.length; j++){
        let allpost = document.createElement("p");
        allpost.innerText = allposts[j].text;
        console.log("innerText: "+allpost.innerText);
        allposts_section.appendChild(allpost);
      };
    };
    //finished
    
    follows_section.appendChild(followname);
    
  }
}


//timeline

async function follow(){
  let post_button =document.getElementById("follow");
  post_button.disabled = true;
  //let error = document.getElementById("error");
  //error.innerText = "";
  let textarea  = document.getElementById("followee");
  //let otp = document.getElementById("otp").value;
  let text = textarea.value;
  try{
    await microblog.follow(text);
    textarea.value = "";
  } catch (err){
    console.log(err)
    //error.innerText= "Post Failed!";
  }
  
  post_button.disabled=false;
}

var num_timelines = 0;
async function load_timelines(){
  let timelines_section = document.getElementById("timeline");
  let timeline = await microblog.timeline(0);
  console.log("num_timelines:"+num_timelines);
  if (num_timelines == timeline.length) return ;
  timelines_section.replaceChildren([]);
  num_timelines =timeline.length;
  for (var i=0; i<timeline.length; i++){
    let timelineElement = document.createElement("p");
    timelineElement.innerText = " Author: "+timeline[i].author+"\n message: "
    +timeline[i].text+"\n time: "+timeline[i].time;
    timelines_section.appendChild(timelineElement)
  }
}

//load

function load(){
  //post
  let post_button = document.getElementById("post");
  post_button.onclick =post;
  load_posts();
  setInterval(load_posts,3000);

  let follow_button = document.getElementById("follow");
  follow_button.onclick =follow;
  load_follows();
  setInterval(load_follows,3000);
  load_timelines();
  //setInterval(load_timelines,3000);
}

window.onload = load