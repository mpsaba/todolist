
listFormat = {
    id: 1,
    title: "",
    description: "",
    isCompleted: false,
    userId: undefined
}

module.exports = {

    all: function (req, res) {
        res.json({
            error: false,
            message: global.toDoList
        });
    },

    new: function (req, res) {

        var params = this.checkRequiredFields(req, ["title", "description", "userId"]);
        if (params.error == false) {
            global.toDoList.push({
                id: global.idIncrement++,
                title: params.data.title,
                description: params.data.description,
                isCompleted: false,
                userId: params.data.userId
            });
    
            res.json({
                error: false,
                message: "You have successfully added item on your To Do List."
            });
        } else {
            res.json(params);
        }

    },

    update: function (req, res) {

        var newParams = req.body;

        if (global.toDoList.some(list => list.id == req.body.id)) {
            var item = global.toDoList.pop(req.body.id);
            global.toDoList.push({
                id: item.id,
                title: newParams.title,
                description: newParams.description,
                isCompleted: newParams.isCompleted
            })

            res.json({
                error: false,
                message: "You have successfully updated item on your To Do List."
            });

        } else {
            res.json({
                error: true,
                message: "Item not found."
            });
        }
    },

    delete: function (req, res) {

        var itemForDelete = undefined;
        global.toDoList.forEach(e => {
            if (e.id == req.body.id){
                itemForDelete = e;
            }
        });

        if (itemForDelete){

            if (itemForDelete.userId == req.body.userId) {

                global.toDoList.pop(req.body.id);

                res.json({
                    error: false,
                    message: "You have successfully deleted item on your To Do List."
                });

            }else{
                res.json({
                    error: true,
                    message: "Item cannot be deleted by unauthorized user."
                });
            }
        } else {
            res.json({
                error: true,
                message: "Item not found."
            });
        }
    },

    checkRequiredFields: function (req, reqFields) {

        var params = {};
        var missingField = [];

        if(global.currentUser){
            req.body["userId"] = global.currentUser.id;
        }

        reqFields.forEach(e => {
            if (req.body.hasOwnProperty(e)) {
                params[e] = req.body[e];
            } else {
                missingField.push(e);
            }
        });

        if (missingField.length == 0) {
            return {
                error: false,
                data: params
            }
        } else {
            return {
                error: true,
                message: "Missing required fields. " + missingField.join(', ')
            }
        }
    }

}






