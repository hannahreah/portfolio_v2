//Animation function typing one letter at a time
const textPartsContainer = document.getElementById("textParts"); 
const typingContainer = document.getElementById("typingText");
const cursor = document.querySelector(".cursor");

let currentPart = 0;
let charIndex = 0; 
let textParts = []; 

const typingSpeed = 50; 
const cursorBlinkSpeed = 700; 

function initializeTextParts() {
  const children = Array.from(textPartsContainer.childNodes);
  textParts = children.map((node) => ({
    text: node.nodeType === Node.TEXT_NODE ? node.textContent : node.textContent,
    class: node.className || "",
  }));
}

function typeText() {
  if (currentPart < textParts.length) {
    const { text, class: currentClass } = textParts[currentPart];

    if (charIndex < text.length) {
      if (currentClass) {
        typingContainer.innerHTML += `<span class="${currentClass}">${text[charIndex]}</span>`;
      } else {
        typingContainer.innerHTML += text[charIndex];
      }
      charIndex++;
      setTimeout(typeText, typingSpeed); 
    } else {
      currentPart++;
      charIndex = 0;
      setTimeout(typeText, 200); 
    }
  } else {
    removeCursor(); 
  }

}

function startCursorBlink() {
  cursor.style.animation = `blink ${cursorBlinkSpeed}ms steps(2, start) infinite`;
}

function removeCursor() {
  cursor.remove(); 
}

initializeTextParts();
startCursorBlink();
typeText();


//Menu links
const menuLinks = document.querySelectorAll("nav ul li a");

function updateActiveLink() {
  const currentHash = window.location.hash || "#about"; 
  console.log(currentHash);
  menuLinks.forEach((link) => {
    if (link.getAttribute("href") === currentHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("hashchange", updateActiveLink);

const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      window.location.hash = `#${sectionId}`;
    }
  });
}, {
  threshold: 0.5
});

sections.forEach(section => observer.observe(section));
updateActiveLink();

//Scale the image/text on mouseover
const imageContainer = document.querySelector(".image-container");
imageContainer.addEventListener("mouseover", () => {
      imageContainer.style.transform = "scale(1.1)"; 
});
      
imageContainer.addEventListener("mouseout", () => {
      imageContainer.style.transform = "scale(1)"; 
});



//Contact Form Validation
const form = document.getElementById('contact-form');
const fullname = document.getElementById('fullname');
const message = document.getElementById('message');
const errorMessage = document.getElementById("errorMessage");

form.addEventListener('submit', function(event) {
  const nameValue = fullname.value.trim();
  const messageValue = message.value.trim(); 

  if (nameValue === "" || messageValue === "" ) {
    event.preventDefault(); 
    errorMessage.style.color = "hsla(14, 98%, 50%, 0.996)"
    errorMessage.style.display = "block"; 
    errorMessage.innerHTML = `Name or Message cannot be empty!`;

  } else {
    errorMessage.style.color = "hsla(133, 98%, 48%, 0.965)";
    errorMessage.style.display = "block"; 
    errorMessage.innerHTML = `Thank you for reaching out, ${nameValue}! Your form was submitted.`;
    
  }
  form.reset();
});