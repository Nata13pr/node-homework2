import { CronJob } from "cron";
import dayjs from "dayjs";

import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    const ninetyDaysAgo = dayjs().subtract(90, "day").toDate();
    const deletedCount =
      await oldPasswordRepository.deleteBeforeDate(ninetyDaysAgo);
    console.log(`Deleted ${deletedCount} old passwords`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldPasswordsCronJob = new CronJob(" * * * * *", handler);
