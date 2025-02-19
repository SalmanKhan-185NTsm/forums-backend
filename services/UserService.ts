interface Users {
  username: string;
  email: string;
}
interface AuthData {
  authProvidedBy: string;
  token: string;
  userId?: string;
}

export default class UserService {
  prisma: any;
  constructor(prisma: any) {
    this.prisma = prisma;
  }
  async addUser(userData: Users, authData: AuthData) {
    try {
      const user = await this.prisma.Users.create({
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
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }
  async deleteUser({ id }: { id: string }) {
    const result = await this.prisma.Users.delete({ id: id });
    console.log(result);
    return result;
  }
  async getAllUsers() {
    try {
      const users = await this.prisma.Users.findMany({});
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteAllUsers() {
    const result = await this.prisma.Users.deleteMany({});
    console.log(result);
    return result;
  }
}
