// ====== EDIT YOUR CONTENT HERE ======
const posts = [
  {title:"Why I chose AI & Data Science",category:"Journey",date:"2026-09-20",
   summary:"What pulled me into this branch and what I hoped to learn.",
   body:["Write your story here: what made you curious about AI, and what surprised you in your first year at REVA.","Tip: keep each paragraph as a separate string in this list."]},
  {title:"Python basics I wish I'd practised earlier",category:"Python",date:"2026-09-12",
   summary:"Lists, dictionaries and functions, explained the way I finally understood them.",
   body:["Share the Python concepts that clicked for you and the exercises that helped.","Add a small code example or a mistake you made and how you fixed it."]},
  {title:"My first data analysis with Pandas",category:"Data Science",date:"2026-08-30",
   summary:"Cleaning a messy dataset and finding my first real insight.",
   body:["Describe the dataset, the cleaning steps and what you found.","Mention the tools you used, such as Pandas, Matplotlib or Jupyter Notebook."]},
  {title:"Building this website from scratch",category:"Web Development",date:"2026-08-18",
   summary:"HTML, CSS and JavaScript lessons from making my own blog.",
   body:["Talk about what was hard (layout? responsiveness?) and what you enjoyed.","You can also explain how you published it with GitHub Pages."]},
  {title:"Lessons from our college mini project",category:"College Projects",date:"2026-08-05",
   summary:"Teamwork, deadlines and what our group would do differently.",
   body:["Describe the project, your role and the biggest challenge.","End with one lesson you'll carry into the next project."]},
  {title:"My learning roadmap for this semester",category:"Journey",date:"2026-07-28",
   summary:"The topics, courses and habits I'm focusing on right now.",
   body:["List your goals for the semester and how you plan to track them.","Update this post as you make progress."]}
];

const projects = [
  {name:"Student Marks Analyzer",desc:"Analyses class marks and shows averages and trends with charts.",stack:["Python","Pandas","Matplotlib"]},
  {name:"Personal Blog Website",desc:"This site, built with plain HTML, CSS and JavaScript.",stack:["HTML","CSS","JavaScript"]},
  {name:"Add your next project",desc:"Replace this card with a college or personal project you're proud of.",stack:["Your tools"]}
];

const skills = [
  {name:"Python",level:75,note:"Functions, OOP basics, file handling"},
  {name:"Data Science",level:55,note:"Pandas, NumPy, data visualisation"},
  {name:"Machine Learning",level:35,note:"Regression, classification, scikit-learn"},
  {name:"Web Development",level:60,note:"HTML, CSS, JavaScript, Git and GitHub"}
];
// ====================================

const $ = id => document.getElementById(id);
const fmt = d => new Date(d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});
let active = "All";

function renderFilters(){
  const cats = ["All",...new Set(posts.map(p=>p.category))];
  $("filters").innerHTML = cats.map(c=>`<button class="chip" aria-pressed="${c===active}" data-c="${c}">${c}</button>`).join("");
}
function renderPosts(){
  const list = posts.filter(p=>active==="All"||p.category===active).sort((a,b)=>b.date.localeCompare(a.date));
  $("posts").innerHTML = list.map(p=>`<button class="card" data-t="${p.title}"><p class="meta">${p.category} · ${fmt(p.date)}</p><h3>${p.title}</h3><p>${p.summary}</p></button>`).join("");
}
$("filters").addEventListener("click",e=>{
  const b = e.target.closest("button"); if(!b) return;
  active = b.dataset.c; renderFilters(); renderPosts();
});
$("posts").addEventListener("click",e=>{
  const b = e.target.closest(".card"); if(!b) return;
  const p = posts.find(x=>x.title===b.dataset.t);
  $("dMeta").textContent = `${p.category} · ${fmt(p.date)}`;
  $("dTitle").textContent = p.title;
  $("dBody").innerHTML = p.body.map(t=>`<p>${t}</p>`).join("");
  $("postDialog").showModal();
});
$("closeBtn").onclick = () => $("postDialog").close();
$("postDialog").addEventListener("click",e=>{ if(e.target===e.currentTarget) e.currentTarget.close(); });

$("projectGrid").innerHTML = projects.map(p=>`<article class="card"><h3>${p.name}</h3><p>${p.desc}</p><div class="stack">${p.stack.map(s=>`<span>${s}</span>`).join("")}</div></article>`).join("");
$("skills").innerHTML = skills.map(s=>`<div class="card skill"><b>${s.name}<span>${s.level}%</span></b><div class="bar"><i style="width:${s.level}%"></i></div><small>${s.note}</small></div>`).join("");

// Theme
const root = document.documentElement;
function setTheme(t){ root.dataset.theme=t; $("themeBtn").textContent = t==="dark"?"Light":"Dark"; try{localStorage.setItem("theme",t)}catch(e){} }
let saved; try{saved=localStorage.getItem("theme")}catch(e){}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
$("themeBtn").onclick = () => setTheme(root.dataset.theme==="dark"?"light":"dark");

// Mobile menu
$("menuBtn").onclick = () => { const o=$("navLinks").classList.toggle("open"); $("menuBtn").setAttribute("aria-expanded",o); };
$("navLinks").addEventListener("click",e=>{ if(e.target.tagName==="A") $("navLinks").classList.remove("open"); });

$("year").textContent = new Date().getFullYear();
renderFilters(); renderPosts();
