import { oldVisitCronJob } from "./old-visit.cron";
import { removeOldPasswordsCronJob } from "./remove-old-passwords";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  // removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  oldVisitCronJob.start();
};
