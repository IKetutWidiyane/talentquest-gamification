import bcrypt from "bcryptjs";
import * as userRepository from "../repositories/user.repository";

export const getAllUsers = async () => {
  return userRepository.findAllUsers();
};

export const getUserById = async (userId: string) => {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
};

export const createUser = async (data: {
  email: string;
  password: string;
  role: "CANDIDATE" | "TALENT_ACQUISITION";
  status?: "ACTIVE" | "INACTIVE";
}) => {
  const existingUser = await userRepository.findUserByEmail(
    data.email
  );

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  return userRepository.createUser({
    email: data.email,
    passwordHash,
    role: data.role,
    status: data.status,
  });
};

export const updateUser = async (
  userId: string,
  data: {
    email?: string;
    role?: "CANDIDATE" | "TALENT_ACQUISITION";
  }
) => {
  const existingUser =
    await userRepository.findUserById(userId);

  if (!existingUser) {
    throw new Error("USER_NOT_FOUND");
  }

  if (data.email) {
    const emailOwner =
      await userRepository.findUserByEmail(data.email);

    if (emailOwner && emailOwner.id !== userId) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
  }

  return userRepository.updateUser(userId, data);
};

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "INACTIVE"
) => {
  const existingUser =
    await userRepository.findUserById(userId);

  if (!existingUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return userRepository.updateUserStatus(
    userId,
    status
  );
};

export const deleteUser = async (userId: string) => {
  const existingUser =
    await userRepository.findUserById(userId);

  if (!existingUser) {
    throw new Error("USER_NOT_FOUND");
  }

  return userRepository.deleteUser(userId);
};