import { MailService } from "./mail-service";
import { FeedBacksRepository } from "./../repositories/feedbacks-repositories";
interface SubmitFeedBackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedBackService {
  constructor(
    private feedBacksRepository: FeedBacksRepository,
    private mailService: MailService
  ) {}
  async execute(request: SubmitFeedBackServiceRequest) {
    const { type, comment, screenshot } = request;

    await this.feedBacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailService.sendMail({
      subject: "Novo Feedback",
      body: [
        "<div style='font-family: sans-serif; font-size: 16px; color:#111'>",
        `Novo feedback de ${type}`,
        `<p>Comentário: ${comment}</p>`,
        "</div>",
      ].join("\n"),
    });
  }
}
