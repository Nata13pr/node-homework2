import { CronJob } from "cron";
import dayjs from "dayjs";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const sevenDaysAgo = dayjs().subtract(7, "day").toDate();

    const inActiveUsers = await tokenRepository.getOldVisitors(sevenDaysAgo);

    for (const user of inActiveUsers) {
      const activeUser = await userRepository.getById(user._userId);

      await emailService.sendMail(EmailTypeEnum.OLD_VISIT, activeUser.email, {
        name: activeUser.name,
      });
      console.log(`Remainder is sent to ${activeUser.name}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const oldVisitCronJob = new CronJob("0 0 * * *", handler);
