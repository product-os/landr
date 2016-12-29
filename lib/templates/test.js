'use strict';

const link = (l) => {
  return `<a class="${l.class}" target="${l.target}" href="${l.href}">${l.text}</a>`;
};

const links = (items) => {
  return `<ul class="nav navbar-nav">
    ${items.map((item) => {
      if (item.href) {
        item.class = 'nav-link';
        return `<li class="nav-item">${link(item)}</li>`;
      }
      return `<li class="nav-item">${item}</li>`;
    }).join('')}
  </ul>`;
};

const imageOrTitle = (data) => {
  if (data.image) {
    return `<img src="${data.image}" alt="${data.title}">`;
  }
  return data.title;
};

const navbarBrand = (data) => {
  return `<a class="navbar-brand float-xs-none" href="/">
    ${imageOrTitle(data)}
  </a>`;
};

module.exports = (data) => {
  return `<nav class="navbar ${data.class}">
    <div class="container">
      <a class="navbar-brand float-xs-none" href="/">
        ${navbarBrand(data)};
      </a>
      <button class="navbar-toggler
      hidden-md-up float-xs-right"
      type="button" data-toggle="collapse"
      data-target="#exCollapsingNavbar">
      </button>
      <div class="collapse navbar-toggleable-sm float-xs-none float-md-right" id="exCollapsingNavbar">
        ${links(data.items)}
      </div>
    </a>
  </nav>`;
};
