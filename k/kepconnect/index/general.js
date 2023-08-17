function logoORIGINAL(){
  document.querySelector('#mainlogodiv').querySelector('img').src='fulllogo.png';
}
function logoKEP(){
  document.querySelector('#mainlogodiv').querySelector('img').src='fulllogo2nd.png';

}
  document.addEventListener('DOMContentLoaded', ()=> {

    let styleanim = document.createElement('style');
    styleanim.innerHTML=`
 
    @keyframes logoroll {
    0% {
        opacity: 0;
     }
     80% {
        opacity: 1;
      }100% {
        opacity: 0;
      }
    }
    
    
    `;


    document.body.appendChild(styleanim);
    document.querySelector('#mainlogodiv').querySelector('img').style.animation = 'logoroll 8s infinite';

   const switchlogos=()=>{
    if(document.querySelector('#mainlogodiv').querySelector('img').src.includes('fulllogo.png')){
      logoKEP();

    }else{ 
      logoORIGINAL();     
    }
   };
   setInterval(switchlogos,8000);
  });



const dropdown=()=>{

  document.querySelector('#dropdownBTNdownloads').addEventListener('click',()=>{

    bootbox.dialog({

      message:'<i class="fa-solid fa-arrow-pointer"></i> Select your KepConnect Version to Download:',
      title:"Download KepConnect",
      buttons:{
         
        java:{
          label:'<i class="fa-brands fa-windows"></i> Windows Java Client',
          className:'java',
          callback: function(){
            const java='https://github.com/yunusemrejr/OPCTurkey_KepServerEX-Desktop-API-Client/tree/main/Windows%20Executable';
            window.location.href=java;
          }
        },

        HTML5:{
          label:'<i class="fa-brands fa-html5"></i> Universal HTML5 Client',
          className:'html5',
          callback: function(){
            window.location.href='../download/KepConnect.zip';
          }
        },
		  
legacyhtml5: {
  label: '<i class="fa-brands fa-html5"></i> Legacy HTML5 Client',
  className: 'legacyhtml5',
  callback: function () {
    window.location.href = '../download/oldapi.zip';
  }
}

      }


  });
    const anchor=document.querySelector('dropdownBTNdownloads');

  
     
  });

  


};dropdown();