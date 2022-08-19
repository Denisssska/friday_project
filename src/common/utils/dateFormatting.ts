export const updatedDate = (data: string) => {

    const date = new Date(data);

    const day = date.getDate() > 0 && date.getDate() < 10
        ? 0 + '' + date.getDate()
        : date.getDate();

    const month = date.getMonth() > 0 && date.getMonth() < 10
        ? 0 + '' + (date.getMonth() + 1)
        : date.getMonth() + 1;

    return day + ' ' + month + ' ' + date.getFullYear();

}