import { checkStrIsNumber, splitStr } from "../helper/constance.js";

export const Validate = {
    CheckPhone(str) {
        const { length } = str;
        const check = checkStrIsNumber(str);
        return check && length === 10;
    },
    CheckCccd(str) {
        const { length } = str;
        const check = checkStrIsNumber(str);
        return check && (length === 9 || length === 12);
    },
    CheckDate(str) {
        const comp = splitStr(str, "-");
        const check = comp.every((el) => {
            const number = checkStrIsNumber(el);
            return number;
        });
        if (check) {
            let d = parseInt(comp[0], 10);
            let m = parseInt(comp[1], 10);
            let y = parseInt(comp[2], 10);
            let date = new Date(y, m - 1, d);
            if (
                date.getFullYear() === y &&
                date.getMonth() + 1 === m &&
                date.getDate() === d
            ) {
                return true;
            }
            return false;
        }
        return false;
    },
};