// -------------------- MENU --------------------

const menu = document.querySelector("nav");
const aboutMe = document.querySelector("#aboutMe");
const proyects = document.querySelector("#proyects");
const contact = document.querySelector("#contact");

menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    switch (e.target.hash) {
      case "#aboutMe":
        window.scrollTo(0, aboutMe.offsetTop - 120);
        break;
      case "#proyects":
        window.scrollTo(0, proyects.offsetTop - 120);
        break;
      case "#contact":
        window.scrollTo(0, contact.offsetTop - 120);
        break;
    }
  }
});

window.addEventListener("load", window.scrollTo(0, 1));

window.addEventListener("scroll", () => {
  menu.querySelector(`#menuAboutMe`).classList.contains("active")
    ? menu.querySelector(`#menuAboutMe`).classList.remove("active")
    : null;
  menu.querySelector(`#menuProyects`).classList.contains("active")
    ? menu.querySelector(`#menuProyects`).classList.remove("active")
    : null;
  menu.querySelector(`#menuContact`).classList.contains("active")
    ? menu.querySelector(`#menuContact`).classList.remove("active")
    : null;
  if (window.scrollY < proyects.offsetTop - 120) {
    menu.querySelector(`#menuAboutMe`).classList.add("active");
  } else if (
    proyects.offsetTop - 120 <= window.scrollY &&
    window.scrollY < contact.offsetTop - 120
  ) {
    menu.querySelector(`#menuProyects`).classList.add("active");
  } else if (contact.offsetTop - 120 <= window.scrollY) {
    menu.querySelector(`#menuContact`).classList.add("active");
  }
});

// -------------------- FORMULARIO --------------------

const form = document.querySelector("#contact").querySelector("form");
const formName = form.querySelector("#formName");
const formMail = form.querySelector("#formMail");
const formSubject = form.querySelector("#formSubject");
const formMessage = form.querySelector("#formMessage");
const formBtn = form.querySelector("button");
const formLoader = form.parentElement.querySelector(".loader");
const validarMail = /^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    formName.value !== "" &&
    formSubject.value !== "" &&
    formMessage.value !== "" &&
    formMail.value !== ""
  ) {
    if (validarMail.test(formMail.value)) {
      formLoader.classList.contains("oculto")
        ? formLoader.classList.remove("oculto")
        : null;
      Email.send({
        Host: "c2150155.ferozo.com",
        Username: "info@diegochiapa.com.ar",
        Password: " tzG8H@*4kR",
        To: "info@diegochiapa.com.ar",
        From: `${formMail.value}`,
        Subject: `${formSubject.value}`,
        Body: `${formName.value} dijo: ${formMessage.value}`,
      }).then(() => {
        !formLoader.classList.contains("oculto")
          ? formLoader.classList.add("oculto")
          : null;
        alert("El mensaje se ha enviado correctamente");
        formName.value = "";
        formMail.value = "";
        formSubject.value = "";
        formMessage.value = "";
      });
    } else {
      alert("Debe ingresar un email válido");
    }
  } else {
    alert("Debe completar todos los campos");
  }
});

// -------------------- Libreria SMTP --------------------
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};
