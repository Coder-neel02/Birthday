// ====================
// Text animation data
// ====================
const datetxt = "19 September";
const datatxtletter = "My love. You are a very special girl. I always silently thank you for coming into my life. Today, I wish you all the best, lots of health, and lots of joy. I always hope we will celebrate many more birthdays like this together. Happy birthday to you.💕";
const titleLetter = "To you";
const charArrDate = datetxt.split('');
const charArrDateLetter = datatxtletter.split('');
const charArrTitle = titleLetter.split('');

let currentIndex = 0;
let currentIndexLetter = 0;
let currentIndexTitle = 0;

const dateOfBirth = document.querySelector(".date__of__birth span");
const textLetter = document.querySelector(".text__letter p");
const mailBox = document.querySelector('.mail');
const boxMail = document.querySelector('.boxMail');
const closeBtn = document.querySelector('.fa-xmark');

// ====================
// Debounce helper
// ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================
// Smooth text animation
// ====================
function animateText(element, chars, index, callback) {
    if (index < chars.length) {
        element.textContent += chars[index];
        index++;
        requestAnimationFrame(() => animateText(element, chars, index, callback));
    } else if (callback) {
        callback();
    }
}

// ====================
// Date animation
// ====================
setTimeout(() => {
    animateText(dateOfBirth, charArrDate, currentIndex, () => {
        const star = document.createElement("i");
        star.className = "fa-solid fa-star";
        document.querySelector(".date__of__birth").prepend(star);
        document.querySelector(".date__of__birth").appendChild(star.cloneNode(true));
        currentIndex = 0;
    });
}, 12000);

// ====================
// Letter button click
// ====================
const handleLetterClick = debounce(() => {
    $(".boxMail").addClass("active");

    setTimeout(() => {
        $(".letter__border").slideDown(500);
    }, 1000);

    setTimeout(() => {
        animateText(document.querySelector(".title__letter"), charArrTitle, currentIndexTitle, () => {
            const heart = document.createElement("i");
            heart.className = "fa-solid fa-heart";
            document.querySelector(".title__letter").appendChild(heart);
            currentIndexTitle = 0;
        });
    }, 2000);

    setTimeout(() => {
        document.querySelector("#heart__letter")?.classList.add("animationOp");
        document.querySelector(".love__img")?.classList.add("animationOp");
        document.querySelector("#mewmew")?.classList.add("animationOp");
    }, 2800);

    setTimeout(() => {
        document.querySelectorAll(".heart").forEach((item) => {
            item.classList.add("animation");
        });
    }, 3500);

    setTimeout(() => {
        animateText(textLetter, charArrDateLetter, currentIndexLetter, () => {
            currentIndexLetter = 0;
        });
    }, 6000);
}, 300);

$("#btn__letter").on("click", handleLetterClick);

// ====================
// Close button handler
// ====================
closeBtn.addEventListener('click', () => {
    boxMail.classList.remove('active');
    document.querySelector(".title__letter").textContent = "";
    if (textLetter) textLetter.textContent = "";
    currentIndexLetter = 0;
    currentIndexTitle = 0;
    document.querySelector("#heart__letter")?.classList.remove("animationOp");
    document.querySelector(".love__img")?.classList.remove("animationOp");
    document.querySelector("#mewmew")?.classList.remove("animationOp");
    document.querySelectorAll(".heart").forEach((item) => {
        item.classList.remove("animation");
    });
    $(".box__letter").slideUp(500);
    $(".letter__border").slideUp(500);
});

// ====================
// Mail box toggle
// ====================
mailBox.addEventListener('click', () => {
    mailBox.classList.toggle('active');
    boxMail.classList.add('active');
});

// ====================
// 🎵 Background Music
// ====================
const music = new Audio("./music/happy-birthday.mp3"); // ✅ Update this path to your MP3 file
music.loop = true;
music.volume = 0.5;
let musicPlaying = false;

// Force autoplay on page load
window.addEventListener("load", () => {
    music.play().catch((error) => {
        console.log("Autoplay blocked by browser: ", error);
        // Attempt to unmute after a short delay (may still be blocked without user interaction)
        setTimeout(() => {
            music.muted = false;
            music.play().then(() => {
                musicPlaying = true;
                $("#musicToggle").text("🔊");
            }).catch(() => {
                console.log("Second autoplay attempt failed. User interaction required.");
            });
        }, 1000);
    });
});

// Toggle Music Button
$("<button id='musicToggle'>🔊play</button>")
    .css({
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        "border-radius": "50%",
        "background-color": "#ff4081",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        "box-shadow": "0px 4px 6px rgba(0,0,0,0.2)",
        "font-size": "20px",
        "z-index": 9999
    })
    .appendTo("body")
    .click(function () {
        if (musicPlaying) {
            music.pause();
            musicPlaying = false;
            $(this).text("🔇");
        } else {
            music.play();
            musicPlaying = true;
            $(this).text("🔊");
        }
    });