const box = document.getElementById("news");
const statusText = document.getElementById("status");
const select = document.getElementById("source");
const tabs = document.querySelectorAll(".tabs button");
const alertBox = document.getElementById("alert");

let allItems = [];
let currentCategory = "all";

const categoryMap = {
  gundem: ["gundem","turkiye","politika","siyaset","son dakika"],
  spor: ["spor","futbol","basketbol","voleybol","lig"],
  ekonomi: ["ekonomi","finans","dolar","borsa","altin","enflasyon"],
  dunya: ["dunya","world","amerika","avrupa","uluslararasi"],
  teknoloji: ["teknoloji","bilim","internet","yapay zeka","mobil"]
};

function normalize(t){
  return t.toLowerCase()
    .replaceAll("ı","i")
    .replaceAll("ğ","g")
    .replaceAll("ş","s")
    .replaceAll("ö","o")
    .replaceAll("ü","u")
    .replaceAll("ç","c");
}

function detectCategory(item){
  const pool = [
    ...(item.categories || []),
    item.title
  ].map(normalize).join(" ");

  for(const [cat, keys] of Object.entries(categoryMap)){
    if(keys.some(k => pool.includes(k))) return cat;
  }
  return "gundem";
}

function getImage(item){
  return item.thumbnail ||
         item.enclosure?.link ||
         item.content?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
         null;
}

function formatDate(d){
  return d ? new Date(d).toLocaleString("tr-TR") : "";
}

function render(){
  box.innerHTML = "";

  allItems
    .filter(i => currentCategory==="all" || detectCategory(i)===currentCategory)
    .slice(0,12)
    .forEach(item=>{
      const card = document.createElement("div");
      card.className = "card";

      const imgUrl = getImage(item);
      if(imgUrl){
        const img = document.createElement("img");
        img.src = imgUrl;
        card.appendChild(img);
      }

      const content = document.createElement("div");
      content.className = "content";

      const title = document.createElement("div");
      title.className = "title";
      title.textContent = item.title;

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = `${item.author || "Kaynak"} • ${formatDate(item.pubDate)}`;

      const tags = document.createElement("div");
      tags.className = "tags";
      (item.categories || []).slice(0,4).forEach(t=>{
        const s = document.createElement("span");
        s.textContent = t;
        tags.appendChild(s);
      });

      const article = document.createElement("div");
      article.className = "article";
      article.innerHTML = item.description || "";

      const read = document.createElement("a");
      read.className = "read";
      read.href = item.link;
      read.target = "_blank";
      read.textContent = "Habere git";

      content.append(title, meta, tags, article, read);
      card.appendChild(content);
      box.appendChild(card);
    });
}

async function loadNews(){
  const api = "https://api.rss2json.com/v1/api.json?rss_url=" +
              encodeURIComponent(select.value);

  statusText.textContent = "Yükleniyor...";
  alertBox.classList.add("hidden");

  try{
    const res = await fetch(api);
    if(!res.ok) throw {type:"HTTP", code:res.status};

    const data = await res.json();
    if(!data.items) throw {type:"PARSE", code:1001};

    allItems = data.items;
    render();
    statusText.textContent = "";

  }catch(e){
    statusText.textContent = "";

    let msg = "Bağlantı hatası";
    let code = "NET-01";

    if(e.type==="HTTP"){ msg="Sunucu hatası"; code=e.code; }
    if(e.type==="PARSE"){ msg="RSS bozuk"; code=e.code; }

    alertBox.innerHTML = `⚠ ${msg}<br>Hata Kodu: <b>${code}</b>`;
    alertBox.classList.remove("hidden");
  }
}

tabs.forEach(b=>{
  b.addEventListener("click", ()=>{
    tabs.forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    currentCategory = b.dataset.cat;
    render();
  });
});

select.addEventListener("change", loadNews);

loadNews();
setInterval(loadNews,60000);