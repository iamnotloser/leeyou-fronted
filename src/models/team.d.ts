import {UserType} from "./user";

/**
 * 用户类别
 */
export type TeamType = {
    id: number;
    name: string;
    userId: string;
    description: string,
    expireTime?: string[],
    maxNum: number,
    password?: string,
    status: number,
    createTime?: Date;
    updateTime?: Date;
    createUser?: UserType;
};