import { Navbar } from "../../components";
import "./login.css";

const Login = () => {
    return (<>
    <Navbar></Navbar>
        <main className="container main">
            <article className="grid">
                <div>
                    <hgroup>
                        <h1>Sign in</h1>
                        <h2>A minimalist layout for Login pages</h2>
                    </hgroup>
                    <form>
                        <input type="text" name="login" placeholder="Login" aria-label="Login" autoComplete="nickname" required />
                        <input type="password" name="password" placeholder="Password" aria-label="Password" autoComplete="current-password" required />
                        <fieldset>
                            <label htmlFor="remember">
                                <input type="checkbox" role="switch" id="remember" name="remember" />
                                Remember me
                            </label>
                        </fieldset>
                        <button type="submit" className="contrast" >Login</button>
                    </form>
                </div>
                <div></div>
            </article>
        </main>
    </>)
}

export default Login;