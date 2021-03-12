$("button[target='categories']").click(function(event){
    event.preventDefault();
    displayCategories();
});

function getSessionData(){
    const token = sessionStorage.getItem('userToken');
    const _id = sessionStorage.getItem('userID');
    if(!token || !_id){
        throw new Error('Session data extraction failed');
    }
    return {token, _id};
}


function displayCategories(){
    const storedData = getSessionData();
    $.ajax({
        method:'GET',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/category/list-categories`,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success(response){
            // console.log(response.data);
            addCategoriesToDOM(response.data);
            $("button[target='addCategory']").click(function(event){
                event.preventDefault();
                newCategoryInput();
            });
        },
        error(e){
            console.log(e);
            alert('Failed to load Categories');
        }
    });
}

// adds categories data to dom
function addCategoriesToDOM(categories){
    $("div[class='result']").html("");
    const html = categories.map(category=>`
        <div class="bookingDiv">
            <h3 >${category.name}</h3>
            <p>id: ${category._id}</p>
        </div>
    `)
    .join(''); 
    $("div[class='result']").append(html);
    const btn = `<button target="addCategory" class="btn">Add Category</button>`
    $("div[class='result']").append(btn);
}

// adds new categories
function newCategoryInput(){
    addCategoryForm();
    let name;
    $("input[target='categoryOk']").click(function(event){
        event.preventDefault();
        name = $("input[target='categoryName']").val().trim();
        if (name && name!==''){
            addNewCategory({name});
        }else{
            alert('Invalid Category');
        }
    });
}

// input category data
 function addCategoryForm(){
    $("div[class='result']").html("");
    const html = `
    <form class="outer2">
        <input target="categoryName" placeholder="Category Name" type="text">
        <input target="categoryOk" value="OK" class="btn" style="width: 30px;">
    <form>
    `;
    $("div[class='result']").append(html);
}


// adds new category to db
function addNewCategory(data){
    const storedData = getSessionData();
    $.ajax({
        method:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", storedData.token);
        },
        url:`/api/category/add-category`,
        data: data,
        dataType: 'json',
        success(response){
            alert('Category Added');
            $("div[class='result']").html("");
        },
        error(e){
            console.log(e);
            alert('Failed to add Category');
        }
    });
}
