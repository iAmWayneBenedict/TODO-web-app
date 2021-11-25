// const request = require('request');
const form = document.querySelector('form');
const resultContainer = document.querySelector('.result');
const deleteBtns = document.querySelectorAll('.delete');
const doneBtns = document.querySelectorAll('.done');

const serialize = (formElement) => {
    let data = new FormData(formElement);

    let obj = {};
    for (let [key, value] of data) {
        obj[key] = value;
    }
    return obj;
}

const formSubmit = (event) => {
    event.preventDefault();
    let data = serialize(form);

    console.log(data)
    let li = document.createElement('li');
    li.className = "shadow relative py-5 px-4 my-2";

    let p = document.createElement('p');
    p.innerText = data.text;

    let div = document.createElement('div');
    let iDelete = document.createElement('button');
    let iFinish = document.createElement('button');
    div.className = 'absolute top-1/2 right-5 transform -translate-y-1/2';
    iDelete.className = 'delete text-red-400 font-semibold px-1 ml-1';
    iFinish.className = 'done text-green-400 font-semibold px-1 ml-1';
    iDelete.innerText = "Delete";
    iFinish.innerText = "Done";
    iDelete.addEventListener('click', deleteAction);
    iFinish.addEventListener('click', doneAction);
    div.append(iFinish);
    div.append(iDelete);

    li.append(p);
    li.append(div);

    resultContainer.append(li);
    event.target.reset();
}

const deleteAction = (e) => {
    let parent = e.target.parentElement.parentElement;
    parent.remove();
}

const doneAction = (e) => {
    let prev = e.target.parentElement.previousElementSibling;
    prev.innerHTML = prev.innerText.strike().italics();
    e.target.setAttribute('disabled', 'true');
    e.target.classList.add('disabled:opacity-50')
}

form.addEventListener('submit', formSubmit);
