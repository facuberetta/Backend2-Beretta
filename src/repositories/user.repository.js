import UserDAO from '../services/dao/user.dao.js';
import UserDTO from '../dto/user.dto.js';

const userDAO = new UserDAO();

export default class UserRepository {
    async getUserDTOById(id) {
        const user = await userDAO.getById(id);
        return new UserDTO(user);
    }

    async getUserByEmail(email) {
        return await userDAO.getByEmail(email);
    }

    async createUser(userData) {
        return await userDAO.create(userData);
    }
}
