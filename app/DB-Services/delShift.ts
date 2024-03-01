'use server'
const {API_URL} = process.env

export const deleteShiftById = async (userId: string, shiftId: string) => {

  try {
    const res = await fetch(`${API_URL}/api/user/${userId}/shifts/${shiftId}`, {
        method: "DELETE",
        headers : {
            "Content-Type" : "application/json",
        },
    })

    if (!res.ok) {
      throw new Error("failed to delete");
    }
    return res
  } catch (err) {
    console.log("cant delete shift", err);
  }
};


        