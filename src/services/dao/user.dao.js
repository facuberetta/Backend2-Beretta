import UserModel from '../../models/user.model.js';

export default class UserDAO {
    async getById(id) {
        return await UserModel.findById(id);
    }

    async getByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async create(userData) {
        return await UserModel.create(userData);
    }

    async update(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}
