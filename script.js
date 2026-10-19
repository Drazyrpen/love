
const gardenScene = document.getElementById("gardenScene");
const garden = document.getElementById("garden");
const stars = document.getElementById("stars");
const floatingLayer = document.getElementById("floatingLayer");

const planeButton = document.getElementById("openLetter");
const cardScene = document.getElementById("cardScene");
const letterText = document.getElementById("letterText");
const signature = document.getElementById("signature");
const backButton = document.getElementById("backButton");

let opened = false;
let floatingTimer = null;
let typingTimer = null;

// ===== NỘI DUNG LỜI CHÚC =====
const message =
  "Chào Người Đẹp\n" +
  "Ta chỉ muốn gửi đến nàng những lời chúc tôt đẹp nhất\n" +
  "Mong những điều dịu dàng nhất sẽ đến với nàng,\n" +
  "Cảm ơn nàng vị mọi thứ, cảm ơn nàng đã luôn chọn ở lại bên anh, luôn cùng anh trong những khoảng khác vui buồn của cuộc sống\n" +
  "Tuy có những lúc làm em không vui hay khó chịu, cả những lúc làm em đau.....\n"+
  "Anh chỉ muốn nói rằng anh xin lỗi, anh yêu em nhiều lắm đừng buồn anh nữa nhé\n"+
  "Chúc em có một ngày 20/10 vui vẻ\n"+
  "Mong em luôn xinh đẹp, luôn nở nụ cười trên môi đó mới là lúc em đẹp nhất\n"+
  "Chúc cho em luôn đạt được những thứ mình muốn\n"+
  "Chúc cho em luôn hạnh phúc, mong ràng những thứ làm cho em buồn sẽ tan biến hết!\n"+
  "Đừng bận lòng nữa nhé anh thương bé lắm nè\n"+
  "Chúc cho gia đình em nhiều sức khỏe và luôn thành công trong cuộc sống!\n"+
  "BÉ YÊU NGỦ NGOAN ĐI NHÉEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE"
  ;

const signatureText = "Gửi nàng, từ DraZy ♥";

// ===== TẠO SAO =====
function createStars() {
  const symbols = ["✦", "✧", "·", "⋆"];

  for (let i = 0; i < 85; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 75}%`;
    star.style.fontSize = `${6 + Math.random() * 12}px`;
    star.style.setProperty(
      "--twinkle-duration",
      `${1.2 + Math.random() * 3}s`
    );
    star.style.animationDelay = `${Math.random() * 3}s`;

    stars.appendChild(star);
  }
}

// ===== TẠO HOA SVG =====
const flowerColors = [
  { petal: "#ff8fcf", center: "#ffe4a0" },
  { petal: "#f7a4e4", center: "#fff0b0" },
  { petal: "#cda5ff", center: "#ffe4a1" },
  { petal: "#ffb6c9", center: "#fff0ad" },
  { petal: "#f58bd5", center: "#ffe3a1" },
  { petal: "#e6aaff", center: "#fff0b0" },
  { petal: "#ff9ecb", center: "#ffe9a7" }
];

function createFlower(index) {
  const wrapper = document.createElement("div");
  const palette = flowerColors[
    Math.floor(Math.random() * flowerColors.length)
  ];

  const size = 48 + Math.random() * 48;
  const height = 105 + Math.random() * 105;

  wrapper.className = "flower";
  wrapper.style.left = `${Math.random() * 100}%`;
  wrapper.style.setProperty("--flower-size", `${size}px`);
  wrapper.style.setProperty("--flower-height", `${height}px`);
  wrapper.style.setProperty(
    "--grow-delay",
    `${0.2 + Math.random() * 2.5}s`
  );
  wrapper.style.setProperty(
    "--grow-time",
    `${1.5 + Math.random() * 1.5}s`
  );

  const petalPaths = [];
  const petalCount = 8;
  const centerX = 50;
  const centerY = 35;

  for (let i = 0; i < petalCount; i++) {
    petalPaths.push(`
      <ellipse
        cx="${centerX}"
        cy="19"
        rx="9"
        ry="15"
        transform="rotate(${i * 45} ${centerX} ${centerY})"
        fill="${palette.petal}"
        stroke="#ffe5f8"
        stroke-opacity=".65"
        stroke-width="1"
      />
    `);
  }

  wrapper.innerHTML = `
    <svg viewBox="0 0 100 180"
         xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="flowerGlow${index}"
                x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <path
        d="M50 180 Q45 125 50 55"
        fill="none"
        stroke="#69b982"
        stroke-width="3"
      />

      <path
        d="M49 130 Q18 102 20 120 Q31 139 49 130Z"
        fill="#4baf78"
      />

      <path
        d="M50 151 Q80 120 81 138 Q69 157 50 151Z"
        fill="#5ac58a"
      />

      <g filter="url(#flowerGlow${index})">
        ${petalPaths.join("")}
        <circle
          cx="50"
          cy="35"
          r="9"
          fill="${palette.center}"
        />
        <circle
          cx="47"
          cy="32"
          r="2"
          fill="#fff9ce"
        />
      </g>
    </svg>
  `;

  garden.appendChild(wrapper);
}

function createGarden() {
  for (let i = 0; i < 43; i++) {
    createFlower(i);
  }
}

// ===== TẠO BƯƠM BƯỚM SVG =====
function createButterflies() {
  const butterflies = document.querySelectorAll(".butterfly");

  const palettes = [
    ["#ff9cdd", "#c58aff"],
    ["#f9b4f0", "#a98cff"],
    ["#ffb0ce", "#d58aff"]
  ];

  butterflies.forEach((butterfly, index) => {
    const [colorA, colorB] = palettes[index % palettes.length];
    const gradientId = `butterflyGradient${index}`;

    butterfly.innerHTML = `
      <svg viewBox="0 0 100 70"
           xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradientId}"
                          x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${colorA}"/>
            <stop offset="100%" stop-color="${colorB}"/>
          </linearGradient>
        </defs>

        <g class="wing-left">
          <path
            d="M50 35 C38 4 12 0 8 17
               C2 34 24 43 43 39
               C23 49 24 64 37 62
               C47 59 49 46 50 35Z"
            fill="url(#${gradientId})"
            stroke="#ffe2fa"
            stroke-width="1.2"
          />
          <path
            d="M43 28 Q26 18 15 18
               M42 38 Q26 36 16 29"
            fill="none"
            stroke="#fff0ff"
            stroke-opacity=".7"
            stroke-width="1.2"
          />
          <circle cx="26" cy="20" r="3"
                  fill="#fff0ff" opacity=".8"/>
        </g>

        <g class="wing-right">
          <path
            d="M50 35 C62 4 88 0 92 17
               C98 34 76 43 57 39
               C77 49 76 64 63 62
               C53 59 51 46 50 35Z"
            fill="url(#${gradientId})"
            stroke="#ffe2fa"
            stroke-width="1.2"
          />
          <path
            d="M57 28 Q74 18 85 18
               M58 38 Q74 36 84 29"
            fill="none"
            stroke="#fff0ff"
            stroke-opacity=".7"
            stroke-width="1.2"
          />
          <circle cx="74" cy="20" r="3"
                  fill="#fff0ff" opacity=".8"/>
        </g>

        <path
          d="M50 29 Q43 14 39 16
             M50 29 Q57 14 61 16"
          fill="none"
          stroke="#ffd5f5"
          stroke-width="1.5"
          stroke-linecap="round"
        />

        <ellipse
          cx="50" cy="39" rx="3.3" ry="12"
          fill="#ffe4fa"
          stroke="#ffb4e8"
          stroke-width="1"
        />
      </svg>
    `;
  });
}

// ===== ICON BAY LÊN =====
const floatingIcons = ["♡", "✦", "✧", "♥", "LOVE"];

function createFloatingIcon() {
  if (opened) return;

  const icon = document.createElement("span");
  const symbol =
    floatingIcons[Math.floor(Math.random() * floatingIcons.length)];

  icon.className = "floating-icon";
  icon.textContent = symbol;
  icon.style.left = `${Math.random() * 96}%`;
  icon.style.fontSize = `${14 + Math.random() * 22}px`;

  icon.style.setProperty(
    "--float-duration",
    `${5 + Math.random() * 5}s`
  );

  icon.style.setProperty(
    "--drift",
    `${Math.random() * 100 - 50}px`
  );

  floatingLayer.appendChild(icon);

  icon.addEventListener("animationend", () => {
    icon.remove();
  });
}

function startFloatingIcons() {
  if (floatingTimer) {
    clearInterval(floatingTimer);
  }

  floatingTimer = setInterval(createFloatingIcon, 420);
}

// ===== HIỆU ỨNG CHỮ HIỆN DẦN =====
function typeMessage() {
  clearInterval(typingTimer);

  letterText.textContent = "";
  signature.textContent = "";

  let index = 0;

  typingTimer = setInterval(() => {
    letterText.textContent += message.charAt(index);
    index++;

    if (index >= message.length) {
      clearInterval(typingTimer);
      signature.textContent = signatureText;
    }
  }, 38);
}

// ===== MỞ THIỆP =====
function openCard() {
  if (opened) return;

  opened = true;

  if (floatingTimer) {
    clearInterval(floatingTimer);
    floatingTimer = null;
  }

  gardenScene.classList.add("hidden");
  cardScene.classList.remove("hidden");

  typeMessage();
}

// ===== QUAY LẠI KHU VƯỜN =====
function backToGarden() {
  clearInterval(typingTimer);

  cardScene.classList.add("hidden");
  gardenScene.classList.remove("hidden");

  opened = false;
  startFloatingIcons();
}

// ===== MÁY BAY BAY XONG =====
planeButton.addEventListener("animationend", (event) => {
  if (event.animationName === "paperPlaneGlide") {
    planeButton.classList.add("settled");
  }
});

// ===== GẮN SỰ KIỆN =====
planeButton.addEventListener("click", openCard);
backButton.addEventListener("click", backToGarden);

// ===== KHỞI ĐỘNG TOÀN BỘ HIỆU ỨNG =====
createStars();
createGarden();
createButterflies();
startFloatingIcons();
