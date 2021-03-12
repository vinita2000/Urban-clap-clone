$("button[target='bookings']").click(function(event){
    event.preventDefault();
    displayBookings();
});
// all bookings for admin
$("button[target='allBookings']").click(function(event){
    event.preventDefault();
    displayAllBookings();
});

// adds bookings data to dom
function addBookingsToDOM(bookings){
    $("div[class='result']").html("");
    const html = bookings.map(booking=>`
        <div id="${booking._id}" class="bookingDiv">
            <p>Service ID: ${booking.serviceID}</p>
            <p>Vendor ID: ${booking.vendorID}</p>
            <h3>Quantity: ${booking.qty}</h3>
            <h3>Total Price: ${booking.totalPrice}</h3>
        </div>
    `)
    .join(''); 
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

function displayBookings(){
    const storedData = getSessionData();
    $("button[target='bookings']").attr("id", storedData._id);
    const parameter = storedData._id;
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/user/list-bookings/${parameter}`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(response){
            // console.log(response.bookings);
            addBookingsToDOM(response.bookings);
        },
        error(e){
            console.log(e);
            alert('Failed to load Bookings');
        }
    });
}

function displayAllBookings(){
    const storedData = getSessionData();
    // $("button[target='allBookings']").attr("id", storedData._id);
    const parameter = storedData._id;
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/user/list-all-bookings`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(response){
            // console.log(response.bookings);
            addBookingsToDOM(response.bookings);
        },
        error(e){
            console.log(e);
            alert('Failed to load Bookings');
        }
    });
}