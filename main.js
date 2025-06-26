(function () {
	var uprag = window.uprag = function () { };
      	uprag.projects =[
		{
			'title':'BOWINC',
			'description':'Decentralized voting system. aimed to address the issues of voter fraud and low voter turnout by leveraging the security and transparency of blockchain technology.',
			'img':'https://aohycent.github.io/cdn/img/bowinc.header.png',
			'links':[
				{
					'name':'a',
					'attr':[{'name':'href','value':'https://github.com/bowinc'},{'name':'target','value':'_blank'}],
					'body': '<i class="fab fa-github"></i> GitHub'
				},
				{
					'name':'a',
					'attr':[{'name':'href','value':'pi:bowinc.github.io'},{'name':'target','value':'_blank'},{'name':'class', 'value':'picoin'}],
					'body': 'BOW<i class="fas fa-cube"></i>Dapp'
				},
				{
					'name':'a',
					'attr':[{'name':'href','value':'bitcoin:1GECKZ9EjG7txbNhzYfGwPNLwWAUgvALF5'},{'name':'target','value':'_blank'},{'name':'class', 'value':'bitcoin'}],
					'body': '<i class="fab fa-btc"></i> Donate'
				}
			]
		},
		{
			'title':'BOWALLET',
			'description':'BOWCHAIN NATIVE WALLET',
			'img':'https://aohycent.github.io/cdn/img/bowinc.favicon.png',
			'links':[
				{
					'name':'a',
					'attr':[{'name':'href','value':'https://github.com/bowinc'},{'name':'target','value':'_blank'}],
					'body': '<i class="fab fa-github"></i> GitHub'
				},
				{
					'name':'a',
					'attr':[{'name':'href','value':'pi:bowinc.github.io'},{'name':'target','value':'_blank'},{'name':'class', 'value':'picoin'}],
					'body': 'BOW<i class="fas fa-cube"></i>Dapp'
				},
				{
					'name':'a',
					'attr':[{'name':'href','value':'bitcoin:1GECKZ9EjG7txbNhzYfGwPNLwWAUgvALF5'},{'name':'target','value':'_blank'},{'name':'class', 'value':'bitcoin'}],
					'body': '<i class="fab fa-btc"></i> Donate'
				}
			]
		}
	];
})();

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
const projectview = document.querySelector('.projects-grid');

function make_request(u, f, m, param){
	var x = false;
	try{ x = new ActiveXObject('Msxml2.XMLHTTP')} catch(e) { try { x = new ActiveXObject('Microsoft.XMLHTTP')} catch(e) { x = new XMLHttpRequest() }}
	if(x==false) { return false;}
	x.open(m, u, true);
	x.onreadystatechange=function(){ if((x.readyState==4) && f){ f(x.responseText);}};
	if(m == 'POST'){ x.setRequestHeader('Content-type','application/x-www-form-urlencoded');}
	x.send(param);
}

function buildElement(dom){
	const e= document.createElement(dom.name);
	for(var c=0;c<dom.attr.length;c++){
		e.setAttribute(dom.attr[c].name, dom.attr[c].value);
	}
	e.innerHTML=dom.body;
	return e;
}

function loadprojects(){
   var ps = uprag.projects;
   for(var i = 0; i < ps.length; i++){
	   p=ps[i];
	   //create project element
	   const probj = document.createElement("div");
	   probj.setAttribute("class","project-card");
	   // load image
	   const pimg = document.createElement("img");
	   pimg.setAttribute("src",p.img);
	   probj.appendChild(pimg);
	   //load title
	   const pname=document.createElement("h3");
	   pname.innerHTML=p.title;
	   probj.appendChild(pname);

	   // add description
	   const pdesc=document.createElement("p");
	   pdesc.innerHTML=p.description;
	   probj.appendChild(pdesc);

	   //add links
	   const plink = document.createElement("div");
	   plink.setAttribute("class","project-links");
	   for(var l=0;l < p.links.lenght; l++){
		   const e= document.createElement(p.links[l].name);
		   for(var c=0; c < p.links[l].attr.length;c++){
			e.setAttribute(p.links[l].attr[c].name, p.links[l].attr[c].value);
		   }
		   var ei = document.createTextNode(p.links[l].body);
 e.appendChild(ei);
		   plink.appendChild(e);
	   }
	   probj.appendChild(plink);

	   //add project element
	   projectview.appendChild(probj);
    }
}

loadprojects();
