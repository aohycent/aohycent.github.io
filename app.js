import { Brand } from './ubrand.js';

const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.textContent=open?'×':'☰';});}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.textContent='☰';}));
document.getElementById('year').textContent=new Date().getFullYear();

const header=document.querySelector("head");

const buildBrandMeta = async (m)=>{
	try{
		var meta = document.createElement("meta");
		m.attr.forEach(tag=>{
			meta.setAttribute(tag.key, tag.value);
		});
		header.appendChild(meta);
	}catch(error){
		alert(error);
	}
}


    // stringToBytes, exception-safe
    function stringToBytes(str) {
        var bytes = [];
        for (var i = 0; i < str.length; ++i) bytes.push(str.charCodeAt(i));
         return bytes;
    }

    // bytesToString, exception-safe
    function bytesToString(bytes) {
      try {
        var str = Crypto.charenc.UTF8.bytesToString(bytes);
      } catch (err) {
        var str = '';
        for (var i = 0; i < bytes.length; ++i)
            str += String.fromCharCode(bytes[i]);
      }
      return str;
    }
    
    function fromDec(str)
    {
        var h = Math.abs(str).toString(16);
        return Crypto.util.hexToBytes(h.length%2?'0'+h:h);
    }

  /* -----------------------------------------
     WHATSAPP CONTACT FORM
     ----------------------------------------- */

  function sendWhatsApp(event) {

    event.preventDefault();


    const name =
      document.getElementById("name").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const service =
      document.getElementById("service").value;

    const message =
      document.getElementById("message").value.trim();


    const whatsappMessage =

      `*%f0%9d%97%96%f0%9d%97%a2%f0%9d%97%97%f0%9d%97%98%f0%9d%97%97%e3%8b%9a%f0%9d%97%96%f0%9d%97%a2%f0%9d%97%a1%f0%9d%97%96%f0%9d%97%98%f0%9d%97%a3%f0%9d%97%a7%20%f0%9d%97%a6%f0%9d%97%98%f0%9d%97%a5%f0%9d%97%a9%f0%9d%97%9c%f0%9d%97%96%f0%9d%97%98%20%f0%9d%97%a5%f0%9d%97%98%f0%9d%97%a4%f0%9d%97%a8%f0%9d%97%98%f0%9d%97%a6%f0%9d%97%a7*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}.%0A` +
      `*Phone:* ${encodeURIComponent(phone)}.%0A` +
      `*Service:* ${encodeURIComponent(service)}.%0A%0A` +
      `*Request:*%0A` +

      `${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${Brand.whatsapp}?text=${whatsappMessage}`,"_blank");
  }



const brandTitle = document.querySelectorAll("title");
const brandLogo = document.getElementsByClassName("brandlogo");
const brandEmblem = document.getElementsByClassName("brandemblem");
const brandEmail = document.getElementsByClassName("brandemail");
const brandWhatsapp = document.getElementsByClassName("brandwhatsapp");
const brandHandle = document.getElementsByClassName("brandhandle");
const brandTagline = document.getElementsByClassName("brandtagline");

Brand.meta.map(buildBrandMeta);

brandTitle[0].textContent=Brand.name;

for(var i=0;i<brandEmblem.length;++i){
	brandEmblem[i].setAttribute("src", Brand.emblem);
}
for(var i=0;i<brandLogo.length;++i){
	brandLogo[i].setAttribute("src", Brand.logo);
}
for(var i=0;i<brandEmail.length;++i){
	brandEmail[i].textContent= Brand.email;
}
for(var i=0;i<brandWhatsapp.length;++i){
	brandWhatsapp[i].textContent= Brand.phone;
}
for(var i=0;i<brandHandle.length;++i){
	brandHandle[i].textContent= Brand.handle;
}
for(var i=0;i<brandTagline.length;++i){
	brandTagline[i].innerHTML= Brand.tagline;
}