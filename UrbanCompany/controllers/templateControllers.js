exports.indexPage = (req, res) => {
    try{
        res.render('index');
    }catch(e){
        res.status(401).json({
            message: 'Failed'
        });
    }
};

exports.loginPage = (req, res) => {
    try{
        res.render('login');
    }catch(e){
        res.status(401).json({
            message: 'Failed'
        });
    }
};

exports.registerPage = (req, res) => {
    try{
        res.render('register');
    }catch(e){
        res.status(401).json({
            message: 'Failed'
        });
    }
};

exports.profilePage = (req, res) => {
    try{
        res.render('profile');
    }catch(e){
        res.status(401).json({
            message: 'Failed'
        });
    }
};