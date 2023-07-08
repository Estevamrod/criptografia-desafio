const User = require('./../models/user');

exports.get = async(req, res) => {
    const query = await User.findAll();
    if (query[0] !== 0 && query.length !== 0 ) {
        res.status(200).json({
            'status': 'success',
            'data': query
        })
    } else {
        res.status(406).json({
            'status': 'failed',
            'message': 'Db is empty'
        })
    }
}

exports.createUser = async(req, res) => {
    if (req.body !== "") {
        const { userDocument, creditCardToken , value } = req.body;
        const uCreate = await User.create({
            userDocument: userDocument,
            creditCardToken: creditCardToken,
            value: value
        });
        if (uCreate[0] !== 0) {
            res.status(201).json({
                'status': 'success',
                'data': {
                    'userDocument': userDocument,
                    'creditCardToken': creditCardToken,
                    'value': value
                }
            });
        } else {
            res.status(405).json({
                'status': 'failed',
                'data': {
                    'message': 'No content available'
                }
            });
        }
        
    } else {
        res.status(406).json({
            'status': 'failed',
            'data': {
                'message': 'No content available'
            }
        });
    }
}

exports.updateUser = async(req, res) => {
    const uUpdate = await User.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    if (uUpdate[0] !== 0) {
        res.status(200).json({
            'status': 'success',
            'data': req.body
        });
    } else {
        res.status(404).json({
            'status': 'failed',
            'data': {
                'message': 'Column incorrect!'
            }
        });
    }
}

exports.deleteUser = async(req, res) => {
    const delUser = await User.destroy({
        where:{
            id: req.params.id
        }
    });
    if (delUser[0] !== 0) {
        res.status(200).json({
            'status': 'success',
            'message': 'delete with success'
        });
    } else {
        res.status(406).json({
            'status': 'failed',
            'message': 'delete had a failure!'
        })
    }
}
