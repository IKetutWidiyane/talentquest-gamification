import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const input = registerSchema.parse(req.body);

    const result = await authService.register(input);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "EMAIL_ALREADY_EXISTS") {
        res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
        return;
      }
    }

    res.status(400).json({
      success: false,
      message: "Invalid registration data",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const input = loginSchema.parse(req.body);

    const result = await authService.login(input);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVALID_CREDENTIALS") {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
        return;
      }

      if (error.message === "ACCOUNT_INACTIVE") {
        res.status(403).json({
          success: false,
          message: "Account is inactive",
        });
        return;
      }
    }

    res.status(400).json({
      success: false,
      message: "Invalid login data",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const user = await authService.getCurrentUser(req.user.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "USER_NOT_FOUND") {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      if (error.message === "ACCOUNT_INACTIVE") {
        res.status(403).json({
          success: false,
          message: "Account is inactive",
        });
        return;
      }
    }

    res.status(500).json({
      success: false,
      message: "Failed to get current user",
    });
  }
};