const userService = require('../service/userService');

exports.get = async(req, res, next) => {
    try {
        const query = await userService.get();
        if (query.length !== 0) {
            res.status(200).json({
                'status': 'success',
                'data': query
            });
        } else {
            res.status(406).json({
                'status': 'failed',
                'message': 'Db is empty'
            });
        }
    }catch(error) {
        next(error);
    }
}

exports.createUser = async(req, res, next) => {
        try {
            const { userDocument, creditCardToken , value } = req.body;
            const uSCreate = await userService.create(userDocument,creditCardToken,value);
            if (uSCreate) {
                res.status(201).json({
                    'status': 'success',
                    'data': uSCreate
                });
            } else {
                res.status(405).json({
                    'status': 'failed',
                    'data': {
                        'message': 'No content available'
                    }
                });
            }
        } catch (error) {
            next(error)
        }
}

exports.updateUser = async(req, res, next) => {
    try {
        const userDocument = req.body.userDocument;
        const creditCardToken = req.body.creditCardToken;
        const value = req.body.value;
        const id = req.params.id;
        const uUpdate = await userService.update({userDocument, creditCardToken, value},id);
        if (uUpdate[0] !== 0) {
            res.status(200).json({
                'status': 'success',
                'data': req.body
            });
        } else {
            res.status(404).json({
                'status': 'failed',
                'data': {
                    'message': 'Keys incorrects or no keys created or these column was already updated'
                }
            });
        }
    }catch (error) {
        next(error);
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        const dUser = await userService.delete(req.params.id);
        if (dUser !== 0) {
            res.status(200).json({
                'status': 'success',
                'message': 'delete with success'
            });
        } else {
            res.status(406).json({
                'status': 'failed',
                'message': 'delete had a failure!'
            });
        }
    } catch (error) {
        next(error);
    }
}
