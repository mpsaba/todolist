users = [
    {
        id: 1,
        name: "Marissa Sab-a",
        username: "maris",
        password: "123456"
    },
    {
        id: 2,
        name: "Flora Laroza",
        username: "flora",
        password: "123456"
    }
]

global.loginCount = 0;



module.exports = {


    all:  function (req, res) {
        res.json({
            error: false,
            message: global.activeUsers
        });
    },

    login:  function (req, res) {

        var user = undefined;
        var lists = [];

        users.forEach(e => {
            if(e.username == req.body.username && e.password == req.body.password){
                user = e;
            }
        });

        if(user){

            global.toDoList.forEach(e => {
                if(e.userId == user.id){
                    lists.push(e);
                }
            });

            var newUser = {
                id: user.id,
                name: user.name,
                username: user.username,
                lists: lists
            }

            global.currentUser = newUser;

            if(!global.activeUsers.some(activeUser => activeUser.id == user.id)){
                global.activeUsers.push(newUser);
            }
            
            res.json({
                error: false,
                message: newUser
            });

        }else{
            res.json({
                error: true,
                message: "User not found. Please try again!"
            });
        }
        
    }

}






