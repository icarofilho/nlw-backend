import { PrismaFeedBacksRepository } from "./repositories/prisma/prisma-feedbacks-repositoriy";
import { SubmitFeedBackService } from "./services/submit-feedback-service";
import nodemailer from "nodemailer";
import express from "express";
import { prisma } from "./prisma";
import { nodemailerMailerService } from "./services/nodemailer/nodemailer-mail-service";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedBacksRepository = new PrismaFeedBacksRepository();

  const nodemailerMailService = new nodemailerMailerService();

  const submitFeedbackService = new SubmitFeedBackService(
    prismaFeedBacksRepository,
    nodemailerMailService
  );

  await submitFeedbackService.execute({ type, comment, screenshot });

  return res.status(201).send();
});

routes.get("/users", (req, res) => {
  res.json({ users: "users" });
});
