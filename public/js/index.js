
const a = document.querySelectorAll('.delete');
const b = document.querySelectorAll('.done');
const c = document.querySelectorAll('.done-text');

const serialize = formElement => {
    let data = new FormData(formElement);

    let obj = {};
    for (let [key, value] of data) {
        obj[key] = value;
    }
    return obj;
}

const formSubmit = data => {
    // event.preventDefault();
    // if (data.text === '') return;
    //
    // let li = document.createElement('li');
    // li.className = "shadow relative py-5 px-4 my-2";
    //
    // let p = document.createElement('p');
    // p.innerText = data.text;
    //
    // let div = initializeElements();
    // li.append(p);
    // li.append(div);
    //
    // resultContainer.append(li);
}

const initializeElements = _ => {
    let div = document.createElement('div');
    let iDelete = document.createElement('a');
    let iFinish = document.createElement('a');
    div.className = 'absolute top-1/2 right-5 transform -translate-y-1/2';
    iDelete.className = 'delete text-red-400 font-semibold px-1 ml-1';
    iFinish.className = 'done text-green-400 font-semibold px-1 ml-1';
    iDelete.innerText = "Delete";
    iFinish.innerText = "Done";
    iDelete.addEventListener('click', deleteAction);
    iFinish.addEventListener('click', doneAction);
    div.append(iFinish);
    div.append(iDelete);

    return div;
}

const deleteAction = e => {
    let parent = e.target.parentElement.parentElement;
    const endpoint  = `/todo/${e.target.dataset.doc}`;

    fetch(endpoint, {
        method: 'DELETE'
    })
        .then( response => {
            response.json().then( data => {
                location.href = data.redirect
            })
        })
        .catch( err => console.log(err))
    // parent.remove();
}

const doneAction = e => {
    const endpoint  = `/todo/${e.target.dataset.doc}`;
    console.log(endpoint)
    fetch(endpoint, {
        method: 'PUT',
    })
        .then( response => {
            response.json().then( data => {
                location.href = data.redirect
            })
            console.log(response)
        })
        .catch( err => console.log(err))
}

const onDocumentLoad = e => {
    e.innerHTML = e.innerText.strike().italics();
    e.setAttribute('disabled', 'true');
    e.classList.add('disabled:opacity-50')
}

// form.addEventListener('submit', formSubmit);
a.forEach(element => {
    element.addEventListener('click', deleteAction);
})
b.forEach(element => {
    element.addEventListener('click', doneAction);
})

window.onload = _ => {
    c.forEach(element => {
        onDocumentLoad(element)
    })
}