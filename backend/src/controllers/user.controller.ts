import { Request, Response } from "express";
import * as userService from "../services/user.service";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "../validators/user.validator";

export const getUsers = async (
  _req: Request,
  res: Response
) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

export const getUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id as string;

    const user = await userService.getUserById(userId);

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve user",
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
) => {
  try {
    const validation =
      createUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten(),
      });
    }

    const user = await userService.createUser(
      validation.data
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id as string;

    const validation =
      updateUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten(),
      });
    }

    const user = await userService.updateUser(
      userId,
      validation.data
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const updateUserStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id as string;

    const validation =
      updateUserStatusSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten(),
      });
    }

    const user = await userService.updateUserStatus(
      userId,
      validation.data.status
    );

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id as string;

    const user = await userService.deleteUser(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};