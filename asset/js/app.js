// UI variables
let form = document.querySelector('form');
let newTask = document.querySelector('#new-task-name');
let amount = document.querySelector('#new-taks-amount');
let ul = document.querySelector('.shoping-list');
let todaysBudget = document.querySelector('#todays-budget');
let availableBalance = document.querySelector('#available-balance');

let todayBudget = prompt('How Much Budget Do You Have Today?');
todaysBudget.innerHTML = `Todays Budget: $${todayBudget}`;
availableBalance.innerHTML = `Available Balance: $${todayBudget}`;

(function() {
  // Event Listneer
  ul.addEventListener('click', removeItem);
  form.addEventListener('submit', addNewTask);

  // Calculatate value
  function calculation(op, e) {
    if (op === '+') {
      let itemCost = parseInt(e.target.parentNode.innerText.split('$')[1]);
      let preBal = parseInt(
        availableBalance.innerText.split(' ')[2].split('$')[1]
      );
      return preBal + itemCost;
    } else if (op === '-') {
      let preBal = parseInt(
        availableBalance.innerText.split(' ')[2].split('$')[1]
      );
      let reducedBalance = parseInt(amount.value);
      return preBal - reducedBalance;
    }
  }

  // Remove Items
  function removeItem(e) {
    if (e.target.classList.contains('delete')) {
      let currentBalance = calculation('+', e);
      availableBalance.innerHTML = `Available Balance: $${currentBalance}`;
      e.target.parentElement.parentElement.remove();
    }
  }

  // Add new task
  function addNewTask(e) {
    let itemName = newTask.value;
    let cost = amount.value;
    if (itemName === '' || cost === '') {
      alert('Please fill all the input field!');
    } else {
      let li = document.createElement('li');
      let currentBalance = calculation('-', e);
      li.className = 'shoping-list';
      li.innerHTML = `${itemName}<div class="show-details">
                  $${cost} <i class="fas fa-trash delete"></i>
                  </div>`;
      availableBalance.innerHTML = `Available Balance: $${currentBalance}`;
      ul.appendChild(li);
      newTask.value = '';
      amount.value = '';
    }
    e.preventDefault();
  }
})();
