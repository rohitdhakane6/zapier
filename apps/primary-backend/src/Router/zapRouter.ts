import { Router, Request, Response, NextFunction } from "express";
import { CreatZapSchema } from "../Types/schema";
import db from "@repo/db";
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

// Create Zap
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  // Validate the incoming data
  const parsedData = CreatZapSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: parsedData.error.errors,
    });
  }

  const { name, AvailableTriggerId, AvailableActionId } = parsedData.data;

  try {
    const zap = await db.zap.create({
      data: {
        name,
        user:{
            connect:{
                //@ts-ignore
                id:req.userId
            }
        },
        Trigger: {
          create: {
            AvailableTriggerId,
          },
        },
        Action: {
          create: {
            AvailableActionId,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Zap created successfully",
      zap,
    });
  } catch (error) {
    return handleError(error, res);
  }
});

// Get All Zaps
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const zaps = await db.zap.findMany({
      where: {
        //@ts-ignore
        userId:req.userId
      },
    });

    return res.status(200).json({
      status: "success",
      zaps,
    });
  } catch (error) {
    return handleError(error, res);
  }
});

// Get single Zap
router.get("/:zapId", authMiddleware, async (req: Request, res: Response) => {
  const { zapId } = req.params;

  try {
    const zap = await db.zap.findUnique({
      where: {
        id: zapId,
        // @ts-ignore
        userId: req.userId,
      },
    });

    if (!zap) {
      return res.status(404).json({
        status: "error",
        message: "Zap not found",
      });
    }

    return res.status(200).json({
      status: "success",
      zap,
    });
  } catch (error) {
    return handleError(error, res);
  }
});

export const zapRouter = router;
