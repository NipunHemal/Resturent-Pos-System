import AuthController from "../controller/AuthController.js";

export class Login {
  constructor() {
    this.loginSection = null;
  }

  // 🧱 Main render method
  render() {
    return `
      <div id="login-section" class="container-fluid login-container d-flex align-items-center justify-content-center">
        <div class="row w-100">
          <div class="col-md-10 col-lg-8 mx-auto login-card shadow-lg">
            <div class="row">
              <div class="col-lg-6 p-0 d-none d-lg-flex align-items-center justify-content-center">
                <img src="../assets/images/login/image.png" alt="Illustration of a woman logging in" class="img-fluid">
              </div>

              <div id="auth-form" class="col-lg-6 form-side p-5">
                ${this.loadLoginSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 📩 Login section HTML
  loadLoginSection() {
    return `
      <div>
        <h1 class="welcome-text mb-4">Welcome Back!</h1>

        <form id="login-form" novalidate>
          <div class="input-group mb-3">
            <input type="email" name="email" class="form-control" placeholder="Email Address" required/>
            <div class="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>

          <div class="input-group mb-3">
            <input type="password" name="password" class="form-control" placeholder="Password" required/>
            <div class="invalid-feedback">
              Please enter a valid password.
            </div>
          </div>

          <div class="text-end mb-4">
            <a href="#" class="forgot-password-link">Forget Password?</a>
          </div>

          <div class="d-grid gap-2 mb-4">
            <button id="login-btn" type="submit" class="btn btn-primary login-btn">Login</button>
          </div>
        </form>

        <div id="login-alert-section"></div>

        <p class="text-center separator-text my-3">Or</p>

        <div class="row g-3">
          <div class="col-6">
            <button class="btn btn-light social-btn google-btn w-100">
              <i class="fab fa-google"></i> Google
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-light social-btn facebook-btn w-100">
              <i class="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 🔐 Forget password section (if needed later)
  forgetPasswordSendMailRequest() {
    return `
      <div>
        <h1 class="welcome-text mb-4 fs-2">Forget Password!</h1>

        <form>
          <div class="input-group mb-3 custom-input-group">
            <span class="input-group-text"><i class="fa fa-envelope"></i></span>
            <input type="email" class="form-control" placeholder="Email Address" />
          </div>

          <div class="d-grid gap-2 mb-4">
            <button type="submit" class="btn btn-primary btn-sm login-btn">Continue</button>
          </div>
        </form>

        <p class="text-center separator-text my-3">Or</p>

        <div class="row g-3">
          <div class="col-6">
            <button class="btn btn-light social-btn google-btn w-100">
              <i class="fab fa-google"></i> Google
            </button>
          </div>
          <div class="col-6">
            <button class="btn btn-light social-btn facebook-btn w-100">
              <i class="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ⚙️ Initialize event handlers
  init() {
    new AuthController().init();
  }
}
