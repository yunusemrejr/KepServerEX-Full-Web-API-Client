<!DOCTYPE html>
<html>

<head>
    <title>ASPDijital | KepServerEX API Client</title>
    <meta charset="utf-8">
    <link rel="icon" href="apilogofavicon.png">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootbox.js/5.5.2/bootbox.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link rel="stylesheet" href="style.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
    
 </head>

<body>
    <div id="bodyContainer" >
        <nav class="navbar">
            <div class="nav-container">
                <ul class="nav-menu">
                    <li><a href="https://aspdijital.com/">Home</a></li>
                    <li><a href="https://aspdijital.com/en/about-us">About Us</a></li>
                    <li><a href="https://opcturkey.com/kepserverex">About KepServerEX</a></li>
                </ul>
            </div>
        </nav>
<center><div id="mainlogodiv" style=" min-width: 600px !important;"><img style=" min-width: 600px !important;" id='mainlogo' src="fulllogo.png"></div></center>
        <div id="logoDIV">
        <img src="logo.png" class="logo" id="logoimg">
            <h1 id="h1oflogo" style="font-size: 20px;"> | KepServerEX <span id="secondpart">API Client</span></h1>
            <br>
        </div>
             


        <div id="parent" style='display:none;'> <div id="container_of_inputs_and_check">    <div id="importDataDIV"></div> <div> <div id="iotgatewayIPdropDIV"><input id="iot-gateway"></div> </div> <div> <label for="normal-api"></label><select id='configdrop'><option></option></select> <div id="DIVforNormalAPIIP"> <input id="normal-api" ></div> </div> <div> <input  id="normal-api_usr"> <input  id="normal-api_pss"> </div> <button id="checkbtn"></button> </div> <div id="IoTGatewayDIV"> <div class="status"> <p><span id="iot-gateway-status"></span></p> </div> <a id="hidemassvalues"></a> <div id="read_tags_and_values"> </div> <select id="dropdown_of_tags"> </select> <input  id="new_value_for_IOT_gateway_selected_tag"> <button></button> </div> <div id="normalAPI_DIV"> <div class="status"> </div> <div id="project_data"> </div> <select id="dropdown_of_channels_for_standard_API"> </select> <div id="selected_channel_info"> </div> <select id="dropdown_of_devices_for_standard_API"> </select> <div id="selected_device_info"> </div> <select id="dropdown_of_tags_for_standard_API"> </select> <div id="selected_tag_info">    </div> <div id="create-new-tag"> <span id="shown"><input id="tagNameINPUT" > <button  > </button> </span> </div> <button  > </button> <button  > </button> </div> </div>
       
       
        <div id='maindivForprogramOptions'>
            
        <a class='optbtnforlanding' href='../online'><i class="fa-brands fa-chrome"></i> Try Online Version</a>
        <a class='optbtnforlanding' href='#' id="dropdownBTNdownloads"><i class="fa-solid fa-cloud-arrow-down"></i> Download Offline Version</a>
        

        </div>

        <div class="info-container">
                <button id="info-button"><i class="fas fa-info-circle"></i></button>
                <div id="info-modal">
                    <div id="info-modal-content">
                        <h2>Information</h2>
                        <button id="info-modal-close"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>


            <script src="configAPI.js"></script>
            <script src="iotgtwy.js"></script>
            <script src="general.js"></script>
     <div id="unsupported">
                <img id="favemerg" src="favicon.png"> <br> <br><span id="notrecomspantxt">This display size is not recommended</span><br><br>
                <button id="continueButton" onclick="disablemobileblock('userCommanded')">Continue Anyways</button>

            </div><hr>   
        <div id="footercredit">Copyright © 2023 ASP Dijital Dönüşüm Hizmetleri A.Ş. All Rights Reserved. | Designed and developed by ASP Dijital Dönüşüm Hizmetleri A.Ş.</div>




    </div>
    <div class="loader">
        <div><img id="loadingscreenLogo" src="apilogofavicon.png"></div>
    </div>
</body>

</html>