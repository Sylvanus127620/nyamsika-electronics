document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
const escapeHTML = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function videoLink(url){
  if(!url) return "";
  let safe = String(url).trim();
  if(!/^https:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com|[a-z0-9.-]+)\/?/i.test(safe)) return "";
  return `<a class="post-video" href="${escapeHTML(safe)}" target="_blank" rel="noopener">▶ Watch video ↗</a>`;
}
async function loadPosts(){
 const root=document.getElementById("posts");
 try{
  const r=await fetch("content/posts.json? v="+Date.now());
  if(!r.ok) throw new Error("Posts file not found");
  const data=await r.json(); const posts=Array.isArray(data.posts)?data.posts:[];
  if(!posts.length){root.innerHTML='<div class="empty">There are no updates yet. Please check back soon.</div>';return;}
  posts.sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  root.innerHTML=posts.map(p=>`<article class="post-card">${p.image?`<img class="post-image" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)}" loading="lazy">`:'<div class="post-image"></div>'}<div class="post-body"><div class="post-meta">${escapeHTML(p.category||"UPDATE")} · ${escapeHTML(p.date||"")}</div><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.body||"")}</p>${videoLink(p.video)}</div></article>`).join("");
 }catch(e){root.innerHTML='<div class="empty">Updates are temporarily unavailable. Please check back later.</div>';}
}
loadPosts();
