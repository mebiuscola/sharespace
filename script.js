async function loadFiles() {
  const response = await fetch('data/files.json');
  const files = await response.json();
  const listElement = document.getElementById('fileList');
  const searchBox = document.getElementById('searchBox');
  const categoryFilter = document.getElementById('categoryFilter');

  // 提取所有分类
  const categories = [...new Set(files.map(file => file.category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  function displayFiles(filter = '', category = '') {
    listElement.innerHTML = '';
    files
      .filter(file =>
        (file.name.toLowerCase().includes(filter.toLowerCase()) || file.description.includes(filter)) &&
        (category === '' || file.category === category)
      )
      .forEach(file => {
        const li = document.createElement('li');
        li.className = 'file-item';
        li.innerHTML = `
          <strong>${file.name}</strong>
          <span class="description">${file.description}</span>
          <span class="category">📂 ${file.category}</span><br/>
          <a href="${file.url}" class="download-link" download>下载文件</a>
        `;
        listElement.appendChild(li);
      });
  }

  displayFiles();

  searchBox.addEventListener('input', () => {
    displayFiles(searchBox.value, categoryFilter.value);
  });

  categoryFilter.addEventListener('change', () => {
    displayFiles(searchBox.value, categoryFilter.value);
  });
}

window.onload = loadFiles;
