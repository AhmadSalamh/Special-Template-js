//cheeck if there's local storage color opyion
let mainColor =localStorage.getItem('color-option');

if (mainColor !== null){

    document.documentElement.style.setProperty('--main-color',mainColor)

    document.querySelectorAll('.colors-list li').forEach(element=>{

        element.classList.remove('active')

        if(element.dataset.color === mainColor){

            element.classList.add('active')
        }
    })
}

//Toggle Setting
let icone=document.querySelector('.toggle-setting .fa-gear'),
    setting=document.querySelector('.setting-box');

icone.addEventListener('click',function(){
    this.classList.toggle('fa-spin')
    setting.classList.toggle('open')

})

//Switch Colors
const colorLi=document.querySelectorAll('.colors-list li');

colorLi.forEach(li =>{
    
    li.addEventListener('click' ,(e)=>{
        
       document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
   
       localStorage.setItem('color-option', e.target.dataset.color);

       handleActive(e)
      
    })
})

// Switch Random Background option
const randomBackEl=document.querySelectorAll('.random-background span');

randomBackEl.forEach(span =>{
    
    span.addEventListener('click' ,(e)=>{
        handleActive(e)

       if(e.target.dataset.background === 'yes'){

            backgroundOption=  true,

            randomizeImgs();

            localStorage.setItem('back-option',true)
        
       }else{
            backgroundOption=  false,

            clearInterval(backgroundInterval);
           
            localStorage.setItem('back-option',false)

       }
    })
})

//Change Background
let landingPage=document.querySelector('.landing-page'),
    imgsArray=['01.webp','02.webp','03.webp','04.webp','05.webp'],
    backgroundOption=  true,
    backgroundInterval,
    backgroundLocalItem=localStorage.getItem('back-option');

if(backgroundLocalItem !== null){

    if(backgroundLocalItem ==='true'){
        backgroundOption =true
    }else{
        backgroundOption =false
    }
    document.querySelectorAll('.random-background span').forEach(ele=>{

        ele.classList.remove('active')
    })
    if( backgroundLocalItem ==='true'){
        document.querySelector(".random-background .yes").classList.add("active")
    }else{
        document.querySelector(".random-background .no").classList.add("active")

    }
}
function randomizeImgs(){
    if(backgroundOption ===true){

        backgroundInterval= setInterval(()=>{

            let randomNumber=Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage='url("img/'+ imgsArray[randomNumber]+ '")';
        
        },1000) 
    }
}
randomizeImgs()

// select skills selector
let ourSkills=document.querySelector('.skills');

window.onscroll=function(){

   let skillsOffsetTop=ourSkills.offsetTop,
       skillsOuterHeight=ourSkills.offsetHeight,
       windowHeight=this.innerHeight,
       windowScrollTop=this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop+skillsOuterHeight - windowHeight)){

        let allSkills=this.document.querySelectorAll('.skill-progress span');

        allSkills.forEach(skill=>{

            skill.style.width=skill.dataset.progress
        })
    }
}

// Create PopUp With The Image

let ourGallery =document.querySelectorAll('.gallery img' );

ourGallery.forEach(img=>{

    img.addEventListener('click',function (e) {

        let overlay=document.createElement('div');
        overlay.className='popup-overlay'
        document.body.appendChild(overlay)

        let popupbox=document.createElement('div');
        popupbox.className='popup-box'

        if(img.alt !=null){
            let imgHeading=document.createElement('h3');
            imgHeading.innerHTML=img.alt;
            popupbox.appendChild(imgHeading)
        }

        let popupImage=document.createElement('img');
        popupImage.src=img.src

        popupbox.appendChild(popupImage)
        
        document.body.appendChild(popupbox)

        //create the close span
        let closeButton =document.createElement('spna');
            closeButton.innerHTML='X';

            closeButton.className='close-button'

            popupbox.appendChild(closeButton)

      })
})
document.addEventListener('click',function(e){

    if(e.target.className ==='close-button'){

       e.target.parentElement.remove()

       document.querySelector('.popup-overlay').remove()
    }
})

// Select All Bullets & All Links
const allBullets= document.querySelectorAll('.nav-bullets .bullet')
const  allLink=document.querySelectorAll('.links li a');

function scrollToAnyWher (elements){

    elements.forEach(ele =>{

        ele.addEventListener('click',(e)=>{

                e.preventDefault();

                e.target.parentElement.parentElement.querySelectorAll('.active').forEach(u=>{

                    u.classList.remove('active');  
                })
                    e.target.classList.add('active')

            
                document.querySelector(e.target.dataset.section).scrollIntoView({
                    behavior:"smooth"
                })
            
            })
        })
}
scrollToAnyWher(allBullets);
scrollToAnyWher(allLink);

function handleActive(ev){

    ev.target.parentElement.querySelectorAll('.active').forEach(element=>{

        element.classList.remove('active');  

    })

        ev.target.classList.add('active')

 }
    
 //hide show bullets
let bulletsSpan=document.querySelectorAll('.bullet-option span'),
    bulletsContainer=document.querySelector('.nav-bullets'),
    bulletLocalItem=localStorage.getItem('bullets_option');
    
if(bulletLocalItem !== null){
  
    bulletsSpan.forEach(span=>{
        span.classList.remove('active')
    });

    if(bulletLocalItem ==="block"){
        bulletsContainer.style.display='block'

        document.querySelector('.bullet-option .yes').classList.add('active')

    } else {
        bulletsContainer.style.display='none'
        document.querySelector('.bullet-option .no').classList.add('active')


    }
}

    bulletsSpan.forEach(span=>{

        span.addEventListener('click',(e)=>{
            handleActive(e)

           if(span.dataset.display ==='show'){

             bulletsContainer.style.display='block'

             localStorage.setItem('bullets_option','block')


           }else{

             bulletsContainer.style.display='none'

             localStorage.setItem('bullets_option','none')


           }
        })
    })

// Reset Button
document.querySelector('.reset-options').onclick=function(){
  
    localStorage.clear()

    window.location.reload()
}

// Tiggle Menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick=function(e){

    e.stopPropagation()

    this.classList.toggle('menu-active')
    tLinks.classList.toggle('open')
}

// Click AnyWhere OutSide Menu and Toggle Button
document.addEventListener('click',function(e){

    if(e.target !==toggleBtn && e.target!==tLinks){

        if(tLinks.classList.contains('open')){
            
            toggleBtn.classList.toggle('menu-active')
            tLinks.classList.toggle('open')
        }
    }
})

// Stop Propagation ON Menu
tLinks.onclick=function(e){
    e.stopPropagation()
}