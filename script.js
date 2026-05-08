const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars(count){
  stars = [];
  for(let i = 0; i < count; i++){
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5, // ขนาดเล็กมาก
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.6 + 0.4
    });
  }
}

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let s of stars){

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

    // ⭐ สีขาว + วิบวับ
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();

    // เคลื่อนลงช้า ๆ
    s.y += s.speed;

    // reset ถ้าหลุดจอ
    if(s.y > canvas.height){
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }

    // twinkle
    s.alpha += (Math.random() - 0.5) * 0.05;
    if(s.alpha < 0.1) s.alpha = 0.1;
    if(s.alpha > 1) s.alpha = 1;
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
  resize();
  createStars(120); // ปรับจำนวนดาวตรงนี้
});

resize();
createStars(120);
drawStars();
const cards = document.querySelectorAll(".card");

const intros =
  document.querySelectorAll(".intro");

const result =
  document.getElementById("result");

const linesEl =
  document.getElementById("lines");

let opened = false;

async function loadWords(){

  const res =
    await fetch("365word.json");

  return await res.json();
}

function getDayOfYear(){

  const now = new Date();

  const start =
    new Date(now.getFullYear(), 0, 0);

  const diff = now - start;

  const oneDay =
    1000 * 60 * 60 * 24;

  return Math.floor(diff / oneDay);
}

cards.forEach(card => {

  card.addEventListener("click", async () => {

    if(opened) return;

    opened = true;

    const data =
      await loadWords();

    const day =
      getDayOfYear();

    const index =
      day % data.length;

    const todayWord =
      data[index];

    // ซ่อนการ์ดอื่น
    cards.forEach(c => {

      if(c !== card){

        c.classList.add("fade-out");
      }
    });

    // ซ่อน title/subtitle
    intros.forEach(el => {

      el.classList.add("fade-out");
    });

    // การ์ดลอยกลางจอ
    setTimeout(() => {

      card.classList.add("selected");

    }, 300);

    // พลิกการ์ด
    setTimeout(() => {

      const title =
        card.querySelector(".card-title");

      title.innerHTML =
        `THE<br>${todayWord.word}`;

      card.classList.add("flipped");

    }, 1200);

    // แสดงข้อความ
    setTimeout(() => {

      result.classList.remove("hidden");

      linesEl.innerHTML = "";

      todayWord.lines.forEach(
        ([letter, text], i) => {

          const div =
            document.createElement("div");

          div.className = "line";

          div.style.animationDelay =
            `${i * .25}s`;

          div.innerHTML =
            `<strong>${letter}</strong> — ${text}`;

          linesEl.appendChild(div);
      });

    }, 2200);

  });

});
