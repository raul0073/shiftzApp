export const niceDate = (date: Date) => {
    let d = new Date(date)
    // get day, month by name
    let dd = d.toDateString().slice(0, 10).replace(" ", ", ")
    return dd
};
