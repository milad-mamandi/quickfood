export const checkEmailValidity = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) != null;
}
export const checkPasswordStrength = (password : string) => {
    let strength = 0;
    if (password.length >= 8){
        strength++;
        (String(password).match(/(?=.*[A-Z])/) && strength++);
        (String(password).match(/(?=.*\d)/) && strength++);
        (String(password).match(/(?=.*[-+_!@#$%^&*.,?])/) && strength++);
    }
    return strength;
}