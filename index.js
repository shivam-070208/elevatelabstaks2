let popup = document.getElementById('popup')
let addTaskBtn = document.querySelector('.add-task-btn')
let closeBtn = document.querySelector('.close-btn')
let addBtn = document.querySelector('.add')
let grid = document.querySelector('.task-grid')
let filterBtns = document.querySelectorAll('.status-btn')
let list = JSON.parse(localStorage.getItem('itemjson')) || []

// Show popup
addTaskBtn.addEventListener('click', () => popup.classList.add('active'))
closeBtn.addEventListener('click', () => popup.classList.remove('active'))

// Render list
function renderList(filter='All') {
  grid.innerHTML = ''
  list.forEach((task, index) => {
    if (filter === 'All' || task[2] === filter) {
      let card = document.createElement('div')
      card.classList.add('task-card')
      card.innerHTML = `
        <h3 class="title">${task[0]}</h3>
        <p class="desc">${task[1]}</p>
        <span class="status ${task[2].toLowerCase()}">${task[2]}</span>
        <select class="status-select">
          <option ${task[2]==='Pending'?'selected':''}>Pending</option>
          <option ${task[2]==='Completed'?'selected':''}>Completed</option>
        </select>
        <button class="delete-btn"><i class="fa fa-trash"></i></button>
      `
      grid.appendChild(card)

      // Bind select and delete events
      card.querySelector('.status-select').addEventListener('change', (e) => {
        list[index][2] = e.target.value
        saveAndRender(filter)
      })
      card.querySelector('.delete-btn').addEventListener('click', () => {
        list.splice(index, 1)
        saveAndRender(filter)
      })
    }
  })
}

// Save and re-render
function saveAndRender(filter) {
  localStorage.setItem('itemjson', JSON.stringify(list))
  renderList(filter)
}

// Add new task
addBtn.addEventListener('click', () => {
  let name = document.querySelector('.tskname').value.trim()
  let desc = document.querySelector('.description').value.trim()
  if (!name || !desc) {
    alert('Please enter all fields')
    return
  }
  list.push([name, desc, 'Pending'])
  saveAndRender('All')
  document.querySelector('.tskname').value = ''
  document.querySelector('.description').value = ''
  popup.classList.remove('active')
})

// Filter handling
filterBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    renderList(btn.dataset.filter)
  })
})

renderList('All')
