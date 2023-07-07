const User = require('./../models/user');
const db = require('./../models/db');

(async() => {
    await db.sync();
});


exports.createUser = async(req, res) => {
    if (req.body.uDoc !== "" && req.body.cCT !== "" && req.body.val !== "") {
        const uDoc = req.body.userDocument;
        const cCT = req.body.creditCardToken;
        const val = req.body.value;
        const uCreate = await User.create({
            userDocument: uDoc,
            creditCardToken: cCT,
            value: val
        });
        if (uCreate[0] !== 0) {
            res.status(201).json({
                'status': 'success',
                'data': {
                    'uDoc': uDoc,
                    'cCT': cCT,
                    'val': val
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
    if (req.params.id !== null) {
        const Id = req.params.id;
        const uUpdate = await User.update(req.body, {
            where: {
                id: Id
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
    } else {
        res.status(406).json({
            'status': 'failed',
            'data': {
                'message': 'Params incorrect!'
            }
        });
    }
}

exports.deleteUser = async(req, res) => {
    const id = req.params.id;
    const delUser = await User.destroy({
        where:{
            id: id
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
