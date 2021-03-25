
//let div = document.getElementById('comments');
//div.appendChild(document.createElement('p'));
//div.children[1].innerText = 'hello';

let d = dayjs().format('YYYY-MM-DD HH:mm:ss');
let el = document.getElementById('ora');
el.innerText = d;
setInterval(() => { el.innerText = dayjs().format('YYYY-MM-DD HH:mm:ss') }, 1000)


window.addEventListener('load', event => {

    let rows = document.querySelectorAll('tbody tr');

    for (let row of rows) {
        row.addEventListener('click', event => {
            //console.log(event.target);
            let score = row.children[1].innerText;
            console.log(score);

            let comments = document.getElementById('comments');
            comments.insertAdjacentHTML('beforeend', `<p>The score is ${score}</p>`);
        }
        )
    }

    const inputField = document.querySelector('input[type="text"]')
    inputField.addEventListener('input', event => {
        console.log(`The current entered value is: ${inputField.value}`);
    })
    inputField.addEventListener('change', event => {
        console.log(`The value has changed since last time: ${inputField.value}`);
    })

    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        console.log('Submit button pressed');
        event.preventDefault();
    })
}
)

