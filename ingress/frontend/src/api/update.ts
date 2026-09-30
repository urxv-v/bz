import { Experiments, TaskStatus, ExperimentItem } from "../interfaces/experiments";
import { putCall } from "./utils";
import { Url } from "./url";

export async function updateExperimentCall(
  name: string, status: TaskStatus, id: number
) {
  const experimentItem: ExperimentItem = {
    id: id,
    name: name,
    status: status
  };
  return putCall<ExperimentItem, Experiments>(
    new Url().update,
    experimentItem,
    200
  );
}
