import { User } from "@/components/layout/types";
import api from "@/scripts/httpClient";

async function getAllUsers(): Promise<Array<User>> {
    let result = new Array<User>();
    result = (await api().get("v1/users")).data;
    return result;
}

export default getAllUsers;