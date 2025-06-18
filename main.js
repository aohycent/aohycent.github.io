(function () {
	var uprag = window.coinjs = function () { };
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
		}
	];
})();

translations: {
			"en": {
				// javascript alerts or messages
				"testrunneractivated": "TESTRUNNER ACTIVATED",

				// header and menu html
				"indexdomtitle": "Home Page",
				"walletdomdetail": "HClab Wallet"
			}
		}

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
const projectview = document.querySelector('.projects-grids');

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
   var ps = uprag.projects;
   for(var p in ps){
	   //create project element
	   var probj=document.createElement("div").setAttribute("class","project-card");
	   // load image
	   var img = document.createElement("img").setAttribute("src",p.img);
	   probj.appendChild(img);
	   //load title
	   var pname=document.createElement("h3");
	   pname.innerHTML=p.title;
	   probj.appendChild(pname);

	   // add description
	   var pdesc=document.createElement("p");
	   pdesc.innerHTML=p.description;
	   probj.appendChild(pdesc);

	   //add links
	   var plink = document.createElement("div").setAttribute("class","project-links");
	   for(var l in probj.links){
		   var lem=buildElement(l);
		   plink.appendChild(lem);
	   }
	   probj.appendChild(plink);

	   //add project element
	   projectview.appendChild(probj);
    }
}
function buildElement(dom){
	var e=document.createElement(dom.name);
	for(var c in dom.attr){
		e.setAttribute(c.name,c.value);
	}
	e.innHtml=dom.body;
	return e;
}
loadprojects();
