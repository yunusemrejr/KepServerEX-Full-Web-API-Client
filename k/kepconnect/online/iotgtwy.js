        let normalApi = document.getElementById("normal-api").value;
        let username_for_normal_API;
        let password_for_normal_API;

        let credentials;

        function checkConnection() {
            var iotGateway = document.getElementById("iot-gateway").value;
             console.log('iotgateway port: '+ iotGateway);
            // Check IoT Gateway connection
            var iotGatewayStatus = document.getElementById("iot-gateway-status");
            var iotGatewayDIV = document.getElementById("IoTGatewayDIV");
            var normalAPDIV = document.getElementById("normalAPI_DIV");
            normalApi = document.getElementById("normal-api").value;
			             console.log('configapi port: '+ normalApi);

            var iotGatewayRequest = new XMLHttpRequest();
            iotGatewayRequest.open('GET', 'ServerRequests.php?kepurl='+'http://' + iotGateway + '/iotgateway/');
			console.log('iotGateway request url:'+ 'ServerRequests.php?kepurl='+'http://' + iotGateway + '/iotgateway/');
            iotGatewayRequest.onload = function() {
                if (iotGatewayRequest.status === 200) {
                    iotGatewayStatus.innerHTML = "Connected";
					console.log("IOTG Connected");
                    iotGatewayStatus.className = "success";
                    iotGatewayDIV.classList.add("connected");
                    iotGatewayDIV.classList.remove("error");
                } else {
                    iotGatewayStatus.innerHTML = "Disconnected";
					 console.log("IOTG DISCONNECTED");
 
                    iotGatewayStatus.className = "error";
                    iotGatewayDIV.classList.remove("connected");
                    iotGatewayDIV.classList.add("error");
                }
            };

            iotGatewayRequest.onerror = function() {
                iotGatewayStatus.innerHTML = "Disconnected";
									 console.log("IOTG DISCONNECTED CUZ ERROR");

                iotGatewayStatus.className = "error";
                iotGatewayDIV.classList.remove("connected");
                iotGatewayDIV.classList.add("error");

            };

            iotGatewayRequest.send();

            // Check Normal API connection
            var normalApiStatus = document.getElementById("normal-api-status");
            let username_for_normal_API = document.getElementById("normal-api_usr");
            let password_for_normal_API = document.getElementById("normal-api_pss").value || "";
            credentials = btoa(username_for_normal_API + ':' + password_for_normal_API);
         console.log('credentials for config api: '+ credentials);

            var normalApiRequest = new XMLHttpRequest();
			destinationURL='ServerRequests.php?kepurl='+'http://' + normalApi + '/config/v1/status';
            normalApiRequest.open('GET', destinationURL);
            console.log('configAPI destination URL: '+destinationURL);
            normalApiRequest.setRequestHeader('Authorization', 'Basic ' + credentials);
            normalApiRequest.onload = function() {
                if (normalApiRequest.status === 200) {
                    normalApiStatus.innerHTML = "Connected";
					            console.log('config api status endpoint connected 200');

                    normalApiStatus.className = "success";
                    normalAPDIV.classList.add("connected");
                    normalAPDIV.classList.remove("error");

                    normalAPI();


                } else {
                    normalApiStatus.innerHTML = "Disconnected";
										            console.log('config api status endpoint DISCONNECTED!');

                    normalApiStatus.className = "error";
                    normalAPDIV.classList.remove("connected");
                    normalApiStatus.classList.add("error");
                    normalAPDIV.classList.add("error");

                }



            };
            normalApiRequest.onerror = function() {
                normalApiStatus.innerHTML = "Disconnected";
									            console.log('config api status endpoint disconnected ERROR');

                normalApiStatus.className = "error";
                normalAPDIV.classList.add("error");

            };
            normalApiRequest.send();
        }


        //Add events listeners for the input fields to activate check button
        const iotGatewayInput = document.getElementById("iot-gateway");
        const normalApiInput = document.getElementById("normal-api");
        const normalApiUserInput = document.getElementById("normal-api_usr");

        const checkButton = document.querySelector('#checkbtn');
        checkButton.disabled = true;
        checkButton.style.backgroundColor = "gray";
        checkButton.style.opacity = "0.7";
        checkButton.removeAttribute('onclick');


        [iotGatewayInput, normalApiInput, normalApiUserInput].forEach(input => {
            input.addEventListener('input', () => {
                checkButton.disabled = !(iotGatewayInput.value.trim() && normalApiInput.value.trim() && normalApiUserInput.value.trim());
                if (checkButton.disabled == false) {
                    checkButton.setAttribute('onclick', 'checkConnection()');
                    checkButton.style.backgroundColor = "#4CAF50";
                    checkButton.style.opacity = "1";

                } else {
                    checkButton.removeAttribute('onclick');
                    checkButton.style.backgroundColor = "gray";
                    checkButton.style.opacity = "0.7";
                }
            });
        });

        //////////////////////////////IOT WRITE OPERATIONS////////////////////////////////////////////////////////////////////////////////

        const dropdownOfTags = document.getElementById("dropdown_of_tags");
        const newValueForIOTGatewaySelectedTag = document.getElementById("new_value_for_IOT_gateway_selected_tag");

        document.getElementById('checkbtn').addEventListener("click", () => {
            // Load tags and values 
            let url = "http://" + document.getElementById("iot-gateway").value + "/iotgateway/browse";
            let serverside="ServerRequests.php";
			console.log('fetch destination: '+'ServerRequests.php?kepurl='+url);
            fetch('ServerRequests.php?kepurl='+url)
                .then(response => response.json())
                .then(data => {
                    // Populate the tags dropdown
                    dropdownOfTags.innerHTML = "";
                    data.browseResults.forEach(tag => {
                        dropdownOfTags.innerHTML += `<option value="${tag.id}">${tag.id}</option>`;
                    });
                    let tagID;

                    const selectedTag = data.browseResults.find(tag => tagID = tag.id === dropdownOfTags.value);
                    if (selectedTag) {
                        //  event listener for when the dropdown changes
                        dropdownOfTags.addEventListener("change", () => {
                            // Get the selected tag 
                            
                            const selectedTag = dropdownOfTags.value;
                            // set the value of the selected tag in the input box
							console.log('fetch destination: '+'ServerRequests.php?kepurl='+"http://" + document.getElementById("iot-gateway").value + "/iotgateway/read?ids=" + selectedTag);
							
                            fetch('ServerRequests.php?kepurl='+"http://" + document.getElementById("iot-gateway").value + "/iotgateway/read?ids=" + selectedTag)
                                .then(response => response.json())
                                .then(data => {
                                    const selectedTagValue = data.readResults[0].v;
                                    newValueForIOTGatewaySelectedTag.value = selectedTagValue;
                                })
                                .catch(error => console.error(error));
                        });
                        // trigger the event listener once to set up the initial state of the dropdown
                        dropdownOfTags.dispatchEvent(new Event("change"));
                    }
                    // Update the read tags and values div
                    const readTagsAndValues = document.getElementById("read_tags_and_values");
                    readTagsAndValues.innerHTML = "";
                    data.browseResults.forEach(tag => {
                        readTagsAndValues.innerHTML += `<p> ${tag.id}:</p><span id="${tag.id}"></span > `;
                    });
                    setInterval(() => {
                        // Read values of all tags and update the read tags and values div
                        data.browseResults.forEach(tag => {
                            fetch('ServerRequests.php?kepurl='+"http://" + document.getElementById("iot-gateway").value + "/iotgateway/read?ids=" + tag.id)
                                .then(response => response.json())
                                .then(data => {
                                    const selectedTagValue = data.readResults[0].v;
                                    document.getElementById(tag.id).innerHTML = selectedTagValue;
                                })
                                .catch(error => console.error(error));
                        });
                    }, 1000);
                })
                .catch(error => console.error(error));
        });


        // Trigger the event listener once to set up the initial state of the dropdown
        dropdownOfTags.dispatchEvent(new Event("change"));


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        dropdownOfTags.dispatchEvent(new Event("change"));

        document.querySelector("#IoTGatewayDIV button").addEventListener("click", () => {
            // Send the new value to the API
            let url = "http://" + document.getElementById("iot-gateway").value + "/iotgateway/write";
            const tag = dropdownOfTags.value;
            const value = newValueForIOTGatewaySelectedTag.value;
            const body = JSON.stringify([{ id: tag, v: value }]);

            console.log(body);
            console.log('fetch destination: '+'ServerRequests.php?kepurl='+url);
            fetch('ServerRequests.php?kepurl='+url, {
                    method: "POST",
                    body: body,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if (response.ok) {
                        bootbox.alert("Value change request sent successfully!");
                    } else {
                        response.json().then(data => {
                            bootbox.alert("There was an error while changing the value. Error message: " + data.message);
                        }).catch(error => {
                            console.error(error);
                            bootbox.alert("There was an error while changing the value.");
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                    bootbox.alert("There was an error while requesting change for the value.");
                });
        });


        function disablemobileblock(command) {
            command == "userCommanded" ? tf = true : command = null;

            if (tf === true) {

                //Start






                const unsupportedElem = document.getElementById('unsupported');
                unsupportedElem.style.display = "none";

                const getSheet = document.querySelector('link[href="style.css"]');
                const cssRules = getSheet.sheet.cssRules || getSheet.sheet.rules;
                for (let i = 0; i < cssRules.length; i++) {
                    const rule = cssRules[i];
                    if (rule.media && rule.media.mediaText.includes('max-width: 1100px')) {
                        getSheet.sheet.deleteRule(i);
                        // alert("Mobile block disabled successfully!");
                        return;
                    }
                }
                //  alert("Mobile block not found!");






                //end

            }

        }



        // Get the info button element
        const infoButton = document.getElementById('info-button');

        // Add a click event listener to the info button
        infoButton.addEventListener('click', function() {
            // Show a Bootbox alert when the info button is clicked
            bootbox.alert(`<h1>About this API client</h1>
            
            <hr>
            <p>

            The KepServerEX API Client KepConnect Online Edition is a software tool developed by Yunus Emre Vurgun, from ASP Dijital Dönüşüm Hizmetleri A.Ş. This API client is specifically designed to seamlessly connect to both IoT Gateway and Configuration API, facilitating efficient data transfer between devices and applications. ASP Dijital Dönüşüm Hizmetleri A.Ş retains all rights to this API client software, and any unauthorized use or distribution is strictly prohibited. For further information or any inquiries regarding this API client, please do not hesitate to contact us via <a href="https://aspdijital.com/tr/iletisim">aspdijital.com/tr/iletisim<a> or <a href="https://aspdijital.com/en/contact">aspdijital.com/en/contact<a>.<hr>


            <p><br>
            <i class="fa fa-book"></i> <a href="https://aspdijital.com/kepconnect/doc.pdf">Read the documentation</a>
            
            
            <br>`);
        });


        //////////////Hide live values

        isRed();

        function isRed() {


            document.getElementById('hidemassvalues').addEventListener("click", function() {
                document.getElementById('read_tags_and_values').style.display = "none";
                document.getElementById('hidemassvalues').innerText = "Show";
                document.getElementById('hidemassvalues').style.backgroundColor = "green";
                document.getElementById('hidemassvalues').style.color = "white";
                document.getElementById('hidemassvalues').style.padding = "5px";
                document.getElementById('hidemassvalues').style.borderRadius = "5px";

                document.getElementById('hidemassvalues').setAttribute('id', 'showmyvalues');

                isGreen();
            })


        }

        function isGreen() {


            document.getElementById('showmyvalues').addEventListener("click", function() {
                document.getElementById('read_tags_and_values').style.display = "block";
                document.getElementById('showmyvalues').innerText = "Hide";
                document.getElementById('showmyvalues').style.backgroundColor = "red";
                document.getElementById('showmyvalues').setAttribute('id', 'hidemassvalues');

                isRed();
            })

        }


        function loader() {
            var spinner = document.querySelector(".loader");
            var container = document.getElementById("bodyContainer");
            container.style.visibility = "hidden";
            spinner.style.display = "flex";
            setTimeout(loaderStop, 2000);
        }

        function loaderStop() {
            var spinner = document.querySelector(".loader");
            var container = document.querySelector("#bodyContainer");
            container.style.visibility = "visible";
            spinner.style.display = "none";
        }

        document.addEventListener("DOMContentLoaded", loader);