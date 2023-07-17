import { Role } from "../states/userState";

export default function isAdmin(role: Role[]): boolean {
    let admin = false;
    role.forEach(element => {
        if (element.name === "ADMIN") {
            admin = true;
        }
    })
    return admin;
}