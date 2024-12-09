/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    avatarUrl?: string;
    userAccount: string;
    email?: string;
    planetCode: string;
    gender: number;
    profile?: string;
    status: number;
    // tags?: { key?: string; label?: string }[];
    // notifyCount?: number;
    // unreadCount?: number;
    createTime?: Date;
    updateTime?: Date;
    role?: number;
    isDelete?: number;
    phone: string;
    tags:string;
};