let main=document.createElement('main')
main.className='container'
document.body.append(main)

 let title=document.createElement('h1')
 title.className='title'
 title.innerHTML='Список пользователей'
 main.append(title)

 let seach=document.createElement('div')
 seach.className='seach'
 main.append(seach)

 let filter=document.createElement('input')
 filter.type='text'
 filter.className='input'
 seach.append(filter)

 let seachButton=document.createElement('button')
 seachButton.className='button'
 seachButton.innerHTML='Поиск'
 seach.append(seachButton)

 const errorMessage = document.createElement('p');
 main.append(errorMessage)

 let cards=document.createElement('ul')
 cards.className='cards'
 main.append(cards)
 
 let buttons=document.createElement('div')
 buttons.className='buttons'
 main.append(buttons)

 let update=document.createElement('button')
 update.className='button'
 update.innerHTML='Обновить'
 buttons.append(update)

 let sort=document.createElement('button')
 sort.className='button'
 sort.innerHTML='A-Z'
 buttons.append(sort)





function updateUserList() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            updateUser(data);

        })
        .catch(error => {
            console.error('Ошибка при получении данных пользователя:', error);
            errorMessage.textContent = 'Произошла ошибка при загрузке данных с сервера';
            update.style.display='none'
            sort.style,display='none'
        });
}

function updateUser(data) {
        cards.innerHTML=' '

        data.forEach(user => {
        const card = document.createElement('li');
        card.className='card'
        
        let nameUser=document.createElement('h3')
        nameUser.textContent = user.name;
      
        let connection=document.createElement('div')
        connection.className='connection'
       
        let email=document.createElement('p')
        email.textContent = user.email;
    
        let phone=document.createElement('p')
        phone.textContent=user.phone
    
        card.append(nameUser);
        connection.append(email);
        connection.append(phone);
        card.append(connection)
        cards.append(card)
    
    });
}

updateUserList();

function sortUserList() {
    const cardsUser = Array.from(cards.children);
    const sortedCards = cardsUser.sort((a, b) => {
        return a.textContent.localeCompare(b.textContent);
    });
    cards.innerHTML = ''; // Очищаем контейнер
    sortedCards.forEach(card => {
        cards.appendChild(card);
    });
}

function filterUserList() {
    const nameUser = Array.from(cards.children);
    const filterText = filter.value.trim().toLocaleLowerCase();
    nameUser.forEach(card => {
        const name = card.textContent.toLowerCase();
        if (name.includes(filterText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
filterUserList()
update.addEventListener('click',()=>{
    updateUserList();
})
sort.addEventListener('click',()=>{
    sortUserList()
})
seachButton.addEventListener('click',()=>{
    filterUserList()
})
filter.addEventListener('input', function() {
    filterUserList()

    
});