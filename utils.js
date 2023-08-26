exports.getSidebar = (menu) => {
  let sidebar = `<ul class="metismenu list-unstyled" id="side-menu">`;

  menu.forEach(item => {
    sidebar += `
      <li>
        <a href="${item.url}">
          <i data-feather="${item.icon}"></i>
          <span>${item.name}</span>
        </a>
    `;

    if(item.submenu) {
      sidebar += `<ul class="sub-menu">`;

      item.submenu.forEach(subItem => {
        sidebar += `
          <li>
            <a href="${subItem.url}">${subItem.name}</a>
          </li>
        `;  
      });
      
      sidebar += `</ul>`;
    }

    sidebar += `</li>`;
  });

  sidebar += `</ul>`;

  return sidebar; 
}
