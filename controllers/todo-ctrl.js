
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

        var params = this.checkRequiredFields(req, ["id", "userId"]);
        if (params.error == false) {
            var i = global.toDoList.map(e => e.id).indexOf(req.body.id);

            if (i < 0) {
                res.json({
                    error: true,
                    message: "Item not found."
                });

            } else {

                if (global.toDoList[i].userId == req.body.userId) {

                    var oldItem = global.toDoList.splice(i, 1);
                    ["title", "description", "isCompleted"].forEach(e => {
                        if (req.body.hasOwnProperty(e)) {
                            oldItem[0][e] = req.body[e];
                        }
                    });

                    global.toDoList.push(oldItem[0]);

                    res.json({
                        error: false,
                        message: "You have successfully updated item on your To Do List."
                    });

                } else {
                    res.json({
                        error: true,
                        message: "Item cannot be updated by unauthorized user."
                    });
                }

            }

        } else {
            res.json(params);
        }
    },

    delete: function (req, res) {

        var params = this.checkRequiredFields(req, ["id", "userId"]);
        if (params.error == false) {
            var i = global.toDoList.map(e => e.id).indexOf(req.body.id);

            if (i < 0) {
                res.json({
                    error: true,
                    message: "Item not found."
                });
            } else {

                if (global.toDoList[i].userId == req.body.userId) {

                    global.toDoList.splice(i, 1);
                    res.json({
                        error: false,
                        message: "You have successfully deleted item on your To Do List."
                    });

                } else {
                    res.json({
                        error: true,
                        message: "Item cannot be deleted by unauthorized user."
                    });
                }

            }
        } else {
            res.json(params);
        }

    },

    checkRequiredFields: function (req, reqFields) {

        if (global.currentUser) {
            req.body["userId"] = global.currentUser.id;
        }

        var params = {};
        var missingField = [];

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






