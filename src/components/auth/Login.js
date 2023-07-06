import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("danielmyers@onlyReadsPictureBooks.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("moneyHoneys_user", JSON.stringify({
                        id: user.id,
                        staff: user.staff,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                        <h1 className="title"><span className="span-3">Money</span> <span className="span-4">Honey</span></h1>
                        <h2 className="subtitle">
                            Connecting With a Financial Advisor Has Never Been So Sweet
                        </h2>
                        <h2>Please Sign In</h2>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <button type="submit">
                                Sign in
                            </button>
                        </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

