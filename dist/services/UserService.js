"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    addUser(userData, authData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userDetails = yield this.prisma.Users.findMany({
                    where: {
                        email: userData.email,
                    },
                });
                console.log(userDetails);
                if (userDetails.length > 0) {
                    return { response: userDetails };
                }
                const user = yield this.prisma.Users.create({
                    data: {
                        username: userData.username,
                        email: userData.email,
                        AuthProvider: {
                            create: {
                                authProvidedBy: authData.authProvidedBy,
                                token: authData.token,
                            },
                        },
                    },
                });
                console.log("Created user:", user);
                return { response: [user] };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    deleteUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id }) {
            console.log(id);
            try {
                const result = yield this.prisma.Users.delete({
                    where: { id: id },
                });
                console.log(result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Users.findMany({});
                console.log(result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.Users.deleteMany({});
                console.log(result);
                return { response: result };
            }
            catch (error) {
                console.error(error);
                return { response: null, error };
            }
        });
    }
}
exports.default = UserService;
