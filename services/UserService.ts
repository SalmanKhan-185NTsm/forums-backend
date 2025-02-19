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
      // this.deleteAllUsers();
      // return;
      const user = await this.prisma.Users.create({
        data: {
          username: userData.username,
          email: userData.email,
        },
      });
      console.log("Created user:", user);
      //add authprovider details
      const registerAuth = await this.prisma.AuthProvider.create({
        data: {
          authProvidedBy: authData.authProvidedBy,
          token: authData.token,
          authForUserId: {
            connect: { id: user.id },
          },
        },
      });
      console.log("Auth registered:", registerAuth);
      return;
    } catch (error) {
      console.error(error);
      return;
    }
  }
  async getUserDetails(email: string) {}
  async deleteUser({ id }: { id: string }) {}
  async getAllUsers() {
    try {
      const users = await this.prisma.user.find();
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
// Export the class

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function createRecord() {
//   try {
//     // 1. Basic Create
//     const user = await prisma.user.create({
//       data: {
//         name: "Alice",
//         email: "alice@example.com",
//       },
//     });
//     console.log("Created user:", user);

//     // 2. Create with Nested Records (One-to-One)
//     const profile = await prisma.profile.create({
//       data: {
//         bio: "Software Engineer",
//         user: {
//           // Connect the profile to a user
//           create: {
//             name: "Bob",
//             email: "bob@example.com",
//           },
//         },
//       },
//     });
//     console.log("Created profile with nested user:", profile);

//     // 3. Create with Nested Records (One-to-Many)
//     const post = await prisma.post.create({
//       data: {
//         title: "My First Post",
//         content: "Hello, world!",
//         author: {
//           // Connect the post to an existing user (using connect)
//           connect: { id: 1 }, // Replace 1 with the actual user ID
//         },
//         categories: {
//           // Connect the post to multiple existing categories (using connect)
//           connect: [{ id: 1 }, { id: 2 }], // Replace with actual category IDs
//         },
//       },
//     });
//     console.log("Created post with connections:", post);

//     // 4. Create Multiple Records (Batch Create)
//     const users = await prisma.user.createMany({
//       data: [
//         { name: "Charlie", email: "charlie@example.com" },
//         { name: "David", email: "david@example.com" },
//       ],
//     });
//     console.log("Created multiple users:", users);

//     // 5. Create with Default Values
//     const product = await prisma.product.create({
//       data: {
//         name: "Awesome Widget",
//         // price will use the default value defined in the schema
//       },
//     });
//     console.log("Created product with default values:", product);

//     // 6. Handling Unique Constraints
//     try {
//       const user2 = await prisma.user.create({
//         data: {
//           name: "Eve",
//           email: "alice@example.com", // Duplicate email
//         },
//       });
//     } catch (error) {
//       if (error.code === "P2002") {
//         // Unique constraint violation
//         console.error("Error: Email already exists");
//       } else {
//         console.error("Error creating user:", error);
//       }
//     }
//   } catch (error) {
//     console.error("Error creating record:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// createRecord();
