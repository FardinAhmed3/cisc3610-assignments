const user = "fardin.ahmed00";
const domain = "bcmail.cuny.edu";
const email = `${user}@${domain}`;
const link = document.getElementById("emailLink");
link.setAttribute("href", `mailto:${email}`);