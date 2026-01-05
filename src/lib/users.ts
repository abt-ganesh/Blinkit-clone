import fs from "node:fs";
import path from "node:path";


export type User = { id: string; email: string; password: string; name: string };

const filePath = path.join(process.cwd(), "users.json");

export function getUsers(): User[] {
  try {
    if (!fs.existsSync(filePath)) {
      console.log("users.json not found at:", filePath);
      return [];
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent) return [];
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

export function getUserByEmail(email: string) {
  const users = getUsers();
  return users.find(u => u.email === email);
}

export function createUser(user: User) {
  try {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log("User created successfully at:", filePath);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
