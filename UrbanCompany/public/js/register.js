
$("input[id='register']").click(function(event){
    event.preventDefault();
    const email = $("input[id='email']").val();
    const password = $("input[id='password']").val();
    const address = $("input[id='address']").val();
    const role = $("input[id='role']").val();
    const name = $("input[id='name']").val();
    register({name, address, role, email, password});
});

// login 
function register(data){
    $.ajax({
        method:'POST',
        url:'/api/user/register',
        data: data,
        dataType: 'json',
        success(data){
            alert('Registered Successfully! Please Login');
            window.location = "/";
        },
        error(e){
            // console.log(e);
            alert('Registration Failed');
        }
    });
}