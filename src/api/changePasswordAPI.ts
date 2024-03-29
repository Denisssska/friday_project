import {instance} from "./axiosInstance";


export const changePassword = {
    forgotPass(email: string) {
        return instance.post('auth/forgot', {
            email,
            message: `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                        <a href='https://Denisssska.github.io/friday_project/#/create-password/$token$'>link</a>
                      </div>`
        });
    },
    createPass(password: string, token: string) {
        return instance.post('auth/set-new-password',
            {password, resetPasswordToken: token});
    }
};