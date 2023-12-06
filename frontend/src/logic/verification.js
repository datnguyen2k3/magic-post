export function isValidPhoneNumber(phoneNumber) {
    const regex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/;
    return regex.test(phoneNumber);
}

export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isValidName(name) {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(name);
}