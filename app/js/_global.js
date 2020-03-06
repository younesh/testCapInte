"use strict";
// Global
app.global = {
    init: function() {
        app.global.mainMenuDesktHover();
        app.global.mainMenuMobilSlide();
        app.global.valideFormContact();
    },
    mainMenuDesktHover: function() {
        /* li parent for subMenu  */
        var subMenu = document.querySelector(".main-menu--desktop li > ul");
        if (!subMenu) {
            return;
        }
        var liHoverCls = "li-hover";
        subMenu.addEventListener("mouseover", function() {
            if (!subMenu.parentNode.classList.contains(liHoverCls)) {
                subMenu.parentNode.classList.add(liHoverCls);
            }
        });

        subMenu.addEventListener("mouseout", function() {
            if (subMenu.parentNode.classList.contains(liHoverCls)) {
                subMenu.parentNode.classList.remove(liHoverCls);
            }
        });

    },
    /* mainMenuMobilSlide() : slide .main-menu--mobile   */
    mainMenuMobilSlide: function() {
        var mMenu = document.querySelector(".main-menu--mobile");
        var btnBurger = document.querySelector(".button--burger");
        if (!mMenu) {
            return;
        }
        if (!btnBurger) {
            return;
        }
        btnBurger.addEventListener("click", function() {
            mMenu.classList.toggle('main-menu--hide');
            btnBurger.classList.toggle('button--burger--close');

        });

    },
    validateEmail: function(mail) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
    },
    valideFormContact: function() {
        btnSubmitContact = document.querySelector(".button--sendcontact");
        if (!btnSubmitContact) {
            return;
        }
        btnSubmitContact.addEventListener("click", function(e) {
            var messageError = "";
            e.preventDefault();

            // clear all error marques
            formRows = document.querySelectorAll(".form__row");
            for (var i = 0; i < formRows.length; i++) {
                formRows[i].classList.remove("form__row--error");
            }
            document.querySelector(".form__message").innerHTML = ""
            document.querySelector(".form__message").classList.remove("form__message--error");
            document.querySelector(".form__message").classList.remove("form__message--success");

            // validation name : 
            var name = document.querySelector("#name");
            if (name.value.trim() == "") {
                name.parentNode.classList.add("form__row--error");
                messageError += "<p> - le champs ( Nom - Prénom ) est requis !</p>";
            }


            // validation email 
            var email = document.querySelector("#email");
            if (email.value.trim() == "") {
                email.parentNode.classList.add("form__row--error");
                messageError += "<p> - le champs ( Email ) est requis !</p>";
            }
            if (!app.global.validateEmail(email.value.trim())) {
                email.parentNode.classList.add("form__row--error");
                messageError += "<p> - le champs ( Email ) n'est pas comforme au format valide des email !</p>";
            }

            // validation Message 
            var message = document.querySelector("#message");
            if (message.value.trim() == "") {
                message.parentNode.classList.add("form__row--error");
                messageError += "<p> - le champs ( Message ) est requis !</p>";
            }

            if (messageError.trim() != "") {
                var preError = "<p><strong>Merci de traiter les erreurs suivantes :</strong></p>"
                document.querySelector(".form__message").classList.add("form__message--error");
                document.querySelector(".form__message").innerHTML = preError + messageError;
            } else {
                var preValidation = "<p><strong> Données du contact sont en cours d'envoie ... </strong></p>"
                document.querySelector(".form__message").classList.add("form__message--success");
                document.querySelector(".form__message").innerHTML = preValidation;
            }
        });
    }


};


// Run the global stuff
app.global.init();