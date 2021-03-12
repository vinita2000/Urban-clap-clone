$("button[target='services']").click(function(event){
    event.preventDefault();
    displayServices();
});

function getSessionData(){
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}

// displays services
function displayServices(){
    const storedData = getSessionData();
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/service/list-services`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(response){
            // console.log(response.data);
            addServicesToDOM(response.data);
            $("button[target='addService']").click(function(event){
                event.preventDefault();
                newServiceInput();
            });
            // book service
            $("button[target='bookService']").click(function(event){
                event.preventDefault();
                bookServiceInput();
            });
        },
        error(e){
            console.log(e);
            alert('Failed to load Services');
        }
    });
}

// adds services data to dom
function addServicesToDOM(services){
    $("div[class='result']").html("");
    const html = services.map(service=>`
        <div class="bookingDiv">
            <h3>${service.name}</h3>
            <p>ID: ${service._id}</p>
            <h3>Description: ${service.description}</h3>
            <h3>Service Price: ${service.price}</h3>
            <h3>Service Time: ${service.serviceTime}</h3>
            <p>Vendor ID: ${service.vendorID}</p>
            <button target="BookService" id="service${service._id}" class="btn">Book Service</button>
        </div>
    `)
    .join(''); 
    $("div[class='result']").append(html);
    const btns = `<button target="addService" class="btn">Add Service</button>`;
    $("div[class='result']").append(btns);
}

// adds new service
function newServiceInput(){
    addServiceForm();
    $("input[target='serviceAddOk']").click(function(event){
        event.preventDefault();
        let name = $("input[target='serviceName']").val().trim();
        let price = $("input[target='servicePrice']").val().trim();
        let description = $("input[target='serviceDescription']").val().trim();
        let serviceTime = $("input[target='serviceTime']").val().trim();
        let categoryID = $("input[target='categoryID']").val().trim();
        let vendorID = $("input[target='vendorID']").val().trim();

        if (name && name!=='' && price && price!=='' && description 
        && description!=='' && serviceTime && serviceTime!==''){
            addNewService({name,price,description,serviceTime, categoryID, vendorID});
        }else{
            alert('Invalid Service');
        }
    });
}


// input service data
function addServiceForm(){
    $("div[class='result']").html("");
    const html = `
    <form class="outer2">
        <input target="serviceName" placeholder="Service Name" type="text">
        <input target="servicePrice" placeholder="Price" type="text">
        <input target="serviceDescription" placeholder="Description" type="text">
        <input target="serviceTime" placeholder="Service Time" type="text">
        <input target="categoryID" placeholder="Category ID" type="text">
        <input target="vendorID" placeholder="Vendor ID" type="text">
        <input target="serviceAddOk" value="OK" class="btn" style="width: 30px;">
    <form>
    `;
    $("div[class='result']").append(html);
}

// input service data
function bookServiceForm(){
    $("div[class='result']").html("");
    const html = `
    <form class="outer2">
        <input target="vendorID" placeholder="vendor ID" type="text">
        <input target="serviceID" placeholder="Service ID" type="text">
        <input target="serviceQty" placeholder="Quantity" type="text">
        <input target="bookingTime" placeholder="Booking Time" type="text">
        <input target="serviceBookOk" value="OK" class="btn" style="width: 30px;">
    <form>
    `;
    $("div[class='result']").append(html);
}

// adds new service to db
function addNewService(data){
    const storedData = getSessionData();
    $.ajax({
        method:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/service/add-service`,
        data: data,
        dataType: 'json',
        success(response){
            alert('Service Added');
            $("div[class='result']").html("");
        },
        error(e){
            console.log(e);
            alert('Failed to add Service');
        }
    });
}

// books new service to db
function bookNewService(data){
    const storedData = getSessionData();
    const parameter = storedData._id;
    $.ajax({
        method:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/user/book-service/${parameter}`,
        data: data,
        dataType: 'json',
        success(response){
            alert('Service Booked');
            $("div[class='result']").html("");
        },
        error(e){
            console.log(e);
            alert('Booking Failed');
        }
    });
}

// book service input
function bookServiceInput(){
    bookServiceForm();
    $("input[target='serviceBookOk']").click(function(event){
        event.preventDefault();
        let qty = $("input[target='serviceQty']").val().trim();
        let bookingTime = $("input[target='bookingTime']").val().trim();
        let serviceID = $("input[target='serviceID']").val().trim();
        let vendorID = $("input[target='vendorID']").val().trim();

        if (qty && qty!=='' && bookingTime && bookingTime!=='' && serviceID 
        && serviceID!=='' && vendorID && vendorID !==''){
            bookNewService({qty, bookingTime, serviceID, vendorID});
        }else{
            alert('Invalid Service');
        }
    });
}