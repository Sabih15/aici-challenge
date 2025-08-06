export interface IUser
{
    id: number;
    uuid: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserCredential
{
    email: string;
    password: string;
}