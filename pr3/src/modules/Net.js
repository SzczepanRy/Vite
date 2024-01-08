
const nav = document.querySelector("nav")


export const Net = {
    async loginUser(userName) {
        try {
            let res = await fetch("/addUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName })
            })



            let data = await res.json()
            if (data.succes) {
                nav.innerHTML = data.message
                // GameObject.setPlayer(...)
            } else {
                nav.innerHTML = data.message
            }
        } catch (err) {
            throw err
        }


    },
    async resetUsers() {

        try {
            let res = await fetch("/resetUsers", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            let data = await res.json()
            if (data.succes) {
                nav.innerHTML = data.message

            } else {
                nav.innerHTML = data.message
            }
        } catch (err) {
            throw err
        }



    }

}