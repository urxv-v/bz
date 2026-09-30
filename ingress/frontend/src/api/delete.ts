import { Experiments } from "../interfaces/experiments";
import { deleteCall } from "./utils";
import { Url } from "./url";

export async function deleteExperimentCall( name: string) {
    return deleteCall<Experiments>(
        new Url().deleteUrl(name),
        200
    );

}
