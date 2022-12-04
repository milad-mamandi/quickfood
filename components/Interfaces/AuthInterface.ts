export interface registerFormType {
    name: string,
    email: { value: string, valid: boolean },
    password: { value: string, strength: number },
    formValid: boolean
}
export interface loginFormType {
    email: { value: string, valid: boolean },
    password: { value: string, valid: boolean },
    formValid: boolean
}
export interface actionType {
    type: string,
    payload: string
}
export interface apiResultType {
    result : number,
    message : string
}