document.addEventListener('DOMContentLoaded', function () {


    const burger_btns = document.querySelector('.burger_btns');

    const btnMobileMenuOpen = document.querySelector('.open-menu');
    const btnMobileMenuClose = document.querySelector('.close-menu')

    btnMobileMenuOpen.addEventListener('click', function () {
        burger_btns.classList.add('active');
    })

    btnMobileMenuClose.addEventListener('click', function () {
        burger_btns.classList.remove('active');
    })



    class Popup {
        constructor(selectorBtn, selectorPopup) {
            this.btn = document.querySelector(`#${selectorBtn}`)
            this.overlay = document.querySelector(`#${selectorPopup}`)
            this.content = this.overlay.querySelector(`.content`)

            this.btn.addEventListener('click', (e) => {
                this.showPopup(e);
            })

            this.overlay.addEventListener('click', (e) => {
                this.hidePopup(e);
            })

            this.content.addEventListener('click', function (e) {
                e.stopPropagation();
            })
        }

        showPopup() {
            this.overlay.classList.add('active');
        }
        hidePopup() {
            this.overlay.classList.remove('active');
        }

    }

    const requestPopup = new Popup('btn-request', 'request-consultation');
    const consultationPopup = new Popup('btn-consultation', 'get-consultation');


    class formRequest {
        constructor(form) {
            this.form = form;

            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submit();
            })
        }
        submit() {
            let valid = true;
            console.dir(this.form.elements);
            new Array().forEach.call(this.form, (field) => {
                console.log(field);
                if (field.type === 'text') {
                    if (field.value === '') {
                        valid = false;
                    }
                }
            })

            if (valid) {
                fetch('./scripts/server.json')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        this.form.outerHTML = `
                            <p>${data.message}</p>
                        `
                    })

            } else {
                console.log('error');
            }
        }
    }

    new formRequest(document.querySelector('form'))

});


$('.about-us').slick({
    // infinite: true,
    // centerMode: true,
    // centerPadding: '0px',
    // slidesToShow: 3,
    // slidesToScroll: 1
});

// $('.about-our-team').slick({

// });