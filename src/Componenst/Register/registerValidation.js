const validation = (values) => {
    let errors = {};
    if (values.name === "") {
        errors.name = "Name is required"
    } else if (values.email === "") {
        errors.email = "Email is required"
    } else if (!values.email.endsWith('@gmail.com')) {
        errors.email = "Email is invalid (should be gmail account)"
    } else if (values.password === "") {
        errors.password = "Password is required"
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters"
    } else if (values.phone === "") {
        errors.phone = "Phone is required"
    } else if (values.phone.length < 10 || !/^\d+$/.test(values.phone) ){
        errors.phone = "Phone must be at least 10 characters and only numbers"
    } else if (values.facebook_account === "") {
        errors.facebook_account = "Facebook account is required"
    } else if (values.university === "") {
        errors.university = "University is required"
    } else if (values.gender === "") {
        errors.gender = "Gender is required"
    } else if (values.birthdate === "") {
        errors.birthdate = "Birthdate is required"
    }

    return errors;

}

export default validation