
$("input[id='login']").click(function(event){
    event.preventDefault();
    const email = $("input[id='email']").val();
    const password = $("input[id='password']").val();
    login({email, password});
});

// login 
function login(data){
    $.ajax({
        method:'PUT',
        url:'/api/user/login',
        data: data,
        dataType: 'json',
        success(data){
            // store token to session
            const userToken = data.data.userToken;
            const userID = data.data._id;
            sessionStorage.setItem('userToken', userToken);
            sessionStorage.setItem('userID', userID);
            window.location = "/profile";
        },
        error(e){
            // console.log(e);
            alert('Login Failed');
        }
    });
}