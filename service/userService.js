const User = require('./../models/user');
const crypt = require('./crypt');

exports.get = async(token) => {
    User.findAll().then(async(uData) => {
        let arrDecoded = {};
        for (let i = 0; i < uData.length; i++) {
            arrDecoded[i] = {
                'id': uData[i]['dataValues']['id'],
                'userDocument': crypt.decode(uData[i]['dataValues']['userDocument']),
                'creditCardToken': crypt.decode(uData[i]['dataValues']['creditCardToken']),
                'value': uData[i]['dataValues']['value']
            }
        }
        console.log(token);
        console.log(await crypt.decode(token));
        return "salve";
    });
}
exports.getbyId = async(id) => {
    const byId = await User.findAll({
        where:{
            id:id
        }
    });
    const userDocument = await crypt.decode(byId[0]['dataValues']['userDocument']); 
    const creditCardToken = await crypt.decode(byId[0]['dataValues']['creditCardToken']);
    const value = byId[0]['dataValues']['value'];
    return {id, userDocument, creditCardToken, value};
}


exports.create = async ({userDocument, creditCardToken, value}) => {
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