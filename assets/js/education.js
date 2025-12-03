AOS.init();

 // MOOCs Cards

 const moocs = document.querySelector(".moocs");
 const moocscards = [
 {
    title: "CS50s Intro to computer Science",
    cardImage: "assets/images/education-page/SGDAcademy.jpeg",
    moocLink: "https://learning.edx.org/course/course-v1:HarvardX+CS50+X/home",
  },
  {
    title: "U.S. Public Policy",
    cardImage: "assets/images/education-page/SGDAcademy.jpeg",
    moocLink: "https://www.edx.org/course/us-public-policy-social-economic-and-foreign-policies-course-v1harvardxhks101a_42t2022?utm_medium=social&utm_campaign=social-sharing-db&utm_source=twitter ",
  },
  
 ];

 const experience = [
   {
     img: "assets/images/education-page/c1.png",
   },
   {
     img: "assets/images/education-page/c2.jpg",
   },
   {
     img: "assets/images/education-page/c3.png",
   },
   {
     img: "assets/images/education-page/c4.png",
   },
   {
     img: "assets/images/education-page/c5.jpg",
   },
 ];

 let currentItem = 0;

 const img = document.getElementById("image");

 const prevBtn = document.querySelector("#prevBtn");
 const nextBtn = document.querySelector("#nextBtn");

 window.addEventListener("DOMContentLoaded", function () {
   showExperience();
 });

 function showExperience() {
   setInterval(function () {
     if (currentItem === experience.length) {
       currentItem = 0;
     }
     const item = experience[currentItem];
     img.src = item.img;
     currentItem++;
   }, 3000);
 }

 const showCards = () => {
   let output = "";
   moocscards.forEach(
     ({ title, cardImage, moocLink }) =>
       (output += `        
         <div class="col-6 col-md-3 col-sm-4 column" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="600" >  
             <div class="card mb-3 mx-auto">
                <div class="content">
                   <div class="content-overlay"></div>
                     <img src=${cardImage} class="card-img-top content-image">     
                   <div class="content-details fadeIn-bottom">
                     <a href="${moocLink}" target="_blank"><i class="fa fa-info-circle fa-2x" aria-hidden="true" style="color: white;"></i></a>                                   
                   </div>
                 </div>
                 <div class="card-body">
                     <h6 class="mt-0 py-2 text-center font-weight-bold mooc-title" style="font-size:12px;">${title}</h6>
                 </div>
             </div>
         </div>        
       `)
   );
   moocs.innerHTML = output;
 };
 document.addEventListener("DOMContentLoaded", showCards);

 /* Timeline Section*/

 $(function () {
   window.sr = ScrollReveal();

   if ($(window).width() < 768) {
     if ($(".timeline-content").hasClass("js--fadeInLeft")) {
       $(".timeline-content")
         .removeClass("js--fadeInLeft")
         .addClass("js--fadeInRight");
     }

     sr.reveal(".js--fadeInRight", {
       origin: "right",
       distance: "300px",
       easing: "ease-in-out",
       duration: 800,
     });
   } else {
     sr.reveal(".js--fadeInLeft", {
       origin: "left",
       distance: "300px",
       easing: "ease-in-out",
       duration: 800,
     });

     sr.reveal(".js--fadeInRight", {
       origin: "right",
       distance: "300px",
       easing: "ease-in-out",
       duration: 800,
     });
   }

   sr.reveal(".js--fadeInLeft", {
     origin: "left",
     distance: "300px",
     easing: "ease-in-out",
     duration: 800,
   });

   sr.reveal(".js--fadeInRight", {
     origin: "right",
     distance: "300px",
     easing: "ease-in-out",
     duration: 800,
   });
 });
