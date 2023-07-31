const importinfomsg=` <h2>About Importing Credentials</h2><br> <p>Importing credentials into KepConnect is fairly straigtforward. Create a .txt file on your machine and import it into here. Your created txt file must have the following syntax, linebreaks are not important:<br><br> </p> Example 1:<br> iotg-203.134.56.78:34567,<br> config-123.56.78.90:9876,<br> iotg-98.76.54.32:54321,<br> config-45.67.89.12:6543,<br> config-203.134.56.78:34567,<br> iotg-45.67.89.12:6543,<br> iotg-123.56.78.90:9876,<br> config-98.76.54.32:54321,<br> iotg-203.134.56.78:34567<br> <br><br> Example 2:<br> iotg-78.90.12.34:9876,<br> config-203.134.56.78:34567,<br> iotg-123.56.78.90:9876,<br> iotg-203.134.56.78:34567,<br> config-45.67.89.12:6543,<br> iotg-78.90.12.34:9876,<br> config-45.67.89.12:6543,<br> iotg-123.56.78.90:9876,<br> config-203.134.56.78:34567<br> <br><br> Example 3:<br> iotg-98.76.54.32:54321,config-203.134.56.78:34567,iotg-203.134.56.78:34567,config-45.67.89.12:6543,config-98.76.54.32:54321,iotg-123.56.78.90:9876,iotg-203.134.56.78:34567,config-45.67.89.12:6543,iotg-203.134.56.78:34567 <br><br> `;

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#import-credentiallist').addEventListener('click', function () {
      let fileInputHTML = document.createElement('input');
      fileInputHTML.setAttribute('id', 'fileinputforcredentials');
      fileInputHTML.setAttribute('type', 'file');
  
      fileInputHTML.style.display = 'none';
      document.body.appendChild(fileInputHTML);
      fileInputHTML.click();
  
      fileInputHTML.addEventListener('change', function () {
        const file = fileInputHTML.files[0];
        if (file.type === 'text/plain') {
          const fileReader = new FileReader();
  
          fileReader.onload = function (event) {
            const fileContents = event.target.result;
            const lines = fileContents.split(',');
            const iotGateways = [];
            const configItems = [];
  
            lines.forEach((line) => {
              let trimmedLine = line.trim();
              if (trimmedLine.startsWith('iotg-')) {
                 trimmedLine = trimmedLine.replace(/^iotg-/, '');  
                iotGateways.push(trimmedLine);
              } else if (trimmedLine.startsWith('config-')) {
                trimmedLine = trimmedLine.replace(/^config-/, '');  
                configItems.push(trimmedLine);
              }
            });
  
    if(!iotGateways.length==0){
       add_to_iot_dropdown(iotGateways);
    }

    if(!configItems.length==0){
        add_to_config_dropdown(configItems);
    }

          };
  
          fileReader.readAsText(file);
        } else {
          bootbox.alert('Please select a valid TXT file.');
        }
      });
    });
  });
  
  


  const add_to_iot_dropdown=(arr)=>{

const selecttag= document.querySelector('#gatewaydrop');
selecttag.innerHTML='';
arr.forEach((el,i)=>{
    let opt=document.createElement('option');
    opt.value=el;
    opt.textContent=el;
    selecttag.appendChild(opt);
     });



     selecttag.addEventListener('change',function(){
        document.querySelector('#iot-gateway').value=selecttag.value;
      });
  };


  
  const add_to_config_dropdown=(arr)=>{
 
const selecttag= document.querySelector('#configdrop');
selecttag.innerHTML='';
arr.forEach((el,i)=>{
    let opt=document.createElement('option');
    opt.value=el;
    opt.textContent=el;
    selecttag.appendChild(opt);
     });



     selecttag.addEventListener('change',function(){
        document.querySelector('#normal-api').value=selecttag.value;
      });
  }

 




