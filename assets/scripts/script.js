const textElement = document.getElementById('title');
const texts = ["สัตว์ป่าสงวนของประเทศไทย....."];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeText() {
    const currentText = texts[textIndex];
    if (!isDeleting) {
        textElement.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex <= currentText.length) {
            setTimeout(typeText, 50);
            return;
        } else {
            isDeleting = true;
            setTimeout(typeText, 3000); // Pause for 5 seconds after typing
            return;
        }
    } else {
        textElement.textContent = currentText.slice(0, charIndex);
        charIndex--;

        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Switch to the next text
            setTimeout(typeText, 150); // Start typing the next text immediately
            return;
        }
    }

    setTimeout(typeText, 50); // Faster deleting speed
}

typeText();



// เลือกองค์ประกอบของแถบนำทาง
const navbar = document.getElementById('navbar');

// เมื่อหน้าเลื่อน
window.addEventListener('scroll', () => {
    // ถ้าหน้าเลื่อนลงมากกว่า 100px (ค่าที่คุณต้องการ)
    if (window.scrollY > 100) {
        // เพิ่มคลาส "navbar-solid" เพื่อเปลี่ยนสไตล์ของแถบนำทาง
        navbar.classList.add('navbar-solid');
        navbar.classList.remove('navbar-weak');
    } else {
        // ถ้าไม่ใช่ ให้ลบคลาส "navbar-solid"
        navbar.classList.add('navbar-weak');
        navbar.classList.remove('navbar-solid');
    }
});


// Get a reference to the button element
var goToTopBtn = document.getElementById("goToTopBtn");

// animation on scroll
let box_animation = document.querySelectorAll('.list-box');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        goToTopBtn.style.display = "block";
    } else {
        goToTopBtn.style.display = "none";
    }

    // animation on scroll
    box_animation.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 550;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            sec.classList.add('show-animation');
        }

        // else {
        //     sec.classList.remove('show-animation');
        // }
    })

};

// When the button is clicked, scroll to the top of the document
goToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});



// เพิ่มความหน่วงในการเลื่อน (ค่ามากยิ่งช้า)
const scrollSpeed = 2;

// เรียกใช้ฟังก์ชันเลื่อนด้วยความเร็วแบบกำหนดเอง
function customSmoothScroll(event) {
    event.preventDefault();

    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const startPosition = window.scrollY;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;

        let startTime = null;

        function step(currentTime) {
            if (!startTime) {
                startTime = currentTime;
            }

            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / scrollSpeed, 1);
            window.scrollTo(0, startPosition + distance * progress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
}

// แอดอีเวนต์การคลิกลิงก์และเรียกใช้ฟังก์ชัน customSmoothScroll
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
    link.addEventListener("click", customSmoothScroll);
});