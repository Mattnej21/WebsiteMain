AOS.init();
/* Project Cards */

const projectcards = document.querySelector(".projectcards");

// Array of object for projects
const projects = [
  {
    title: "A.M.P.L.E.(Complete)",
    cardImage: "assets/images/SMD-LED_on_Hex_MCPCB.jpg",
    description: "An AntiMicrobial Protected Lighting Environment system created by combining near UV-C lights within an interior handrail sconce, such that the contained lights neutralize contaminants on the surface of the rail. Features include automated UV-C wavelength selection, motion sensors, and safety interlocks.",
    tagimg: "https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png",
    Previewlink: "",
    Githublink: "",
  },
  {
    title: "BMW EBike(Pending)",
    cardImage: "assets/images/bmw-logo-2020-scaled.jpg.webp",
    description: "A BMW R80 Electric Conversion project currently in design phase. This project aims to convert a classic BMW motorcycle into a modern electric vehicle while maintaining its vintage aesthetic and classic riding experience.",
    tagimg: "https://image.flaticon.com/icons/png/512/643/643350.png",
    Previewlink: "Test",
    Githublink: "",
  },
  {
    title: "Personal Website(Active)",
    cardImage: "assets/images/project-page/best-free-stock-images.jpg",
    description: "Creation and Maintenance of a personal website via forked github code as a means to learn web development. Current focus includes responsive design optimization, dark mode implementation, and interactive particle effects.",
    tagimg: "https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png",
    Previewlink: "",
    Githublink: "",
  },
   {
    title: "Wind Tunnel RAT Gantry(Complete)",
    cardImage: "assets/images/project-page/dd9b3eb2-e1c0-466c-8ef6-b42c643296e5-RFD0909_Collins_Aerospace004.JPG.webp",
    description: "Performed on a team to process plan for loading/testing/unloading RAT from windtunnel gantry. Responsibilities included CAD modeling, fixture design, and procedure documentation for safe and efficient operation.",
    tagimg: "https://image.flaticon.com/icons/png/512/643/643350.png",
    Previewlink: "",
    Githublink: "",
  },
];

// function for rendering project cards data
const showCards = () => {
  let output = "";
  projects.forEach(({ title, cardImage, description, Previewlink, Githublink }) => {
    output += `       
        <div class="column skill-card card" style="margin: 15px"data-aos="zoom-in-up" data-aos-easing="linear" data-aos-delay="300" data-aos-duration="600" >
          <div class="wrapper" style="background: url(${cardImage}) center / cover no-repeat;">
            <div class="header">
            </div>
            <div class="data">
              <div class="content">
                <div class="title-div">
                  <h1 class="title"><a href="#">${title}</a></h1>
                </div>
                <div class="description-icons-wrapper">
                  <!-- <ul class="menu-content">
                    <li><a href="${Previewlink}" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></a></li>
                    <li><a href="${Githublink}" class="social-icon"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" viewBox="0 0 30 28" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a></li>
                  </ul> -->
                  <div class="description">
                    <p>${description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  });
  projectcards.innerHTML = output;
  
  // Add hover functionality for smooth description reveal
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach(card => {
    const wrapper = card.querySelector('.wrapper');
    const dataDiv = card.querySelector('.data');
    const titleDiv = card.querySelector('.title-div');
    
    if (wrapper && dataDiv) {
      // Set initial state - data slides up on hover
      wrapper.addEventListener('mouseenter', () => {
        dataDiv.style.transform = 'translateY(0)';
        if (titleDiv) {
          titleDiv.style.transform = 'translateY(0)';
        }
      });
      
      wrapper.addEventListener('mouseleave', () => {
        dataDiv.style.transform = 'translateY(100%)';
        if (titleDiv) {
          titleDiv.style.transform = 'translateY(0)';
        }
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", showCards);

function myFunction() {
  // Declare variables
  var input, button, i, skillcard, card, title;
  input = document.getElementById("myInput").value;
  input = input.toUpperCase();
  skillcard = document.getElementsByClassName("skill-card");
  card = document.getElementsByClassName("card");
  title = document.getElementsByClassName("title");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < button.length; i++) {
    if (
      button[i].innerHTML.toUpperCase().includes(input) ||
      title[i].innerHTML.toUpperCase().includes(input)
    ) {
      skillcard[i].style.display = "";
      card[i].style.display = "";
    } else {
      skillcard[i].style.display = "none";
      card[i].style.display = "none";
    }
  }
}
