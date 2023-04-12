const { UserServices } = require('../services')
const userServices = new UserServices()


class UserController {

    static async readAllUsers(req, res) {
        try {
            const AllUsers = await userServices.pegaTodosRegistros()
            return res.status(200).json(AllUsers)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async readOneUser(req, res) {
        const { id } = req.params
        try {
            const OneUser = await userServices.pegaUmRegistro({ id })
            return res.status(200).json(OneUser)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async postUser(req, res) {
        const NewUser = req.body
        try {

            if (Object.keys(NewUser).length === 0) {
                throw new Error('corpo da requisição vazio');
            }

            const createUser = await userServices.criaRegistro(NewUser)
            return res.status(200).json({ message: 'Um Usuario foi criado', createUser });
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params
        const NewUser = req.body
        try {
            await userServices.atualizaRegistro(NewUser, id)
            return res.status(200).json({ mensagem: `id ${id} atualizado` });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params
        try {
            await userServices.apagaResgistro(id)
            return res.status(200).json({ message: 'Um Usuario foi deletado' });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

    // static async searchUser(req, res) {
    //     const user = await database.findOne({ where: { email: req.body.email } });
    //     if (user && bcrypt.compareSync(req.body.password, user.password)) {
    //         return res.status(200).json({ message: 'Login feito com sucesso!!'})
    //     } 
    //     else if (user != bcrypt.compareSync(req.body.password, user.password)){
    //         return res.status(200).json({ message: 'Usuario Senha Incorreta'})
    //     }
    //     else {
    //         return res.status(500).json({ message: 'Usuario '})
    //     }
    // }


}

module.exports = UserController;