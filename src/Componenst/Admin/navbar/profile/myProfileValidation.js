const myProfileValidation = (changePassword)=>
{
    const passwordError = {};

    if(!changePassword.password)
    {
         passwordError.password = "Password is required";
    }
    else if (changePassword.password.length < 6)
    {
         passwordError.password = "Password must be at least 6 characters";
    }
    else if(!changePassword.newPassword)
    {
         passwordError.newPassword = "New Password is required";
    }
    else if (changePassword.newPassword.length < 6)
    {
         passwordError.newPassword = "New Password must be at least 6 characters";
    }
    else if(!changePassword.confirmPassword)
    {
         passwordError.confirmPassword = "Confirm Password is required";
    }
   else if(changePassword.confirmPassword !== changePassword.newPassword)
    {
         passwordError.confirmPassword = "Password not match";
    }
    return  passwordError

}
export default myProfileValidation;