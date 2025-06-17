document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });

    // Basic scroll to section functionality (optional, can be done with CSS smooth scrolling)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            hamburger.style.display='hidden';

            // Close the navigation menu on mobile after clicking
            if (window.innerWidth < 769) {
                nav.style.display='none';
            }
        });
    });
});

const projects={};
const projectview=document.querySelector(".projects-grids");

fetch('./project.noj')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    projects=data;
  })
  .catch(error => {
    console.error('Error fetching the file:', error);
  });

function loadprojects(){
   for(bar p in projects){
        var pc = document.createElement("div");
        pc.addAttribute("class", "project-card");
        pc.innerHTML= "<p>"+ p.name +"</p>";
        projectview.appendChild(pc);
    }
}

setTimeout(loadprojects,5000);