const inputDownPayment = document.getElementById('balance')
const inputIncome = document.getElementById('income')
const buttonBalance = document.getElementById('buttonBalance')
const successMessage3 = document.getElementById("successMessage3");
const errorMessage3 = document.getElementById("erorrMessage3")
const successMessage2 = document.getElementById("successMessage2");
const errorMessage2 = document.getElementById("erorrMessage2")
const successMessage1 = document.getElementById("successMessage1");
const errorMessage1 = document.getElementById("erorrMessage1")
const span1 = document.getElementById("span1")
const span2 = document.getElementById("span2")
const span3 = document.getElementById("span3")
const addCategory = document.getElementById("addCategory")
const select = document.getElementById("select")
const inputCategory = document.getElementById("category")
const descriptionConsumption = document.getElementById("description")
const amount = document.getElementById("amount")
const buttonTable = document.getElementById("buttonTable")

const options = {
    moduleCache: {
      vue: Vue
    },
    async getFile(url) {
      
      const res = await fetch(url);
      if ( !res.ok )
        throw Object.assign(new Error(res.statusText + ' ' + url), { res });
      return {
        getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
      }
    },
    addStyle(textContent) {

      const style = Object.assign(document.createElement('style'), { textContent });
      const ref = document.head.getElementsByTagName('style')[0] || null;
      document.head.insertBefore(style, ref);
    },
  }

  const { loadModule } = window['vue3-sfc-loader'];

  const app = Vue.createApp({ // Завдання 2
    components: {
      'my-component': Vue.defineAsyncComponent( () => loadModule('./myComponent.vue', options) ),
      'my-component2': Vue.defineAsyncComponent( () => loadModule('./myComponent2.vue', options) )
    },
    template: '<my-component><my-component2></my-component2></my-component>' 
  });
  const app2 = Vue.createApp({ //Завдання 9
    components:{
        'my-component3': Vue.defineAsyncComponent( () => loadModule('./myComponent3.vue', options) )
    },
    template: '<my-component3></my-component3>' 
  })

  app.mount('#app');
  app2.mount('#app2');






const balance = {
}
const categories = []
let isNumber = false
let sumIncome = 0
buttonBalance.addEventListener('click', () => {
    if (isNumber == false) {
        if (inputDownPayment.value !== '') {
            if (inputDownPayment.value < 0) {
                getErrorMessage3()
            } else {
                balance.downPayment = inputDownPayment.value
                isNumber = true
                inputDownPayment.disabled = true
                balance.generalBalance = parseFloat(balance.downPayment)
            }
        }
        else {
            getErrorMessage3()
        }
    }
    if (inputIncome.value == '' || inputIncome.value < 0) {
        getErrorMessage3()
    } else {
        balance.income = inputIncome.value
        sumIncome = parseFloat(balance.income) + sumIncome
        if (isNumber == true) {
            balance.generalBalance = parseFloat(balance.income) + parseFloat(balance.generalBalance)
            span1.textContent = sumIncome
            span3.textContent = balance.generalBalance
            inputIncome.value = ''
            getSuccessMessage3()
        }
    }
})

addCategory.addEventListener('click', () => {
    let option = document.createElement("option");
    let optionExists = Array.from(select.options).some(function (option) {
        return option.text === inputCategory.value;
    });
    if (inputCategory.value == '') {
        getErrorMessage2()
    } else if (optionExists) {
        getErrorMessage2()
    } else if (inputCategory.value.length > 20 || inputCategory.value.length < 4) {
        getErrorMessage2()
    } else {
        option.text = inputCategory.value
        select.appendChild(option);
        inputCategory.value = ''
        getSuccessMessage2()
    }

})
const tableContainer = document.getElementById("tableContainer");
const table = document.createElement("table");
table.className = "table mt-3";
const thead = document.createElement("thead");
const headerRow = document.createElement("tr");
headerRow.innerHTML = "<th>Категорія</th><th>Опис</th><th>Сума</th>";
thead.appendChild(headerRow);
table.appendChild(thead);
const tbody = document.createElement("tbody");
table.appendChild(tbody);
tableContainer.appendChild(table);
const row = document.createElement("tr");
let counter = 0
buttonTable.addEventListener('click', () => {
    const category = select.value;
    const description = descriptionConsumption.value;
    const value = parseFloat(amount.value);
    if (category && description && !isNaN(value)) {
        if (balance.generalBalance == null) {
            getErrorMessage1()
        }else{
            const existingCategoryIndex = categories.findIndex(item => item.category === category);

            if (existingCategoryIndex !== -1) {
                categories[existingCategoryIndex].value += value;
                categories[existingCategoryIndex].description += "," + description;
                const rowToUpdate = document.querySelector(`#category-${existingCategoryIndex}`);

                rowToUpdate.querySelector('.category-cell').textContent = categories[existingCategoryIndex].category;
                rowToUpdate.querySelector('.description-cell').textContent = categories[existingCategoryIndex].description;
                rowToUpdate.querySelector('.value-cell').textContent = categories[existingCategoryIndex].value;
                let sum = categories.reduce(function (accumulator, currentObject) {
                    return accumulator + currentObject['value'];
                }, 0);
                span2.textContent = sum
                span3.textContent = balance.generalBalance - amount.value
                balance.generalBalance = balance.generalBalance - amount.value
                data.labels[existingCategoryIndex] = categories[existingCategoryIndex].category
                data.datasets[0].data[existingCategoryIndex] = categories[existingCategoryIndex].value
                myChart.update()
            } else {
                const newCategory = {
                    category: category,
                    description: description,
                    value: value
                };
                categories.push(newCategory);
                const newRow = document.createElement('tr');
                newRow.id = `category-${categories.length - 1}`;
                newRow.innerHTML = `<td class="category-cell">${category}</td><td class="description-cell">${description}</td><td class="value-cell">${value}</td>`;
                tbody.appendChild(newRow);
                span2.textContent = categories[counter].value + parseFloat(span2.textContent)
                span3.textContent = balance.generalBalance - categories[counter].value
                balance.generalBalance = balance.generalBalance - categories[counter].value
                data.labels[counter] = categories[counter].category
                data.datasets[0].data[counter] = categories[counter].value
                myChart.update()
                counter++
            }

            // Очищаем поля ввода
            descriptionConsumption.value = '';
            amount.value = '';
            getSuccessMessage1()
        }

    } else {
        getErrorMessage1()
    }

})
function getErrorMessage1() {
    errorMessage1.classList.remove("d-none")
    setTimeout(() => {
        errorMessage1.classList.add("d-none");
    }, 2000);
}
function getSuccessMessage1() {
    successMessage1.classList.remove("d-none");
    setTimeout(() => {
        successMessage1.classList.add("d-none");
    }, 2000);
}
function getErrorMessage2() {
    errorMessage2.classList.remove("d-none")
    setTimeout(() => {
        errorMessage2.classList.add("d-none");
    }, 2000);
}
function getSuccessMessage2() {
    successMessage2.classList.remove("d-none");
    setTimeout(() => {
        successMessage2.classList.add("d-none");
    }, 2000);
}
function getErrorMessage3() {
    errorMessage3.classList.remove("d-none")
    setTimeout(() => {
        errorMessage3.classList.add("d-none");
    }, 2000);
}
function getSuccessMessage3() {
    successMessage3.classList.remove("d-none");
    setTimeout(() => {
        successMessage3.classList.add("d-none");
    }, 2000);
}
let ctx = document.getElementById('myChart').getContext('2d');
let data = {
    labels: [],
    datasets: [{
        label: 'Витрати по категоріям',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};


let myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {

            }
        }
    }
});

