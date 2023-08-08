const menuBarras = document.querySelector('.fa-bars');
const mostrarMenu = document.querySelector('.main-nav');

console.log(menuBarras);
console.log(mostrarMenu);

menuBarras.addEventListener('click', ()=>{
    mostrarMenu.classList.toggle('spread');
    // alert("hola");
})

window.addEventListener('click', (e)=>{
    if(mostrarMenu.classList.contains('spread') && e.target != mostrarMenu && e.target != menuBarras){

        mostrarMenu.classList.toggle('spread');
    }
})

/*Funcionalidad para el sub menu*/

const menu = document.querySelector('.icon__subMenu');
const mostrarSubMenu = document.querySelector('.sub__nav');

console.log(menu);
console.log(mostrarSubMenu);

menu.addEventListener('click', ()=>{
    mostrarSubMenu.classList.toggle('spread');
})

window.addEventListener('click', (e)=>{
    if(mostrarSubMenu.classList.contains('spread')&& e.target != mostrarSubMenu && e.target != menu){
        mostrarSubMenu.classList.toggle('spread');
    }
})

