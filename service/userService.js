const User = require('./../models/user');
const crypt = require('./crypt');

exports.get = async() => {
    const gUser = await User.findAll();
    return gUser;
}

exports.create = async (userDocument, creditCardToken, value) => {
    const uDoccoded = await crypt.encode(userDocument);
    const cctCoded = await crypt.encode(creditCardToken);
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
            const uDocCoded = await crypt.encode(userDocument);
            const cctCoded = await crypt.encode(creditCardToken);
            return await User.update({userDocument:uDocCoded,creditCardToken:cctCoded, value:value}, {
                where: {
                    id: id
                }
            });
        }
        if ((userDocument) || (userDocument && value)) {
            const uDocCoded = await crypt.encode(userDocument);
            return await User.update({userDocument:uDocCoded, value:value}, {
                where: {
                    id: id
                }
            });
        }
        if ((creditCardToken) || (creditCardToken && value)) {
            const cctCoded = await crypt.encode(creditCardToken);
            return await User.update({creditCardToken:cctCoded}, {
                where: {
                    id: id
                }
            });
        }
    }
}
exports.delete = async(id) => {
    return await User.destroy({ where: { id: id}});
}