
const {API_URL} = process.env

export const getAllShifts = async (id: string) => {
  try {

    const res = await fetch(`api/user/${id}/shifts`);

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    const shifts = await res.json()

    // return the user proflie
    return shifts.shifts
  } catch (err) {
    console.log("cant get shifts", err);
  }
};


        