const enWord = document.querySelector('#en'),
    ruWord = document.querySelector('#ru'),
    inputs = document.querySelectorAll('.input'),
    addBtn = document.querySelector('#add-word-btn'),
    table = document.querySelector('#table');

let words,
    btnDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
    table.innerHTML += `
        <tr class="tr">
            <td class="en-word">${words[index].english}</td>
            <td class="enr-word">${words[index].russian}</td>
            <td>
                <button class="btn-delete">X</button>
            </td>
        </tr>
    `
}

words.forEach((element, i) => {
    addWordToTable(i);
})

function CreateWord (english, russian) {
    this.english = english;
    this.russian = russian;
}

addBtn.addEventListener('click', () => {
    if(enWord.value.length < 1 || ruWord.value.length < 1 || !isNaN(enWord.value) || !isNaN(ruWord.value)) {
        for(let key of inputs) {
            key.classList.add('error');
        }
        console.error('Это число или нехватает символов! Прошу обратить Ваше внимание, данная программа создана как web словарь. Будьте внимательны при вводе.')
    } else {
        for(let key of inputs) {
            key.classList.remove('error');
        }
        words.push(new CreateWord(enWord.value, ruWord.value));
        localStorage.setItem('words', JSON.stringify(words));
        addWordToTable(words.length - 1);
        enWord.value = null;
        ruWord.value = null;
        addEventDelete();
    } 
});

const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex;
    e.target.parentNode.parentNode.parentNode.remove();
    words.splice(rowIndex, 1);
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
}

const addEventDelete = () => {
    if(words.length > 0) {
        btnDelete = document.querySelectorAll('.btn-delete');
        for(let btn of btnDelete) {
            btn.addEventListener('click', e => {
                deleteWord(e);
            })
        }
    }
}

addEventDelete();
