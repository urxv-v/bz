import { Experiments } from "../interfaces/experiments";
import { getCall } from "./utils";
import { Url } from "./url";

export default async function getAll() {
    let response = await getCall<Experiments>(
        new Url().getExperiments,
        200
    );
    return response;
}
