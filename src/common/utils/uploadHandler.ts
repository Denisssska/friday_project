import {ChangeEvent, useCallback} from "react";
// import {convertFileToBase64} from "./convertToBase64";
//
// export const uploadHandler = (e: ChangeEvent<HTMLInputElement>,setAva:(ava:string)=>void) => {
//     if (e.target.files && e.target.files.length) {
//         console.log(e.target.files)
//         const file = e.target.files[0]
//         if (file.size < 4000000) {
//             convertFileToBase64(file, (file64: string) => {
//                 setAva(file64)
//                 // dispatch(updateMeTC({avatar: file64}));
//
//             })
//         } else {
//             console.error('Error: ', 'Файл слишком большого размера')
//         }
//     }
// }