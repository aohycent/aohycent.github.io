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

const projects=[];
const projectview = document.querySelector(".projects-grids")[0];

function make_request(u, f, m, param){
	var x = false;
	try{ x = new ActiveXObject('Msxml2.XMLHTTP')} catch(e) { try { x = new ActiveXObject('Microsoft.XMLHTTP')} catch(e) { x = new XMLHttpRequest() }}
	if(x==false) { return false;}
	x.open(m, u, true);
	x.onreadystatechange=function(){ if((x.readyState==4) && f){ f(x.responseText);}};
	if(m == 'POST'){ x.setRequestHeader('Content-type','application/x-www-form-urlencoded');}
	x.send(param);
}

function loadprojects(){
    projects = make_request("./projects.noj",console.log,'GET');
   for(var p in projects){
        var pc = document.createElement("div");
        pc.addAttribute("class", "project-card");
        pc.innerHTML= "<p>"+ p.name +"</p>";
        projectview.appendChild(pc);
    }
}
loadprojects();

setTimeout(loadprojects,5000);
