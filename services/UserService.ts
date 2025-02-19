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
      return { response: user };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async deleteUser({ id }: { id: string }) {
    console.log(id);
    try {
      const result = await this.prisma.Users.delete({
        where: { id: id },
      });
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async getAllUsers() {
    try {
      const result = await this.prisma.Users.findMany({});
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
  async deleteAllUsers() {
    try {
      const result = await this.prisma.Users.deleteMany({});
      console.log(result);
      return { response: result };
    } catch (error) {
      console.error(error);
      return { response: null, error };
    }
  }
}
