const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.getElementById('body').style.color = '#ffffff';


async function loadNavbar() {

    const response = await fetch("../navbar.html");
    const navbarHtml = await response.text();
    document.getElementById("navbar").innerHTML = navbarHtml;

}

loadNavbar();