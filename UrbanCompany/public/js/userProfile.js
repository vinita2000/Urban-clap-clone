$("button[target='profile']").click(function(event){
    event.preventDefault();
    displayProfile();
});

function getSessionData(){
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}

// adds services data to dom
function addProfileToDOM(data){
    $("div[class='result']").html("");
    const html = `
        <div id="profile${data._id}" class="bookingDiv">
            <h3>${data.name}</h3>
            <h3>${data.email}</h3>
            <h3>Role: ${data.role}</h3>
            <h3>Address: ${data.address}</h3>
            <button id="user${data._id}" class="btn" target="updateProfile">Update</button>
        </div>
    `; 
    $("div[class='result']").append(html);
}

// displays services
function displayProfile(){
    const storedData = getSessionData();
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/user/profile/${storedData._id}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(response){
            // console.log(response.data);
            addProfileToDOM(response.data);
            // update profile
            $("button[target='updateProfile']").click(function(event){
                event.preventDefault();
                newProfileInput();
            });
        },
        error(e){
            console.log(e);
            alert('Failed to load Profile');
        }
    });
}

// updates user profile 
function newProfileInput(){
    addProfileForm();
    $("input[target='profileOk']").click(function(event){
        event.preventDefault();
        let name = $("input[target='profileName']").val().trim();
        let email = $("input[target='profileEmail']").val().trim();
        let address = $("input[target='profileAddress']").val().trim();
        if (name && name!=='' && email && email !=='' && address && address !==''){
            updateProfile({name, email, address});
        }else{
            alert('Invalid Category');
        }
    });
}

// input category data
function addProfileForm(){
    $("div[class='result']").html("");
    const html = `
    <form class="outer2">
        <input target="profileName" placeholder="Name" type="text">
        <input target="profileAddress" placeholder="Address" type="text">
        <input target="profileEmail" placeholder="Email" type="text">
        <input target="profileOk" value="OK" class="btn" style="width: 30px;">
    <form>
    `;
    $("div[class='result']").append(html);
}


// updates profile in db
function updateProfile(data){
    const storedData = getSessionData();
    const parameter = storedData._id;
    $.ajax({
        method:'PUT',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/user/update-info/${parameter}`,
        data: data,
        dataType: 'json',
        success(response){
            alert('Profile Updated');
            $("div[class='result']").html("");
        },
        error(e){
            console.log(e);
            alert('Failed to Update Profile');
        }
    });
}