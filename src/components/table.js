import { cloneTemplate } from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
  const { tableTemplate, rowTemplate, before, after } = settings;
  const root = cloneTemplate(tableTemplate);

  // #1.2 —  вывести дополнительные шаблоны до и после таблицы

  before.reverse().forEach((subName) => {
    root[subName] = cloneTemplate(subName);
    root.container.prepend(root[subName].container);
  });
  after.forEach((subName) => {
    root[subName] = cloneTemplate(subName);
    root.container.append(root[subName].container);
  });

  // #1.3 —  обработать события и вызвать onAction()
  let timer;

  root.container.addEventListener("change", (e) => {
    if (e.target.type === "text") return;
    clearTimeout(timer);
    onAction();
  });

  // поиск при вводе, с небольшой задержкой
  root.container.addEventListener("input", (e) => {
    if (e.target.type === "text") {
      clearTimeout(timer);
      timer = setTimeout(() => onAction(), 300);
    }
  });

  root.container.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.type === "text") {
      e.preventDefault();
      clearTimeout(timer);
      onAction();
    }
  });

  root.container.addEventListener("reset", () => {
  clearTimeout(timer);
  root.container
    .querySelectorAll('button[name="sort"]')
    .forEach((button) => {
      button.dataset.value = "none";
    });

  setTimeout(() => onAction(), 0);
});

  root.container.addEventListener("submit", (e) => {
    e.preventDefault();
    clearTimeout(timer);
    onAction(e.submitter);
  });

  const render = (data) => {
    // #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
    const nextRows = data.map((item) => {
      const row = cloneTemplate(rowTemplate);
      Object.keys(item).forEach((key) => {
        if (row.elements[key]) {
          if (['INPUT', 'SELECT'].includes(row.elements[key].tagName)) {
            row.elements[key].value = item[key];
          } else {
            row.elements[key].textContent = item[key];
          }
        }
      });
      return row.container;
    });

    root.elements.rows.replaceChildren(...nextRows);
  };

  return { ...root, render };
}
