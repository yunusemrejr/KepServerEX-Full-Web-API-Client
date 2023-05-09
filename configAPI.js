const dropdownForChannels = document.getElementById("dropdown_of_channels_for_standard_API");
const pID_DOM_No_CHNLS_DOM = document.getElementById('project_data');
const CHNL_NAME_DOM_DEVICE_COUNT_DOM = document.getElementById('selected_channel_info');
const dropdownForDevices = document.getElementById('dropdown_of_devices_for_standard_API');

var selectedTypeNameChannels;
var selectedDevice;
var normalApiConf;
var username;
var password;
var projectEndpoint;
var selectedTypeNameDVC;
var switcher;
var projectId;
var selectedTypeNameTAG;

function normalAPI() {
    username = document.getElementById('normal-api_usr').value;
    password = document.getElementById('normal-api_pss').value;
    normalApiConf = 'http://' + document.getElementById('normal-api').value;
    projectEndpoint = '/config/v1/project/channels/';

    fetch(normalApiConf + projectEndpoint, {
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const allChannelNames = data.map(obj => obj["common.ALLTYPES_NAME"]);
            projectId = data[0]["PROJECT_ID"];
            const numberOfChannels = data.length;

            pID_DOM_No_CHNLS_DOM.innerHTML = `Project ID: ${projectId} <br>
      Number of Channels: ${numberOfChannels}`;

            dropdownForChannels.innerHTML = allChannelNames.map(typeName => `<option value="${typeName}">${typeName}</option>`).join('');

            dropdownForChannels.selectedIndex = 0;

            selectedTypeNameChannels = dropdownForChannels.value;
            const event = new Event("change", { bubbles: true });
            dropdownForChannels.dispatchEvent(event);

        })
        .catch(error => console.error('Error:', error));



    dropdownForChannels.addEventListener("change", function() {
        selectedTypeNameChannels = dropdownForChannels.value;

        fetch(normalApiConf + projectEndpoint + selectedTypeNameChannels, {
                headers: {
                    Authorization: 'Basic ' + btoa(username + ':' + password),
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const channelName = data["common.ALLTYPES_NAME"];
                const CHANNEL_STATIC_TAG_COUNT = data["servermain.CHANNEL_STATIC_TAG_COUNT"];

                CHNL_NAME_DOM_DEVICE_COUNT_DOM.innerHTML = `Channel Name: ${channelName}<br>CHANNEL STATIC TAG COUNT: ${CHANNEL_STATIC_TAG_COUNT}`;
            })
            .catch(error => console.error(error));

        fetch(normalApiConf + projectEndpoint + selectedTypeNameChannels + "/devices", {
                headers: {
                    Authorization: 'Basic ' + btoa(username + ':' + password),
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const allDeviceNames = data.map(obj => obj["common.ALLTYPES_NAME"]);

                dropdownForDevices.innerHTML = allDeviceNames.map(device => `<option value="${device}">${device}</option>`).join('');
                dropdownForDevices.selectedIndex = 0;
                const event = new Event("change", { bubbles: true });
                dropdownForDevices.dispatchEvent(event);

            })
            .catch(error => console.error(error));

    });



    dropdownForDevices.addEventListener("change", function() {
        selectedTypeNameDVC = dropdownForDevices.value;


        fetch(normalApiConf + projectEndpoint + selectedTypeNameChannels + "/devices/" + selectedTypeNameDVC, {
                headers: {
                    Authorization: 'Basic ' + btoa(username + ':' + password),
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {

                const getDOM = document.getElementById('selected_device_info');
                selectedDevice = selectedTypeNameDVC;
                const parentChannel = data["servermain.DEVICE_CHANNEL_ASSIGNMENT"];
                const deviceUniqueID = data["servermain.DEVICE_UNIQUE_ID"];
                const staticTagCount = data["servermain.DEVICE_STATIC_TAG_COUNT"];

                getDOM.innerHTML = `Device Name: ${selectedDevice}<br>Parent Channel: ${parentChannel}<br>No. of Tags in Device: ${staticTagCount}<br>Device Unique ID: ${deviceUniqueID}<br>`;


                ////////////////////////////////////fetch tags/////








                fetch(normalApiConf + projectEndpoint + selectedTypeNameChannels + "/devices/" + selectedTypeNameDVC + "/tags", {
                        headers: {
                            Authorization: 'Basic ' + btoa(username + ':' + password),
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();

                    })
                    .then(data => {
                        const allTagNames = data.map(obj => obj["common.ALLTYPES_NAME"]);



                        document.getElementById('dropdown_of_tags_for_standard_API').innerHTML = allTagNames.map(typeName => `<option value="${typeName}">${typeName}</option>`).join('');
                        //  dropdown_of_tags_for_standard_API.selectedIndex = 0;
                        const eventoftag = new Event("change", { bubbles: true });
                        dropdown_of_tags_for_standard_API.dispatchEvent(eventoftag);

                    })
                    .catch(error => console.error('Error:', error));


                document.getElementById('dropdown_of_tags_for_standard_API').addEventListener("change", function() {
                    selectedTypeNameTAG = document.getElementById('dropdown_of_tags_for_standard_API').value;

                    fetch(normalApiConf + projectEndpoint + selectedTypeNameChannels + "/devices/" + selectedTypeNameDVC + "/tags/" + selectedTypeNameTAG, {
                            headers: {
                                Authorization: 'Basic ' + btoa(username + ':' + password),
                                'Content-Type': 'application/json'
                            },
                            method: 'GET'
                        })
                        .then(response => response.json())
                        .then(data => {
                            const TagName = data["common.ALLTYPES_NAME"];
                            const scanRate = data["servermain.TAG_SCAN_RATE_MILLISECONDS"];
                            const address = data["servermain.TAG_ADDRESS"];
                            const dataType = data["servermain.TAG_DATA_TYPE"];

                            document.getElementById('selected_tag_info').innerHTML = `Tag Name:${TagName}<br>
                            
                            Scan rate:${scanRate}<br>
                            Address:${address}<br>
                            Data Type:${dataType}`;



                        })
                        .catch(error => console.error(error));



                });



                ///////////////////////////////////////fetchtags end////




            })
            .catch(error => console.error(error));

    });

}



function createNewTag(selectedTypeNameDVC, username, password) {
    let tagNameINPUT = document.getElementById('tagNameINPUT').value;
    let tagDataTypeINPUT = document.getElementById('tagDataTypeINPUT').value;
    let tagScanRateINPUT = document.getElementById('tagScanRateINPUT').value;
    let tagAddressINPUT = document.getElementById('tagAddressINPUT').value;

    // Parse tagReadWriteAccYNinput as a boolean

    const tagJSON = {
        "common.ALLTYPES_NAME": tagNameINPUT,
        "servermain.TAG_ADDRESS": tagAddressINPUT,
        "servermain.TAG_DATA_TYPE": parseInt(tagDataTypeINPUT),
        "servermain.TAG_SCAN_RATE_MILLISECONDS": parseInt(tagScanRateINPUT)
    };



    let path = normalApiConf + projectEndpoint + selectedTypeNameChannels + "/devices/" + selectedTypeNameDVC + "/tags";
    console.log(path + " " + username + " " + password);
    fetch(path, {
            method: "POST",
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tagJSON),
        })
        .then((response) => {
            if (!response.ok) {
                console.log("HTTP error! Status: " + response.status);
                bootbox.alert("HTTP error! Status: " + response.status);
                throw new Error("HTTP error! Status: " + response.status);

            }
            console.log("SUCCESS!" + response.json());
            bootbox.alert("SUCCESS!" + response.json());
            return response.json();

        })
        .then((data) => {
            console.log("Success: ", data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });

}




/////CHANGE SELECTED TAG DETAILS



function updateTag(selectedTypeNameDVC, username, password, projectId) {

    projectId = document.getElementById('project_data').textContent.match(/\d+/);



    let selectedTagName = document.getElementById("dropdown_of_tags_for_standard_API").value;

    let tagscanrate = window.prompt("Enter new tag scan rate:");
    let tagaddress = window.prompt("Enter new target address:");
    let tagdatatype = window.prompt("Enter the new datatype:");




    const tagJSON = {
        "PROJECT_ID": parseInt(projectId),
        "common.ALLTYPES_NAME": selectedTagName,
        "servermain.TAG_ADDRESS": tagaddress,
        "servermain.TAG_DATA_TYPE": parseInt(tagdatatype),
        "servermain.TAG_SCAN_RATE_MILLISECONDS": parseInt(tagscanrate),
    };

    let path =
        normalApiConf +
        projectEndpoint +
        selectedTypeNameChannels +
        "/devices/" +
        selectedDevice +
        "/tags/" +
        selectedTypeNameTAG;
    console.log(path);

    fetch(path, {
            method: "PUT",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tagJSON),
        })
        .then((response) => {
            if (!response.ok) {
                console.log("HTTP error! Status: " + response.status);
                bootbox.alert("HTTP error! Status: " + response.status);
                throw new Error("HTTP error! Status: " + response.status);
            }
            console.log("SUCCESS!" + response.json());
            bootbox.alert("SUCCESS!" + response.json());
            return response.json();
        })
        .then((data) => {
            console.log("Success: ", data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}




///END OF THAT SEC



function checkFixProjectID() {
    // Get the project ID displayed in the HTML
    const displayedProjectId = projectId;

    // Get the project ID from the API
    fetch(normalApiConf + '/config/v1/project', {
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password),
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            const currentProjectId = data[0]["PROJECT_ID"];
            console.log("current" +
                currentProjectId);
            // If the displayed project ID is not the same as the current project ID, update the HTML
            if (displayedProjectId !== currentProjectId) {
                console.log("ID is wrong, changing...");
                pID_DOM_No_CHNLS_DOM.innerHTML = `Project ID: ${currentProjectId} <br>
            Number of Channels: ${numberOfChannels}`;
            }
        })
        .catch(error => console.error(error));
}


function deleteselectedtag(selectedTypeNameTAG, username, password) {
    usernameForTag = username;
    passwordForTag = password;
    if (document.getElementById("chkbx").checked) {


        ////***






        fetch(normalApiConf + projectEndpoint + selectedTypeNameChannels + "/devices/" + selectedTypeNameDVC + "/tags/" + selectedTypeNameTAG, {
                headers: {
                    Authorization: 'Basic ' + btoa(usernameForTag + ':' + passwordForTag),
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                bootbox.alert(JSON.stringify("successfully sent the DELETE request!"));
                return response.json();

            })

        .catch(error => console.error('Error:', error));



        //*******/
    }



    document.getElementById("chkbx").checked = false;
}