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