$("button[target='vendors']").click(function(event){
    event.preventDefault();
    displayVendors();
});

// adds vendors data to dom
function addVendorsToDOM(users){
    $("div[class='result']").html("");
    let html = '';
    for (const user of users){
        if (user.role === 'vendor'){
            html += `
                <div class="bookingDiv">
                    <h3>${user.name}</h3>
                    <p>id: ${user._id}</p>
                </div>
            `;
        }
    } 
    $("div[class='result']").append(html);
}

function getSessionData(){
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}

function displayVendors(){
    const storedData = getSessionData();
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/user/list-users`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(response){
            // console.log(response.bookings);
            addVendorsToDOM(response.data);
        },
        error(e){
            console.log(e);
            alert('Failed to load Vendors');
        }
    });
}

