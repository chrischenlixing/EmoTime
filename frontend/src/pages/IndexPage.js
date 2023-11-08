// import React, { useEffect } from "react";
// import UseCheckMsg from "../hooks/UseCheckMsg";

// function IndexPage() {

//     const loginURL = '/api/login/';

//     const handleSubmit = (e) => {
//         let name = document.getElementById("username").value;
//         console.log(name);
//         let password = document.getElementById("password").value;
//         console.log(password);
//         if (!name || name === "") {
//             alert("username mustn't be empty.");
//             e.preventDefault();
//             return false;
//         }
//         if (!password || password === "") {
//             alert("password mustn't be empty.");
//             e.preventDefault();
//             return false;
//         }

//         return true;
//     };

//     UseCheckMsg();

//     useEffect(() => {
//         document.getElementById("login-form").action = loginURL;
//     }, [loginURL]);

//     return (
//         <div id="login">
//             <header>
//                 <h1 className="text-center aoe-text pt-5">Login</h1>
//             </header>
//             <main>
//                 <div className="container">
//                     <div
//                         id="login-row"
//                         className="row justify-content-center align-items-center"
//                     >
//                         <div id="login-column" className="col-md-6">
//                             <div id="login-box" className="col-md-12">
//                                 <form
//                                     id="login-form"
//                                     className="form"
//                                     action="/"
//                                     method="post"
//                                     onSubmit={handleSubmit}
//                                 >
//                                     <div className="form-group">
//                                         <label htmlFor="username" className="aoe-text">
//                                             Username:
//                                         </label>
//                                         <br />
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             id="username"
//                                             className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="password" className="aoe-text">
//                                             Password:
//                                         </label>
//                                         <br />
//                                         <input
//                                             type="password"
//                                             name="password"
//                                             id="password"
//                                             className="form-control"
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <input
//                                             type="submit"
//                                             className="btn btn-info btn-md aoe-btn-submit"
//                                             defaultValue="submit"
//                                         />
//                                     </div>
//                                     <div id="register-link" className="text-right">
//                                         <a href="/register" className="aoe-text">
//                                             Register here
//                                         </a>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// IndexPage.propTypes = {};

// export default IndexPage;



import React, { useEffect } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";

function IndexPage() {
  const loginURL = '/api/login/';

  const handleSubmit = (e) => {
    let name = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (!name || name === "") {
      alert("Username mustn't be empty.");
      e.preventDefault();
      return false;
    }
    if (!password || password === "") {
      alert("Password mustn't be empty.");
      e.preventDefault();
      return false;
    }

    return true;
  };

  UseCheckMsg();

  useEffect(() => {
    document.getElementById("login-form").action = loginURL;
  }, [loginURL]);

  return (
    <div className="gradient-custom-3" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <nav>
        {/* <a href="/" id="LogoutAction">
          Back
        </a> */}
      </nav>
      <header>
        <h1 className="text-uppercase text-center mb-5 aoe-text">Login</h1>
      </header>
      <main>
        <div className="container">
          <div id="login-row" className="row justify-content-center align-items-center">
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form
                  id="login-form"
                  className="form px-5"
                  action="/"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group mb-4">
                    <label htmlFor="username" className="aoe-text">
                      Username:
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="aoe-text">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-info btn-lg aoe-btn-submit"
                      value="Submit"
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    <a href="/register" className="aoe-text">
                      Register here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

IndexPage.propTypes = {};

export default IndexPage;
