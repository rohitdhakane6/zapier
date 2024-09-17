import { Router, Request, Response, NextFunction } from "express";
import { SigninSchema, SignupSchema } from "../Types/schema";
import db from "@repo/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from "../Middleware";
const router = Router();

// Middleware to handle unexpected errors
const handleError = (error: unknown, res: Response) => {
  console.error(error);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error. Please try again later.",
  });
};

// Function to generate JWT token
function generateToken(userId: number): string {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Set token expiry
}

// Sign up route
router.post("/signup", async (req: Request, res: Response) => {
  // Validate the incoming data
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: parsedData.error.errors,
    });
  }

  const { email, name, password } = parsedData.data;

  try {
    // Check if the user already exists
    const existingUser = await db.user.findFirst({ where: { email } });

    if (existingUser) {
      return res.status(403).json({
        status: "error",
        message: "User already exists, please login",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await db.user.create({ data: { email, name, password: hashedPassword } });

    

    // Respond with a success message and token
    return res.status(201).json({
      status: "success",
      message: "User created successfully. Please verify your account by checking your email.",
    });
  } catch (error) {
    return handleError(error, res);
  }
});

// Sign in route
router.post("/signin", async (req: Request, res: Response) => {
  // Validate the incoming data
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: parsedData.error.errors,
    });
  }

  const { email, password } = parsedData.data;

  try {
    // Check if the user exists
    const user = await db.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(403).json({
        status: "error",
        message: "User does not exist, please register first",
      });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password || "");

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // Generate a JWT token
    const token = generateToken(user.id);

    // Respond with a success message and token
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
    });
  } catch (error) {
    return handleError(error, res);
  }
});

// Protected route example
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  // Type assertion for request.userId
  const userId = (req as any).userId; // Adjust based on how `authMiddleware` sets the user ID

  if (!userId) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  try {
    const user = await db.user.findFirst({
      where: { id: userId },
      select: { name: true, email: true }
    });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "User data retrieved successfully",
      user
    });
  } catch (error) {
    return handleError(error, res);
  }
});

export const userRouter = router;
