<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
?>

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

<body>	<div id='seeOtherVersions'><p><i class="fa-solid fa-triangle-exclamation"></i> <a href='https://aspdijital.com/kepserverapi/'>Click here </a>for the legacy version of the client</p></div>
<div id='warnfordownloadable'><p><i class="fa-solid fa-triangle-exclamation"></i> We recommend using downloadable clients due to browser restrictions</p></div>
    <div id="bodyContainer">
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
        <hr>        

        <div id="parent">
            <div id="container_of_inputs_and_check">    <div id="importDataDIV"><button id="importerINFO" onclick="bootbox.alert(importinfomsg)"><i class="fas fa-info"></i></button><button id="import-credentiallist"><i class="fa fa-file-import"></i> Import Credentials</button></div>
                <div>
                    <label for="iot-gateway">IoT Gateway IP &amp; Port:</label><select id='gatewaydrop' style="background-color: #A3F7BF;"><option>Select credentials from import</option></select>
                    <div id="iotgatewayIPdropDIV"><input type="text" id="iot-gateway" placeholder="Enter IP and Port (*)"></div>
                </div>
                <div>
                    <label for="normal-api">Normal API IP &amp; Port:</label><select id='configdrop' style="background-color: #A3F7BF;"><option>Select credentials from import</option></select>
                   <div id="DIVforNormalAPIIP"> <input type="text" id="normal-api" placeholder="Enter IP and Port (*)"></div>
                </div>
                <div>
                    <label for="normal-api">Normal API Credentials:</label>
                    <input type="text" id="normal-api_usr" placeholder="Enter Username (*)">
                    <input type="text" id="normal-api_pss" placeholder="Enter Password">
                </div>
                <button id="checkbtn" onclick="checkConnection()">Check Connection & Connect</button>
               
           
            </div>

            <div id="IoTGatewayDIV">
                <div class="status">
                    <p>IoT Gateway Status: <span id="iot-gateway-status">Disconnected</span></p>
                 </div>
                <label>IoT Gateway Read Tags & Values:</label>
                <a id="hidemassvalues">Hide</a>
                <div id="read_tags_and_values">Tag name: value <br>Tag name: value<br>
                </div>
                <label>Change a Value:</label>
                <select id="dropdown_of_tags">
            <option value="option1">tag name</option>
            <option value="option2">tag name</option>thi
            <option value="option3">tag name</option>
        </select>
                <input type="text" placeholder="enter the new value" id="new_value_for_IOT_gateway_selected_tag">
                <button>Change Value</button>
            </div>

            <div id="normalAPI_DIV">
                <div class="status">
                    <p>Normal API Status: <span id="normal-api-status">Disconnected</span></p>
               </div>
                <label>Standard API Access:</label>
                <div id="project_data">Project ID: <br> Number of Channels: <br>

                </div>


                <label>Select a Channel:</label>
                <select id="dropdown_of_channels_for_standard_API">
            <option value="option1">channel name</option>
            <option value="option2">channel name</option>
            <option value="option3">channel name</option>
        </select>

                <div id="selected_channel_info">Channel Name: <br>Device count: <br></div>




                <label>Select a Device:</label>
                <select id="dropdown_of_devices_for_standard_API">
            <option value="option1">device name</option>
            <option value="option2">device name</option>
            <option value="option3">device name</option>
        </select>

                <div id="selected_device_info">Device Name: <br> Parent Channel: <br>No. of Tags in Device: <br>Device Unique ID: <br></div>




                <label>Select existing Tag:</label>
                <select id="dropdown_of_tags_for_standard_API">
            <option value="option1">tag name</option>
            <option value="option2">tag name</option>
            <option value="option3">tag name</option>
        </select>

                <div id="selected_tag_info">Tag Name: <br> Parent Channel: <br> Parent Device: <br> Scan rate: <br> Address: <br> Data Type: <br>
                </div>


                <div id="create-new-tag">
                    <label>Create new Tag: <a style="color:rgb(0, 255, 195)"  onclick="showcreatenewtag()">[<span class="fas fa-plus"></span>]</a></label>
                    <span id="shown"><input id="tagNameINPUT" placeholder="unique tag name">
                    <input id="tagDataTypeINPUT" placeholder="tag data type">
                    <input id="tagScanRateINPUT" placeholder="tag scan rate">
                    <input id="tagAddressINPUT" placeholder="tag address">
    
                    <button onclick="createNewTag(selectedTypeNameDVC, username, password,projectId)">Create Tag</button>
                </span>
                </div>

                
                <button onclick="updateTag(selectedTypeNameDVC, username, password)">Change Tag Details</button>
                <button style="background-color:#7024247d;" onclick="deleteselectedtag(selectedTypeNameTAG, username, password)">Delete Tag</button>
                <label for="chkbx" style="font-size:small">I agree deleting the selected tag from my KepServerEX Project. <input name="chkbx" id="chkbx" type="checkbox"></label>




            </div>


            <div id="unsupported">
                <img id="favemerg" src="favicon.png"> <br> <br><span id="notrecomspantxt">This display size is not recommended</span><br><br>
                <button id="continueButton" onclick="disablemobileblock('userCommanded')">Continue Anyways</button>

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

            

        </div>


        <div id="footercredit">Copyright © 2023 ASP Dijital Dönüşüm Hizmetleri A.Ş. All Rights Reserved. | Designed and developed by ASP Dijital Dönüşüm Hizmetleri A.Ş.</div>




    </div>
    <div class="loader">
        <div><img id="loadingscreenLogo" src="apilogofavicon.png"></div>
    </div>
</body>

</html>