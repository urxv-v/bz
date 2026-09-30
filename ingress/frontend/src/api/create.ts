import { NewExperimentItem,ExperimentItem, TaskStatus } from "../interfaces/experiments";
import { postCall } from "./utils";
import { Url } from "./url";

export async function createExperimentItemCall(name: string, fieldDaq?: NewExperimentItem['field_daq']) {
    const experimentItem: NewExperimentItem = {
        name: name,
        status: TaskStatus.PENDING,
        field_daq: fieldDaq,
    };
    return postCall<NewExperimentItem, ExperimentItem>(
        new Url().create, experimentItem, 201
    );
}
