<!DOCTYPE html>
<html>
  <head>
    <title>PORTFOLIO</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;
              0,200;0,700;0,800;0,900;1,300;1,400;1,500&display=swap"
    />
    <link
      rel="signika"
      href="https://fonts.google.com/specimen/Signika+Negative"
    />
    <link rel="Questrial" href="https://fonts.google.com/specimen/Questrial" />
    <script
      src="https://kit.fontawesome.com/a076d05399.js"
      crossorigin="anonymous"
    ></script>
    <style>
      * {
        padding: 0;
        margin: 0;
        text-decoration: none;
        /* list-style: none; */
        box-sizing: border-box;
      }
      body {
        position: relative;
        background-color: whitesmoke;
      }

      body details {
        color: black;
        font-family: "questrial", sans-serif;
        text-decoration: none;
        font-size: 20px;
        font-weight: bolder;
      }
      details details {
        color: olive;
        font-size: 15px;
        font-weight: 700;
        margin-left: 20px;
        font-family: "Signika", sans-serif;
      }

      p {
        font-family: sans-serif;
        color: midnightblue;
        font-weight: 100;
        margin-bottom: 20px;
      }
      header {
        position: fixed;
        top: 0;
        width: 100%;
        font-family: signika;
      }
      li {
        list-style: none;
      }
      a {
        color: black;
        text-decoration: none;
      }
      container {
        width: 900px;
        margin: auto;
      }
      .main {
        margin-top: 80px;
      }
      .navbar {
        width: 95%;
        margin: auto;
        min-height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      ul li {
        padding: 13px;
        float: right;
      }
      .nav-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .nav-branding {
        font-size: 2rem;
        padding: 7px 13px;
        border-radius: 3px;
      }
      a.active,
      a:hover {
        background: blueviolet;
        transition: 0.5s;
      }
      .checkbtn {
        font-size: 30px;
        color: black;
        float: left;
        line-height: 80px;
        margin-right: 40px;
        cursor: pointer;
        display: block;
      }
      #check {
        display: none;
      }
      @media (max-width: 952px) {
        label.logo {
          font-size: 30px;
          padding-left: 50px;
        }
        nav ul li a {
          font-size: 16px;
        }
      }
      @media (max-width: 858px) {
        .checkbtn {
          display: block;
        }
        ul {
          position: fixed;
          width: 100%;
          height: 100vh;
          background: #2c3e50;
          top: 80px;
          left: 100%;
          text-align: center;
          transition: all 0.5s;
        }
        navbar ul li {
          display: block;
        }
        navbar ul li a {
          font-size: 20px;
          margin: 50px 0;
          line-height: 30px;
        }
        a:hover,
        a.active {
          background: none;
          color: #0082e6;
        }
        #chek:checked ~ ul {
          left: 0;
        }
      }
      img {
        width: 50px;
        height: 50px;
        overflow: scroll;
        border-radius: 50%;
      }
      video {
        width: 100%;
      }
      @media (max-width: 600px) {
        .container {
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <nav class="navbar">
          <input type="checkbox" id="check" />
          <label for="check" class="checkbtn">
            <i class="fas fa-bars"></i>
          </label>
          <label class="logo">POTFOLiO</label>
          <ul class="nav-menu">
            <li><a class="active" href="#">HOME</a></li>
            <li><a href="#">ABOUT</a></li>
            <li><a href="#">CONTACT</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div class="main">
      <video autoplay loop muted>
        <source src="http://206.189.207.206/muli/nature.mp4" type="video/mp4" />
      </video>
      <details open id="diploma">
        <summary>Diploma: Improving My Credentials</summary>
        <details>
          <summary>Nibs technical college</summary>
          <p>conveniently fits my preferences</p>
          <details>
            <summary>Fee structure and Details about the school</summary>
          </details>
        </details>
        <details>
          <summary>Rise money for fees</summary>
          <p>set up a savings plan for a year</p>
        </details>
        <details>
          <summary>Set up an investment portfolio</summary>
          <p>
            Learn about different types of accounts and figure out which one is
            the most suitable for saving
          </p>
          <details>
            <summary>Types of accounts</summary>
            <details>
              <summary>Money market fund</summary>
            </details>
            <details>
              <summary>Sacco</summary>
            </details>
          </details>
        </details>
        <details>
          <summary>Time Management strategy</summary>
          <p>
            Nibs college offers evening classes which is very convenient for the
            tasks at hand
          </p>
          <details>
            <summary>Create a personalized to-do list</summary>
          </details>
        </details>
      </details>
      <hr />
      <details open id="rentize">
        <summary>Rentize : Prompt Production of Invoices</summary>
        <details open>
          <summary>Monthly Update of Mutallrental</summary>
          <details>
            <summary>Check Water Readings</summary>
          </details>
          <details>
            <summary>Upload Electricity Bills</summary>
          </details>
          <details>
            <summary>Input Payments</summary>
          </details>
          <details>
            <summary>Issuance of Credit+Debit Notes</summary>
          </details>
        </details>
        <details>
          <summary>Production of Monthly Invoices</summary>
        </details>
        <details>
          <summary>Logging of Necessary Changes to the Software</summary>
        </details>
        <details>
          <summary>Migrate Mutallrental from CO to DO</summary>
        </details>
      </details>
      <hr />

      <details open id="mshauri">
        <summary>
          <a href="http://206.189.207.206/tracker/minutes/">
            Youth Hub : Epowering The Youth
          </a>
        </summary>

        <details>
          <summary>Build a blog</summary>
          <p>
            this will help adress pressing issues on a daily basis and also help
            connect counsellors to clients
          </p>
        </details>
        <details>
          <summary>Animation</summary>
          <p>
            This will help me create short entertainig and educative short clips
            that can be whats app status
          </p>
        </details>
        <details>
          <summary>Adds</summary>
          <p>
            This will be very helpful in advertisement of services and also
            educative quotes
          </p>
        </details>
        <details>
          <summary>Lets talk Mutall unfiltered Fridays</summary>
        </details>
      </details>
      <hr />
      <details open id="cybercafe">
        <summary>
          Cyber Cafe : Bringing IT Services Closer to Mutall Clients
        </summary>
        <details>
          <summary>Printing of invoices on request</summary>
        </details>
        <details>
          <summary>Huduma services</summary>
          <p>N.H.I.F, K.R.A and other government services offered online</p>
        </details>
        <details>
          <summary>Help clients fix Hardware</summary>
        </details>
        <details>
          <summary>Selling Computer Equipment</summary>
          <p>
            Oritech is a potential customer since they have to order internet
            installation gadgets from Nairobi which is time consuming
          </p>
        </details>
      </details>
      <hr />
      <details open id="oritech">
        <summary>Oritech: Gaining Field Experience for Wi-Fi Clients</summary>
        <details>
          <summary>Client mapping system</summary>
        </details>
        <details>
          <summary>C.R.M</summary>
        </details>
      </details>
      <hr />
      <details open id="mulihub">
        <summary>MuliHub: Becoming a Better Programmer</summary>
        <details>
          <summary>Add a Menu to this Portfolio</summary>
        </details>
        <details>
          <summary>Add a Video that Describes this Portfolio</summary>
        </details>
        <details>
          <summary>Add Selector Buttons to the Details</summary>
        </details>
        <details>
          <summary>Add a Click Eventlistener to Each Summary</summary>
        </details>
        <details>
          <summary>Style this Portfolio to look Professional</summary>
        </details>
        <details>
          <summary>
            Separate the Content of this Portfolio from its View
          </summary>
        </details>
      </details>
      <hr />
    </div>
  </body>
</html>
