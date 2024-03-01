
const {API_URL} = process.env

export const getUser = async (id: string | undefined) => {

  try {
    
    const res = await fetch(`${API_URL}/api/user/${id}`)

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    const user = await res.json()
    // return the user proflie
    return user.data
  } catch (err) {
    console.log("cant get users", err);
  }
};


        