const User = require('./../models/user');
const bcrypt = require('bcrypt');

exports.get = async() => {
    return User.findAll();
}
exports.getbyId = async(id) => {
    return User.findAll({where:{id:id}});
}
exports.create = async (userDocument, creditCardToken, value) => {
    const uDoccoded = await bcrypt.hash(userDocument, 5);
    const cctCoded =  await bcrypt.hash(creditCardToken, 5);
    const createUser = await User.create({
        userDocument: uDoccoded,
        creditCardToken: cctCoded,
        value: value
    });
    return createUser;
}

exports.update = async({userDocument, creditCardToken, value}, id) => {
    if ((!userDocument && !creditCardToken)) {
        return await User.update({value:value}, {
            where:{
                id:id
            }
        });
    } else {
        if ((creditCardToken && creditCardToken && value)) {
            const uDocCoded = await bcrypt.hash(userDocument, 5);
            const cctCoded = await bcrypt.hash(creditCardToken, 5);
            return await User.update({userDocument:uDocCoded,creditCardToken:cctCoded, value:value}, {
                where: {
                    id: id
                }
            });
        }
        if ((userDocument) || (userDocument && value)) {
            const uDocCoded = await bcrypt.hash(userDocument, 5);
            return await User.update({userDocument:uDocCoded, value:value}, {
                where: {
                    id: id
                }
            });
        }
        if ((creditCardToken) || (creditCardToken && value)) {
            const cctCoded = await bcrypt.hash(creditCardToken, 5);
            return await User.update({creditCardToken:cctCoded}, {
                where: {
                    id: id
                }
            });
        }
    }
}
exports.delete = async(id) => {
    return User.destroy({ where: { id: id}});
}