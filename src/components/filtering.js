export function initFiltering(elements) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes) // Получаем ключи из объекта
      .forEach((elementName) => {
        // Перебираем по именам
        elements[elementName].append(
          // в каждый элемент добавляем опции
          ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
            .map((name) => {
              // используйте name как значение и текстовое содержимое
              const option = document.createElement("option");
              option.value = name;
              option.textContent = name;
              return option;
            }),
        );
      });
  };
  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const filterWrappers = document.querySelectorAll(".filter-wrapper");

      filterWrappers.forEach((filterWrapper) => {
        const input = filterWrapper.querySelector("input");
        const button = filterWrapper.querySelector("button");

        button.addEventListener("click", function () {
          input.value = "";
          const field = button.getAttribute("data-field");
          state[field].value = "";
        });
      });
    }
    // @todo: #4.5 — отфильтровать данные, используя компаратор
    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          // ищем поля ввода в фильтре с непустыми данными
          filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query; // если в фильтре что-то добавилось, применим к запросу
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
